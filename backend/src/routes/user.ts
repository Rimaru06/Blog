import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {userSchema , signinSchema } from '@rimaru06/medium-common'

export const userRouter = new Hono<{Bindings : {
    DATABASE_URL: string,
    JWT_SECRET: string;
}}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = userSchema.safeParse(body);
  if(!success) return c.json({error : "invalid data"}, 400)
  try {
    const data = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password,
      },
    });
    const token = await sign({ id: data.id }, c.env.JWT_SECRET);

    return c.json({ jwt: token });
  } catch (error) {
    console.log(error);
    return c.json({ error: "user already exist" }, 403);
  }
});
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
const {success} = signinSchema.safeParse(body);
if(!success) return c.json({error : "invalid data"}, 400)
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    if (!user) return c.json({ error: "user not found" }, 403);
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  } catch (error) {
    return c.json({ error: "internal error" }, 500);
  }
});