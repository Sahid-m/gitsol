"use server";

import prisma from "@/db";

export async function getAllBounties() {
  try {
    const bounties = await prisma.bounties.findMany({
      include: {
        owner: {
          select: {
            username: true,
          },
        },
        contributors: {
          select: {
            name: true,
            profileImg: true,
            totalBountyWon: true,
          },
        },
      },
      where: {
        completed: false,
      },
    });
    return bounties;
  } catch (error) {
    console.error("Error fetching bounties:", error);
    throw new Error("Error fetching bounties");
  }
}

export async function getAllUserBounties(uid: string) {
  try {
    const bounties = await prisma.bounties.findMany({
      include: {
        owner: {
          select: {
            username: true,
          },
        },
        contributors: {
          select: {
            name: true,
            profileImg: true,
            totalBountyWon: true,
          },
        },
      },
      where: {
        completed: false,
        ownerId: uid,
      },
    });
    return bounties;
  } catch (error) {
    console.error("Error fetching bounties:", error);
    throw new Error("Error fetching bounties");
  }
}
