import { registerUser } from "../services/auth.service.js";
import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = await registerUser(username, email, password);

  return res
    .status(201)
    .json({ message: "User registered successfully", user });
};
