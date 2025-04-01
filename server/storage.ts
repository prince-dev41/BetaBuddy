import { users, type User, type InsertUser, apps, type App, type InsertApp, feedback, type Feedback, type InsertFeedback, appTesters, type AppTester, type InsertAppTester } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

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
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private apps: Map<number, App>;
  private feedbacks: Map<number, Feedback>;
  private appTesters: Map<number, AppTester>;
  sessionStore: session.SessionStore;
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
      ...insertUser, 
      id, 
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
      ...insertApp, 
      id, 
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
      ...insertFeedback, 
      id, 
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

export const storage = new MemStorage();
