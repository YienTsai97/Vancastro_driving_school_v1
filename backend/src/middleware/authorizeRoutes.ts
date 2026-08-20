import { Role } from "@prisma/client";
import { RequestHandler } from "express";

const instructorOrAdmin: Role[] = [Role.INSTRUCTOR, Role.ADMIN];

export const authorizeRoutes: RequestHandler = (req, res, next) => {
  const authUser = req.authUser;
  const method = req.method.toUpperCase();
  const path = req.path.replace(/\/$/, "") || "/";

  // GET /users → instructor/admin only
  if (method === "GET" && path === "/users") {
    if (!authUser || !instructorOrAdmin.includes(authUser.role)) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }
    next();
    return;
  }

  // GET /invoices → instructor/admin only
  if (method === "GET" && path === "/invoices") {
    if (!authUser || !instructorOrAdmin.includes(authUser.role)) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }
    next();
    return;
  }

  // POST /invoices → instructor/admin only
  if (method === "POST" && path === "/invoices") {
    if (!authUser || !instructorOrAdmin.includes(authUser.role)) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }
    next();
    return;
  }

  const invoiceUserMatch = path.match(/^\/invoices\/user\/(\d+)$/);

  // GET /invoices/user/:id → student only
  if ((method === "GET") && invoiceUserMatch) {
    if (!authUser) {
      res.status(403).json({ success: false, message: "Profile not found" });
      return;
    }
    const targetUserId = Number(invoiceUserMatch[1]);
    if (authUser.role === Role.STUDENT && targetUserId !== authUser.id) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }
    next();
    return;
  }

  // PUT/DELETE /invoices/:id → instructor/admin only
  const invoiceIdMatch = path.match(/^\/invoices\/(\d+)$/);
  if ((method === "PUT" || method === "DELETE") && invoiceIdMatch) {
    if (!authUser || !instructorOrAdmin.includes(authUser.role)) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }
    next();
    return;
  }
  next();
};