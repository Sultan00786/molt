import { Request as ExpressRequest, Response } from "express";
import { createClerkUser, deleteClerkUser } from "../util/auth/clerkAuth";

export async function clerkWebhook(req: ExpressRequest, res: Response) {
  try {
    const { data, type } = req.body;

    if (type === "user.deleted") {
      const errorCode: string | null = await deleteClerkUser(data.id);
      if (errorCode === "P2025")
        return res.status(400).json({ message: "User not found" });
    }

    if (type === "user.created") {
      const errorCode: string | null = await createClerkUser(data);
      if (errorCode === "P2002")
        return res.status(400).json({ message: "User already exists" });
    }

    res.status(200).json({ success: true, message: "Webhook verified" });
    return;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res.status(400).send("Error verifying webhook");
    return;
  }
}
