import { submissions, type Submission, type InsertSubmission } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSubmission(submission: Omit<InsertSubmission, 'otp'>): Promise<Submission>;
  updateSubmissionOtp(id: number, otp: string): Promise<Submission>;
  getSubmission(id: number): Promise<Submission | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createSubmission(submission: Omit<InsertSubmission, 'otp'>): Promise<Submission> {
    const [newSubmission] = await db
      .insert(submissions)
      .values({ ...submission, otp: null })
      .returning();
    return newSubmission;
  }

  async updateSubmissionOtp(id: number, otp: string): Promise<Submission> {
    const [updated] = await db
      .update(submissions)
      .set({ otp })
      .where(eq(submissions.id, id))
      .returning();
    return updated;
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    const [submission] = await db.select().from(submissions).where(eq(submissions.id, id));
    return submission || undefined;
  }
}

export const storage = new DatabaseStorage();
