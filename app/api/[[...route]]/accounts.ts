import { Hono } from "hono";
import { accounts } from "@/db/schema";
import { db } from "@/db/drizzle";

const app = new Hono().get("/", async (c) => {
  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts);
  return c.json({ data });
});

export default app;
