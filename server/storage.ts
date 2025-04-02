import { users, type User, type InsertUser, apps, type App, type InsertApp, feedback, type Feedback, type InsertFeedback, appTesters, type AppTester, type InsertAppTester } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import pg from "pg";
const { Pool } = pg;
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, desc, asc, and } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const PostgresSessionStore = connectPg(session);
const MemoryStore = createMemoryStore(session);

// Helper function for password hashing
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: number, points: number): Promise<User | undefined>;
  getTopTesters(limit: number): Promise<User[]>;

  // App methods
  getApp(id: number): Promise<App | undefined>;
  getApps(limit?: number, type?: string): Promise<App[]>;
  getAppsByUser(userId: number): Promise<App[]>;
  createApp(app: InsertApp): Promise<App>;
  incrementTesterCount(appId: number): Promise<App | undefined>;

  // Feedback methods
  getFeedback(id: number): Promise<Feedback | undefined>;
  getFeedbackByApp(appId: number): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;

  // AppTester methods
  getAppTester(id: number): Promise<AppTester | undefined>;
  getAppTesterByUserAndApp(userId: number, appId: number): Promise<AppTester | undefined>;
  getAppTestersByUser(userId: number): Promise<AppTester[]>;
  createAppTester(appTester: InsertAppTester): Promise<AppTester>;
  updateAppTesterStatus(id: number, status: string): Promise<AppTester | undefined>;

  // Session store
  sessionStore: session.Store;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  private pool: pg.Pool;
  private db: ReturnType<typeof drizzle>;
  sessionStore: session.Store;

  constructor() {
    // Create the database pool
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Initialize drizzle with the PostgreSQL pool
    this.db = drizzle(this.pool);

    // Set up session store
    this.sessionStore = new PostgresSessionStore({
      pool: this.pool,
      createTableIfMissing: true,
    });

    // Seed the admin user if it doesn't exist
    this.seedAdminUser();
  }

  private async seedAdminUser() {
    const existingAdmin = await this.getUserByUsername('admin');
    if (!existingAdmin) {
      await this.createUser({
        username: "admin",
        email: "admin@betabuddy.com",
        password: await hashPassword("admin"),
        name: "Admin User",
        bio: "BetaBuddy administrator",
        avatar: "",
        specialization: "System Administrator"
      });
      console.log("Admin user created");
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username.toLowerCase()))
      .limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Normalize email and username to lowercase
    const normalizedUser = {
      ...insertUser,
      username: insertUser.username.toLowerCase(),
      email: insertUser.email.toLowerCase()
    };

    const [user] = await this.db.insert(users).values(normalizedUser).returning();
    return user;
  }

  async updateUserPoints(userId: number, points: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;

    const [updatedUser] = await this.db
      .update(users)
      .set({ points: user.points + points })
      .where(eq(users.id, userId))
      .returning();

    return updatedUser;
  }

  async getTopTesters(limit: number): Promise<User[]> {
    return await this.db
      .select()
      .from(users)
      .orderBy(desc(users.points))
      .limit(limit);
  }

  // App methods
  async getApp(id: number): Promise<App | undefined> {
    const result = await this.db.select().from(apps).where(eq(apps.id, id)).limit(1);
    return result[0];
  }

  async getApps(limit?: number, type?: string): Promise<App[]> {
    if (type) {
      const query = this.db.select().from(apps).where(eq(apps.type, type)).orderBy(desc(apps.createdAt));
      return limit ? await query.limit(limit) : await query;
    } else {
      const query = this.db.select().from(apps).orderBy(desc(apps.createdAt));
      return limit ? await query.limit(limit) : await query;
    }
  }

  async getAppsByUser(userId: number): Promise<App[]> {
    return await this.db
      .select()
      .from(apps)
      .where(eq(apps.userId, userId))
      .orderBy(desc(apps.createdAt));
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    try {
      // Prepare the app data with proper handling of nulls
      const appData = {
        title: insertApp.title,
        description: insertApp.description,
        type: insertApp.type,
        short_description: insertApp.shortDescription || null,
        download_url: insertApp.downloadUrl,
        screenshots: Array.isArray(insertApp.screenshots) ? JSON.stringify(insertApp.screenshots) : null,
        reward_points: insertApp.rewardPoints || 100,
        user_id: insertApp.userId
      };
      
      // Use a direct SQL query for insertion to avoid type issues
      const result = await this.pool.query(`
        INSERT INTO apps (
          title, description, type, short_description, download_url, 
          screenshots, reward_points, user_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        ) RETURNING *
      `, [
        appData.title,
        appData.description,
        appData.type,
        appData.short_description,
        appData.download_url,
        appData.screenshots,
        appData.reward_points,
        appData.user_id
      ]);
      
      if (result.rows.length > 0) {
        return result.rows[0] as App;
      }
      
      throw new Error("Failed to create app");
    } catch (error) {
      console.error("Error in createApp:", error);
      throw error;
    }
  }

  async incrementTesterCount(appId: number): Promise<App | undefined> {
    const app = await this.getApp(appId);
    if (!app) return undefined;

    const [updatedApp] = await this.db
      .update(apps)
      .set({ testerCount: app.testerCount + 1 })
      .where(eq(apps.id, appId))
      .returning();

    return updatedApp;
  }

  // Feedback methods
  async getFeedback(id: number): Promise<Feedback | undefined> {
    const result = await this.db.select().from(feedback).where(eq(feedback.id, id)).limit(1);
    return result[0];
  }

  async getFeedbackByApp(appId: number): Promise<Feedback[]> {
    return await this.db
      .select()
      .from(feedback)
      .where(eq(feedback.appId, appId))
      .orderBy(desc(feedback.createdAt));
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    try {
      // Prepare the feedback data with proper handling of nulls
      const feedbackData = {
        app_id: insertFeedback.appId,
        user_id: insertFeedback.userId,
        rating: insertFeedback.rating,
        content: insertFeedback.content,
        bugs: insertFeedback.bugs || null,
        suggestions: insertFeedback.suggestions || null
      };
      
      // Use a direct SQL query for insertion to avoid type issues
      const result = await this.pool.query(`
        INSERT INTO feedback (
          app_id, user_id, rating, content, bugs, suggestions
        ) VALUES (
          $1, $2, $3, $4, $5, $6
        ) RETURNING *
      `, [
        feedbackData.app_id,
        feedbackData.user_id,
        feedbackData.rating,
        feedbackData.content,
        feedbackData.bugs,
        feedbackData.suggestions
      ]);
      
      if (result.rows.length > 0) {
        return result.rows[0] as Feedback;
      }
      
      throw new Error("Failed to create feedback");
    } catch (error) {
      console.error("Error in createFeedback:", error);
      throw error;
    }
  }

  // AppTester methods
  async getAppTester(id: number): Promise<AppTester | undefined> {
    const result = await this.db.select().from(appTesters).where(eq(appTesters.id, id)).limit(1);
    return result[0];
  }

  async getAppTesterByUserAndApp(userId: number, appId: number): Promise<AppTester | undefined> {
    const result = await this.db
      .select()
      .from(appTesters)
      .where(
        and(
          eq(appTesters.userId, userId),
          eq(appTesters.appId, appId)
        )
      )
      .limit(1);
    return result[0];
  }

  async getAppTestersByUser(userId: number): Promise<AppTester[]> {
    return await this.db
      .select()
      .from(appTesters)
      .where(eq(appTesters.userId, userId))
      .orderBy(desc(appTesters.createdAt));
  }

  async createAppTester(insertAppTester: InsertAppTester): Promise<AppTester> {
    try {
      // Prepare the app tester data with proper handling of nulls
      const appTesterData = {
        user_id: insertAppTester.userId,
        app_id: insertAppTester.appId,
        status: insertAppTester.status
      };
      
      // Use a direct SQL query for insertion to avoid type issues
      const result = await this.pool.query(`
        INSERT INTO app_testers (
          user_id, app_id, status
        ) VALUES (
          $1, $2, $3
        ) RETURNING *
      `, [
        appTesterData.user_id,
        appTesterData.app_id,
        appTesterData.status
      ]);
      
      if (result.rows.length > 0) {
        return result.rows[0] as AppTester;
      }
      
      throw new Error("Failed to create app tester");
    } catch (error) {
      console.error("Error in createAppTester:", error);
      throw error;
    }
  }

  async updateAppTesterStatus(id: number, status: string): Promise<AppTester | undefined> {
    try {
      const appTester = await this.getAppTester(id);
      if (!appTester) return undefined;

      // Use direct SQL for update to avoid type issues
      const result = await this.pool.query(`
        UPDATE app_testers 
        SET status = $1
        WHERE id = $2
        RETURNING *
      `, [status, id]);
      
      if (result.rows.length > 0) {
        return result.rows[0] as AppTester;
      }
      
      throw new Error("Failed to update app tester status");
    } catch (error) {
      console.error("Error in updateAppTesterStatus:", error);
      throw error;
    }
  }
}

