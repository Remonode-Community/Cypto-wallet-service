import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";

import { authenticate } from "./middleware/auth.middleware.js";
import { requireRole } from "./middleware/role.middleware.js";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.get("/health/ready", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;

  if (!dbConnected) {
    return res.status(503).json({
      status: "unavailable",
      db: "disconnected",
    });
  }

  return res.status(200).json({
    status: "ready",
    db: "connected",
  });
});

app.get("/test", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.get("/api/auth/me", authenticate, (req, res) => {
  res.json({
    message: "Authentication successful",
    user: res.locals.user,
  });
});

app.get("/api/admin", authenticate, requireRole("admin"), (req, res) => {
  res.json({
    message: "Welcome, admin!",
  });
});

export default app;
