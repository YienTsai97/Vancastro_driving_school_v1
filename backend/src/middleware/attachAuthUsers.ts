import { getAuth } from "@clerk/express";
import { PrismaClient, Role } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        id: number;
        role: Role;
        clerkId: string;
      };
    }
  }
}

export const attachAuthUser: RequestHandler = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    if (!clerkId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const user = await prisma.user.findUnique({ where: { clerkId } });
    const isCreateProfile =
      req.method === "POST" && /^\/users\/?$/.test(req.path);
    if (!user) {
      if (isCreateProfile) {
        next();
        return;
      }
      res.status(403).json({ success: false, message: "Profile not found" });
      return;
    }
    req.authUser = {
      id: user.id,
      role: user.role,
      clerkId: user.clerkId,
    };
    next();
  } catch (error) {
    console.error("attachAuthUser error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};