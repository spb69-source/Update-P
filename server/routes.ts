import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  loginWithPhoneSchema,
  loginWithEmailSchema,
  loginWithUsernameSchema,
  signUpSchema,
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/login/phone", async (req, res) => {
    try {
      const data = loginWithPhoneSchema.parse(req.body);
      
      const user = await storage.getUserByPhone(data.phone);
      if (!user) {
        return res.status(401).json({ error: "Invalid phone number or password" });
      }

      if (user.password !== data.password) {
        return res.status(401).json({ error: "Invalid phone number or password" });
      }

      const { password, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login/email", async (req, res) => {
    try {
      const data = loginWithEmailSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      if (user.password !== data.password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const { password, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login/username", async (req, res) => {
    try {
      const data = loginWithUsernameSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(data.username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      if (user.password !== data.password) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const { password, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const data = signUpSchema.parse(req.body);

      const existingUserByEmail = await storage.getUserByEmail(data.email);
      if (existingUserByEmail) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const existingUserByUsername = await storage.getUserByUsername(data.username);
      if (existingUserByUsername) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const newUser = await storage.createUser({
        email: data.email,
        username: data.username,
        password: data.password,
        phone: null,
      });

      const { password, ...userWithoutPassword } = newUser;
      return res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
