import { Router } from "express";
import { z } from "zod";
import { query } from "../db";
import { handle, parse, rateLimit } from "../http";

export const contactRouter = Router();

contactRouter.post(
  "/",
  rateLimit({ windowMs: 60_000, max: 5 }),
  handle(async (req, res) => {
    const input = parse(
      z.object({
        name: z.string().trim().min(2, "Enter your name.").max(80),
        email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
        company: z.string().trim().max(120).optional().nullable(),
        topic: z.enum(["sales", "support", "partnership", "other"], { errorMap: () => ({ message: "Choose a topic." }) }),
        message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(5000),
      }),
      req.body,
    );
    await query("INSERT INTO contact_messages (name, email, company, topic, message) VALUES ($1,$2,$3,$4,$5)", [
      input.name,
      input.email,
      input.company || null,
      input.topic,
      input.message,
    ]);
    res.status(201).json({ ok: true });
  }),
);
