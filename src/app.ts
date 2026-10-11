import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

import { authenticate } from "./middleware/auth.middleware.js";
import { requireRole } from "./middleware/role.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

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
