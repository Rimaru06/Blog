import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {createBlogSchema , UpdateBlogSchema } from '@rimaru06/medium-common'
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  if (!token) return c.json({ message: "Unauthorized" }, 401);

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      return c.json({ message: "Unauthorized" }, 401);
    }
  } catch (error) {
    return c.json({ message: "Unauthorized" }, 401);
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const {success} = createBlogSchema.safeParse(body);
    if(!success) return c.json({error : "invalid data"}, 400)
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    return c.json({ message: "Internal Error" }, 500);
  }
});
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const {success} = UpdateBlogSchema.safeParse(body);
    if(!success) return c.json({error : "invalid data"}, 400)
    await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ message: "Blog Updated", id: body.id });
  } catch (error) {
    return c.json({ message: "Internal Error" }, 500);
  }
});
// add pagination here
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.blog.findMany({
      select : {
        title : true,
        content : true,
        id : true,
        author : {
          select : {
            name : true,
          }
        }
      }
    });
    return c.json({ blogs });
  } catch (error) {
    return c.json({ message: "Internal Error" }, 500);
  }
});
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id =  c.req.param("id");
    const blogs = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select : {
        id : true,
        title : true,
        content : true,
        author : {
          select : {
            name : true,
          }
        
        }
      }
    });

    return c.json({blogs : blogs});
  } catch (error) {
    return c.json({ message: "Internal Error" }, 500);
  }
});

