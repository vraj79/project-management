import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team) => {
        const productOwner = await prisma.user.findUnique({
            where: { userId: team.productOwnerUserId! },
            select: { username: true },
        })
      })
    )
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(500).json({ message: "Error retrieving users" + error.message });
  }
};
