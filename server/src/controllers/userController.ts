import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Error retrieving users" + error.message });
  }
};

export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating user" + error.message });
  }
};
