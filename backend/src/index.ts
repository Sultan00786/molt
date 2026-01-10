import { clerkMiddleware, UserJSON } from "@clerk/express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { chatRouter } from "./routes/chat";
import { projectRouter } from "./routes/project";
import { verifyWebhook } from "@clerk/express/webhooks";
import { prisma } from "./util/prisma.util";

dotenv.config();
const app: Express = express();
app.use(express.json());

// const corpsOption = {
//   origin: ["http://localhost:3000"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Accept",
//     "Origin",
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Origin",
//     "Access-Control-Allow-Credentials",
//   ],
// };

app.use(cors());
app.use(clerkMiddleware());

export const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/", (req, res) => {
  res.send("Hello World!");
  return;
});
app.post(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const evt = await verifyWebhook(req);
      const data: UserJSON = evt.data as UserJSON;
      const type = evt.type;

      if (type === "user.created") {
        await prisma.user.create({
          data: {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`.trim() || "User",
            created_at: new Date(),
          },
        });
        res.send("User Signed Up");
        return;
      }
    } catch (err) {
      console.error("Error verifying webhook:", err);
      res.status(400).send("Error verifying webhook");
      return;
    }
  }
);

app.use("/project", projectRouter);
app.use("/chat", chatRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port 8000");
});
