import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  bio: text("bio"),
  avatar: text("avatar"),
  specialization: text("specialization"),
  points: integer("points").default(0).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const apps = pgTable("apps", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  type: text("type").notNull(), // web, mobile, desktop
  downloadUrl: text("download_url").notNull(),
  screenshots: json("screenshots").$type<string[]>(),
  rewardPoints: integer("reward_points").default(100).notNull(),
  userId: integer("user_id").notNull(), // developer who submitted
  testerCount: integer("tester_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // tester who submitted
  appId: integer("app_id").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  content: text("content").notNull(),
  bugs: text("bugs"),
  suggestions: text("suggestions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appTesters = pgTable("app_testers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  appId: integer("app_id").notNull(),
  status: text("status").notNull(), // testing, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  name: true,
  bio: true,
  avatar: true,
  specialization: true,
});

export const insertAppSchema = createInsertSchema(apps).pick({
  title: true,
  description: true,
  shortDescription: true,
  type: true,
  downloadUrl: true,
  screenshots: true,
  rewardPoints: true,
  userId: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).pick({
  userId: true,
  appId: true,
  rating: true,
  content: true,
  bugs: true,
  suggestions: true,
});

export const insertAppTesterSchema = createInsertSchema(appTesters).pick({
  userId: true,
  appId: true,
  status: true,
});

// Login schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertApp = z.infer<typeof insertAppSchema>;
export type App = typeof apps.$inferSelect;

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;

export type InsertAppTester = z.infer<typeof insertAppTesterSchema>;
export type AppTester = typeof appTesters.$inferSelect;

export type LoginData = z.infer<typeof loginSchema>;
