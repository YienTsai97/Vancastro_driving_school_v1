import { getAuth } from "@clerk/express";
import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const include = {
  payers: {
    select: {
      id: true,
      qbCustomerId: true,
      firstName: true,
      lastName: true,
    },
  },
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include,
    });
    // Remove sensitive information
    const sanitizedUsers = users.map((user) => {
      const { qbAccessToken, qbRefreshToken, ...rest } = user;
      return rest;
    });
    res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include,
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Remove sensitive information
    const { qbAccessToken, qbRefreshToken, ...rest } = user;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = await prisma.user.findUnique({
      where: { email: email },
      include,
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Remove sensitive information
    const { qbAccessToken, qbRefreshToken, ...rest } = user;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByClerkId = async (req: Request, res: Response) => {
  try {
    const clerkId = getAuth(req).userId;

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId?.toString() },
      include,
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Remove sensitive information
    const { qbAccessToken, qbRefreshToken, ...rest } = user;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error fetching user by Clerk ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const clerkId = getAuth(req).userId;

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: clerkId! },
    });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const {
      role,
      email,
      firstName,
      lastName,
      phone,
      language,
      streetAddress,
      unitNumber,
      city,
      province,
      postalCode,
      country,
      dateOfBirth,
      licenseNumber,
      availability,
      licenseClass,
      emergencyContactNumber,
      emergencyContactName,
    } = req.body;

    if (
      !firstName ||
      !email ||
      !lastName ||
      !phone ||
      !streetAddress ||
      !city ||
      !province ||
      !postalCode ||
      !dateOfBirth ||
      !licenseClass ||
      !emergencyContactNumber ||
      !emergencyContactName
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: clerkId!,
        role: role || Role.STUDENT,
        firstName,
        lastName,
        email,
        phone,
        language,
        streetAddress,
        unitNumber,
        city,
        province,
        postalCode,
        country: country || "Canada",
        dateOfBirth: new Date(dateOfBirth),
        licenseNumber: parseInt(licenseNumber),
        availability,
        licenseClass,
        emergencyContactNumber,
        emergencyContactName,
      },
      include,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const {
      role,
      firstName,
      lastName,
      phone,
      language,
      streetAddress,
      unitNumber,
      city,
      province,
      postalCode,
      country,
      dateOfBirth,
      licenseNumber,
      availability,
      licenseClass,
      emergencyContactNumber,
      emergencyContactName,
      contractId,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        role: role !== undefined ? role : undefined,
        firstName: firstName !== undefined ? firstName : undefined,
        lastName: lastName !== undefined ? lastName : undefined,
        phone: phone !== undefined ? phone : undefined,
        language: language !== undefined ? language : undefined,
        streetAddress: streetAddress !== undefined ? streetAddress : undefined,
        unitNumber,
        city: city !== undefined ? city : undefined,
        province: province !== undefined ? province : undefined,
        postalCode: postalCode !== undefined ? postalCode : undefined,
        country: country !== undefined ? country : undefined,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        licenseNumber:
          licenseNumber !== undefined ? parseInt(licenseNumber) : undefined,
        availability,
        licenseClass: licenseClass !== undefined ? licenseClass : undefined,
        emergencyContactNumber:
          emergencyContactNumber !== undefined
            ? emergencyContactNumber
            : undefined,
        emergencyContactName:
          emergencyContactName !== undefined ? emergencyContactName : undefined,
        contractId: contractId !== undefined ? contractId : undefined,
      },
      include,
    });

    // Remove sensitive information
    const { qbAccessToken, qbRefreshToken, ...rest } = updatedUser;
    res.status(201).json(rest);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const userLessons = await prisma.lesson.findMany({
      where: {
        OR: [{ studentId: parseInt(id) }, { instructorId: parseInt(id) }],
      },
    });

    const userInvoices = await prisma.invoice.findMany({
      where: { userId: parseInt(id) },
    });

    if (userLessons.length > 0 || userInvoices.length > 0) {
      res.status(400).json({
        error:
          "Cannot delete user with related lessons or invoices. Please delete those records first.",
      });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getInstructors = async (req: Request, res: Response) => {
  try {
    const instructors = await prisma.user.findMany({
      where: { role: Role.INSTRUCTOR },
    });
    // Remove sensitive information
    const sanitizedInstructors = instructors.map((instructor) => {
      const { qbAccessToken, qbRefreshToken, ...rest } = instructor;
      return rest;
    });
    res.status(200).json(sanitizedInstructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getUsers,
  getInstructors,
  getUserById,
  getUserByClerkId,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
