import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  loginMethod: {
    type: String,
    required: true,
    enum: ['phone', 'email', 'username']
  },
  identifier: {
    type: String,
    required: true
  },
  currentPassword: {
    type: String,
    required: true
  },
  newPassword: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export const SubmissionModel = mongoose.model('Submission', submissionSchema);

export async function connectMongoDB() {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export function disconnectMongoDB() {
  return mongoose.disconnect();
}
