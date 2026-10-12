import type { Request, Response } from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../services/notification.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, message, type } = req.body;
    const userId = res.locals.user.userId;

    const notification = await createNotification(userId, title, message, type);

    return res.status(201).json({
      message: "Notification created successfully",
      notification,
    });
  } catch (error) {
    console.error("Create notification error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.userId;
    const notifications = await getUserNotifications(userId);

    return res.status(200).json({
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.userId;
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid notification ID",
      });
    }

    const notification = await markNotificationAsRead(id, userId);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
