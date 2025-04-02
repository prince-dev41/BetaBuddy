import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { z } from "zod";
import { insertAppSchema, insertFeedbackSchema, insertAppTesterSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(import.meta.dirname, '..', 'dist', 'public', 'uploads');
      // Ensure directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    // Check if the file is allowed
    const allowedTypes = [
      'application/zip', 
      'application/x-zip-compressed',
      'application/octet-stream',
      'application/x-rar-compressed',
      'application/vnd.android.package-archive',
      'application/x-apple-diskimage',
      'application/x-msdownload',
      'application/x-msi',
      'image/png',
      'image/jpeg',
      'image/jpg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only ZIP, APK, DMG, MSI, EXE, PNG and JPG files are allowed.') as any, false);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);

  // Create authentication middleware
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Authentication required" });
  };

  // Get all apps
  app.get("/api/apps", async (req, res, next) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const type = req.query.type as string | undefined;
      
      const apps = await storage.getApps(limit, type);
      
      // Return with developer info for each app
      const appsWithDevInfo = await Promise.all(
        apps.map(async (app) => {
          const developer = await storage.getUser(app.userId);
          return {
            ...app,
            developer: developer ? {
              id: developer.id,
              username: developer.username,
              name: developer.name,
              avatar: developer.avatar,
              specialization: developer.specialization
            } : null
          };
        })
      );
      
      res.json(appsWithDevInfo);
    } catch (error) {
      next(error);
    }
  });

  // Get single app
  app.get("/api/apps/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const app = await storage.getApp(id);
      
      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }
      
      // Get developer info
      const developer = await storage.getUser(app.userId);
      
      // Get app feedback
      const allFeedback = await storage.getFeedbackByApp(id);
      
      // Calculate average rating
      const totalRating = allFeedback.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = allFeedback.length > 0 ? totalRating / allFeedback.length : 0;
      
      // Get tester info for each feedback
      const feedbackWithUser = await Promise.all(
        allFeedback.map(async (feedback) => {
          const user = await storage.getUser(feedback.userId);
          return {
            ...feedback,
            user: user ? {
              id: user.id,
              username: user.username,
              name: user.name,
              avatar: user.avatar,
              specialization: user.specialization
            } : null
          };
        })
      );
      
      res.json({
        ...app,
        developer: developer ? {
          id: developer.id,
          username: developer.username,
          name: developer.name,
          avatar: developer.avatar,
          specialization: developer.specialization
        } : null,
        feedback: feedbackWithUser,
        averageRating
      });
    } catch (error) {
      next(error);
    }
  });

  // Create app
  app.post("/api/apps", isAuthenticated, upload.fields([
    { name: 'screenshots', maxCount: 5 }
  ]), async (req, res, next) => {
    try {
      console.log("Received app submission request");
      console.log("Request body:", req.body);
      console.log("Authenticated user:", req.user);
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      console.log("Uploaded files:", files ? Object.keys(files).map(key => `${key}: ${files[key].length} files`) : "No files");
      
      // Validate app data
      const dataToValidate = {
        ...req.body,
        userId: req.user?.id,
        rewardPoints: parseInt(req.body.rewardPoints || "100"),
        screenshots: []
      };
      console.log("Data to validate:", dataToValidate);
      
      try {
        const validatedData = insertAppSchema.parse(dataToValidate);
        console.log("Validation successful:", validatedData);
        
        // Use the provided download URL from the request
        console.log("Using provided download URL:", validatedData.downloadUrl);
        
        // Process screenshots
        if (files && files.screenshots && files.screenshots.length > 0) {
          validatedData.screenshots = files.screenshots.map(file => `/uploads/${file.filename}`);
          console.log("Setting screenshots:", validatedData.screenshots);
        } else {
          console.log("Missing screenshots");
          return res.status(400).json({ message: "At least one screenshot is required" });
        }
        
        console.log("Creating app in storage with data:", validatedData);
        const newApp = await storage.createApp(validatedData);
        console.log("App created successfully:", newApp);
        res.status(201).json(newApp);
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          console.error("Validation error:", validationError.errors);
          return res.status(400).json({ message: validationError.errors[0].message });
        }
        throw validationError;
      }
    } catch (error) {
      console.error("Error in app submission:", error);
      next(error);
    }
  });

  // Get apps by current user
  app.get("/api/my/apps", isAuthenticated, async (req, res, next) => {
    try {
      const apps = await storage.getAppsByUser(req.user!.id);
      res.json(apps);
    } catch (error) {
      next(error);
    }
  });

  // Test an app (become a tester)
  app.post("/api/apps/:id/test", isAuthenticated, async (req, res, next) => {
    try {
      const appId = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Check if app exists
      const app = await storage.getApp(appId);
      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }
      
      // Check if user is already testing this app
      const existingTester = await storage.getAppTesterByUserAndApp(userId, appId);
      if (existingTester) {
        return res.status(400).json({ message: "You are already testing this app" });
      }
      
      // Create app tester record
      const appTester = await storage.createAppTester({
        userId,
        appId,
        status: "testing"
      });
      
      // Increment tester count
      await storage.incrementTesterCount(appId);
      
      res.status(201).json(appTester);
    } catch (error) {
      next(error);
    }
  });

  // Get apps being tested by current user
  app.get("/api/my/testing", isAuthenticated, async (req, res, next) => {
    try {
      const appTesters = await storage.getAppTestersByUser(req.user!.id);
      
      // Get app details for each testing record
      const testingApps = await Promise.all(
        appTesters.map(async (tester) => {
          const app = await storage.getApp(tester.appId);
          const developer = app ? await storage.getUser(app.userId) : null;
          
          return {
            ...tester,
            app: app ? {
              ...app,
              developer: developer ? {
                id: developer.id,
                username: developer.username,
                name: developer.name,
                avatar: developer.avatar
              } : null
            } : null
          };
        })
      );
      
      res.json(testingApps);
    } catch (error) {
      next(error);
    }
  });

  // Submit feedback for an app
  app.post("/api/apps/:id/feedback", isAuthenticated, async (req, res, next) => {
    try {
      const appId = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Check if app exists
      const app = await storage.getApp(appId);
      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }
      
      // Check if user is testing this app
      const appTester = await storage.getAppTesterByUserAndApp(userId, appId);
      if (!appTester) {
        return res.status(400).json({ message: "You must be testing this app to provide feedback" });
      }
      
      // Validate feedback data
      const validatedData = insertFeedbackSchema.parse({
        ...req.body,
        userId,
        appId,
        rating: parseInt(req.body.rating)
      });
      
      // Create feedback
      const feedback = await storage.createFeedback(validatedData);
      
      // Update app tester status
      await storage.updateAppTesterStatus(appTester.id, "completed");
      
      // Award points to the tester
      await storage.updateUserPoints(userId, app.rewardPoints);
      
      res.status(201).json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  });

  // Get top testers
  app.get("/api/testers/top", async (req, res, next) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
      const topTesters = await storage.getTopTesters(limit);
      
      // Sanitize sensitive info
      const sanitizedTesters = topTesters.map(tester => ({
        id: tester.id,
        username: tester.username,
        name: tester.name,
        avatar: tester.avatar,
        points: tester.points,
        specialization: tester.specialization
      }));
      
      res.json(sanitizedTesters);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
