import { UserJSON } from "@clerk/express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../prisma.util";

export async function deleteClerkUser(clerkId: string) {
  try {
    await prisma.user.delete({
      where: {
        clerkId: clerkId,
      },
    });
    return null;
  } catch (error: PrismaClientKnownRequestError | unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error("User not found");
        return error.code;
      }
    }
    console.error("Error deleting user:", error);
    return null;
  }
}

export async function createClerkUser(data: UserJSON) {
  try {
    await prisma.user.create({
      data: {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`.trim() || "User",
        created_at: new Date(data.created_at),
        image_url: data.image_url,
      },
    });
    return null;
  } catch (error: PrismaClientKnownRequestError | unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("User already exists");
        return error.code;
      }
    }
    console.error("Error while creating user:", error);
    return null;
  }
}
