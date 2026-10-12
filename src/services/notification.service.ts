import Notification from "../models/Notification.js";

export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: "info" | "success" | "warning" = "info",
) => {
  const notification = await Notification.create({
    user: userId,
    title,
    message,
    type,
  });

  return notification;
};

export const getUserNotifications = async (userId: string) => {
  const notifications = await Notification.find({
    user: userId,
  }).sort({ createdAt: -1 });

  return notifications;
};

export const markNotificationAsRead = async (
  notificationId: string,
  userId: string,
) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      user: userId,
    },
    {
      isRead: true,
    },
    {
      new: true,
    },
  );

  return notification;
};
