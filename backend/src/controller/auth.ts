import { UserJSON } from "@clerk/express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { prisma } from "../util/prisma.util";
import { Request as ExpressRequest, Response } from "express";
import { createClerkUser, deleteClerkUser } from "../util/auth/clerkAuth";

export async function clerkWebhook(req: ExpressRequest, res: Response) {
  try {
    const evt = await verifyWebhook(req);
    const data: UserJSON = evt.data as UserJSON;
    const type = evt.type;

    if (type === "user.deleted") {
      // const user = await prisma.user.findUnique({
      //   where: {
      //     clerkId: data.id,
      //   },
      // });
      // if (!user) {
      //   res.status(400).json({ success: false, message: "User not found" });
      // }
      await deleteClerkUser(data.id, res);
    }

    if (type === "user.created") {
      await createClerkUser(data, res);
    }
    res.status(200).json({ success: true, message: "Webhook verified" });
    return;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res.status(400).send("Error verifying webhook");
    return;
  }
}
