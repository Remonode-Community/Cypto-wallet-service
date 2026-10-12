import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  create,
  getAll,
  markAsRead,
} from "../controllers/notification.controller.js";

const router = Router();

// All notification routes require authentication
router.use(authenticate);

router.post("/", create);
router.get("/", getAll);
router.patch("/:id/read", markAsRead);

export default router;
