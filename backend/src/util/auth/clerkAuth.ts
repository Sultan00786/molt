import { Response } from "express";
import { prisma } from "../prisma.util";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { UserJSON } from "@clerk/express";

export async function deleteClerkUser(clerkId: string, res: Response) {
  try {
    await prisma.user.delete({
      where: {
        clerkId: clerkId,
      },
    });
  } catch (error: PrismaClientKnownRequestError | unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log("User not found");
        res.status(400).json({ success: false, message: "User not found" });
        return;
      }
    }
  }
}

export async function createClerkUser(data: UserJSON, res: Response) {
  try {
    if (
      !data ||
      !data.email_addresses ||
      !data.email_addresses[0] ||
      !data.email_addresses[0].email_address ||
      !data.first_name ||
      !data.last_name ||
      !data.created_at ||
      !data.image_url
    ) {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
    await prisma.user.create({
      data: {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`.trim() || "User",
        created_at: new Date(data.created_at),
        image_url: data.image_url,
      },
    });
    return;
  } catch (error: PrismaClientKnownRequestError | unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("User already exists");
        res
          .status(400)
          .json({ success: false, message: "User already exists" });
        return;
      }
    }
    return;
  }
}
