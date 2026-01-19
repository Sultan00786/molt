import { UserJSON } from "@clerk/express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { NextFunction, Request, Response } from "express";

export async function verifyClerkWebhook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const webHookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if (!webHookSecret) {
      console.error("Webhook secret not found");
      return res.status(500).json({ error: "Webhook secret not found" });
    }
    const evt = await verifyWebhook(req);
    const data: UserJSON = evt.data as UserJSON;
    const type = evt.type;
    req.body.data = data;
    req.body.type = type;

    if (!data || !type)
      return res.status(400).json({ error: "Invalid request" });

    const isDetailsNotAvailable =
      !data ||
      !data.email_addresses ||
      !data.email_addresses[0] ||
      !data.email_addresses[0].email_address ||
      !data.first_name ||
      !data.last_name ||
      !data.created_at ||
      !data.image_url;
    if (type === "user.created" && isDetailsNotAvailable)
      res.status(400).json({ success: false, message: "Invalid user data" });

    next();
  } catch (err) {
    if (err instanceof Error)
      console.error("Error verifying webhook:\n", err.message);
    else console.error("Unknown error", err);
    return res.status(400).json({ error: "Invalid signature" });
  }
}
