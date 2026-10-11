import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token required",
    });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret || !token) {
    return res.status(401).json({
      message: "Invalid authentication token",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      return res.status(401).json({
        message: "Invalid authentication token",
      });
    }

    res.locals.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
