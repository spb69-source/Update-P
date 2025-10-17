# MongoDB Setup Guide

This guide will help you switch from PostgreSQL to MongoDB.

## 🚀 Quick Setup Steps

### 1. Create MongoDB Atlas Account (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up
2. Create a **Free M0 Cluster** (no credit card needed):
   - Click "Build a Cluster"
   - Select **M0 Free Tier** (512MB storage)
   - Choose a region close to you
   - Click "Create Deployment"

### 2. Configure Security

**Create Database User:**
1. Set username and password (avoid special characters like `#!@$%^&` in password)
2. Click "Create Database User"

**Set Network Access:**
1. Click "Network Access" in left menu
2. Add IP Address: `0.0.0.0/0` (allow from anywhere) - for development only
3. Click "Confirm"

### 3. Get Connection String

1. Click "Connect" on your cluster
2. Select "Drivers" → Choose "Node.js"
3. Copy the connection string - it looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 4. Add MongoDB Connection String as Secret

You need to add your MongoDB connection string to Replit Secrets:

1. Click the **"Secrets"** tab in the left sidebar (lock icon 🔒)
2. Click **"New Secret"**
3. Set:
   - **Key**: `MONGODB_URI`
   - **Value**: Your connection string from step 3 (replace `<username>` and `<password>` with your actual credentials)
   
   Example:
   ```
   mongodb+srv://myuser:mypassword123@cluster0.abcdef.mongodb.net/?retryWrites=true&w=majority
   ```

4. Click "Add new secret"

### 5. Update Server to Use MongoDB

Replace the contents of `server/index.ts` with the MongoDB version:

```typescript
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { connectMongoDB } from "./mongodb";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = \`\${req.method} \${path} \${res.statusCode} in \${duration}ms\`;
      if (capturedJsonResponse) {
        logLine += \` :: \${JSON.stringify(capturedJsonResponse)}\`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Connect to MongoDB
  await connectMongoDB();

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(\`serving on port \${port}\`);
  });
})();
```

### 6. Update Routes to Use MongoDB Storage

Edit `server/routes.ts` and change the import at the top:

```typescript
// Change this:
import { storage } from "./storage";

// To this:
import { mongoStorage as storage } from "./storage-mongo";
```

### 7. Restart the Application

The workflow will automatically restart and connect to MongoDB!

## ✅ Verification

Check the console logs - you should see:
```
✅ Connected to MongoDB
serving on port 5000
```

## 📝 What's Different?

- **PostgreSQL**: Uses Drizzle ORM with SQL tables
- **MongoDB**: Uses Mongoose with document collections
- All API endpoints work the same way
- Data is stored in MongoDB collections instead of PostgreSQL tables

## 🔄 Switch Back to PostgreSQL

If you want to switch back to PostgreSQL:

1. In `server/routes.ts`, change back to:
   ```typescript
   import { storage } from "./storage";
   ```

2. In `server/index.ts`, remove the MongoDB connection line

## 📚 Resources

- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