// For in-memory testing/development
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private apps: Map<number, App>;
  private feedbacks: Map<number, Feedback>;
  private appTesters: Map<number, AppTester>;
  sessionStore: session.Store;
  currentUserId: number;
  currentAppId: number;
  currentFeedbackId: number;
  currentAppTesterId: number;

  constructor() {
    this.users = new Map();
    this.apps = new Map();
    this.feedbacks = new Map();
    this.appTesters = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24h
    });
    this.currentUserId = 1;
    this.currentAppId = 1;
    this.currentFeedbackId = 1;
    this.currentAppTesterId = 1;

    // Add sample data for demo
    this.createUser({
      username: "admin",
      email: "admin@betabuddy.com",
      password: "admin", // This will be hashed in auth.ts
      name: "Admin User",
      bio: "BetaBuddy administrator",
      avatar: "",
      specialization: "System Administrator"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      id, 
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      name: insertUser.name || null,
      bio: insertUser.bio || null,
      avatar: insertUser.avatar || null,
      specialization: insertUser.specialization || null,
      points: 0, 
      isAdmin: false, 
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserPoints(userId: number, points: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { 
      ...user, 
      points: user.points + points 
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getTopTesters(limit: number): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
  }

  // App methods
  async getApp(id: number): Promise<App | undefined> {
    return this.apps.get(id);
  }

  async getApps(limit?: number, type?: string): Promise<App[]> {
    let apps = Array.from(this.apps.values());
    
    if (type) {
      apps = apps.filter(app => app.type === type);
    }
    
    apps = apps.sort((a, b) => {
      // Sort by newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    if (limit) {
      apps = apps.slice(0, limit);
    }
    
    return apps;
  }

  async getAppsByUser(userId: number): Promise<App[]> {
    return Array.from(this.apps.values())
      .filter(app => app.userId === userId)
      .sort((a, b) => {
        // Sort by newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    const id = this.currentAppId++;
    const now = new Date();
    const app: App = { 
      id,
      title: insertApp.title,
      description: insertApp.description,
      type: insertApp.type,
      shortDescription: insertApp.shortDescription || null, // Using camelCase for the in-memory storage
      downloadUrl: insertApp.downloadUrl,
      // Ensure screenshots is always a properly formatted array or null
      screenshots: Array.isArray(insertApp.screenshots) ? [...insertApp.screenshots] : null,
      rewardPoints: insertApp.rewardPoints || 100,
      userId: insertApp.userId,
      testerCount: 0, 
      createdAt: now 
    };
    this.apps.set(id, app);
    return app;
  }

  async incrementTesterCount(appId: number): Promise<App | undefined> {
    const app = await this.getApp(appId);
    if (!app) return undefined;
    
    const updatedApp = { 
      ...app, 
      testerCount: app.testerCount + 1 
    };
    this.apps.set(appId, updatedApp);
    return updatedApp;
  }

  // Feedback methods
  async getFeedback(id: number): Promise<Feedback | undefined> {
    return this.feedbacks.get(id);
  }

  async getFeedbackByApp(appId: number): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values())
      .filter(feedback => feedback.appId === appId)
      .sort((a, b) => {
        // Sort by newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.currentFeedbackId++;
    const now = new Date();
    const feedback: Feedback = { 
      id,
      userId: insertFeedback.userId,
      appId: insertFeedback.appId,
      rating: insertFeedback.rating,
      content: insertFeedback.content,
      bugs: insertFeedback.bugs || null,
      suggestions: insertFeedback.suggestions || null,
      createdAt: now 
    };
    this.feedbacks.set(id, feedback);
    return feedback;
  }

  // AppTester methods
  async getAppTester(id: number): Promise<AppTester | undefined> {
    return this.appTesters.get(id);
  }

  async getAppTesterByUserAndApp(userId: number, appId: number): Promise<AppTester | undefined> {
    return Array.from(this.appTesters.values()).find(
      (appTester) => appTester.userId === userId && appTester.appId === appId,
    );
  }

  async getAppTestersByUser(userId: number): Promise<AppTester[]> {
    return Array.from(this.appTesters.values())
      .filter(appTester => appTester.userId === userId)
      .sort((a, b) => {
        // Sort by newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  async createAppTester(insertAppTester: InsertAppTester): Promise<AppTester> {
    const id = this.currentAppTesterId++;
    const now = new Date();
    const appTester: AppTester = { 
      ...insertAppTester, 
      id, 
      createdAt: now 
    };
    this.appTesters.set(id, appTester);
    return appTester;
  }

  async updateAppTesterStatus(id: number, status: string): Promise<AppTester | undefined> {
    const appTester = await this.getAppTester(id);
    if (!appTester) return undefined;
    
    const updatedAppTester = { 
      ...appTester, 
      status 
    };
    this.appTesters.set(id, updatedAppTester);
    return updatedAppTester;
  }
}

// Choose the appropriate storage implementation based on environment
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemStorage();
