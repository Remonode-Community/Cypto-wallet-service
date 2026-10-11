import { registerUser } from "../services/auth.service.js";
import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUser(username, email, password);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "User already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
