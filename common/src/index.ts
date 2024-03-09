import z from "zod";

export const userSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});
export const signinSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});
export const createBlogSchema = z.object({
    title : z.string(),
    content : z.string()
})
export const  UpdateBlogSchema = z.object({
    id : z.string(),
    title : z.string(),
    content : z.string()
})

export type SignInput = z.infer<typeof userSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof UpdateBlogSchema>;