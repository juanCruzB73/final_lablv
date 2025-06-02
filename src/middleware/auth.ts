// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default_secret";

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "GET") {
    next()
    return
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return
}

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch (err) {
     res.status(401).json({ message: "Invalid or expired token" });
     return
  }
};
