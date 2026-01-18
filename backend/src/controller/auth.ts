import { UserJSON } from "@clerk/express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { prisma } from "../util/prisma.util";
import { Request as ExpressRequest, Response } from "express";

export async function clerkWebhook(req: ExpressRequest, res: Response) {
  try {
    const evt = await verifyWebhook(req);
    const data: UserJSON = evt.data as UserJSON;
    const type = evt.type;

    console.log("Event:", type);
    console.log("Data:", data);
    console.log("Event;", evt);

    if (type === "user.deleted") {
      const user = await prisma.user.findUnique({
        where: {
          clerkId: data.id,
        },
      });
      if (!user) {
        res.status(400).json({ success: false, message: "User not found" });
      }
      await prisma.user.delete({
        where: {
          clerkId: data.id,
        },
      });
    }

    if (type === "user.created") {
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
    }
    res.status(200).json({ success: true, message: "Webhook verified" });
    return;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res.status(400).send("Error verifying webhook");
    return;
  }
}
