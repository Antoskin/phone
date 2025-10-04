import { ZodError, z } from "zod";

export const insertProductSchema = z.object({
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  price: z.number().min(3, "Price must be greater than 3"),
  description: z.string().min(3, "Description must be at least 3 characters"),
});

export type ProductSchema = z.infer<typeof insertProductSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 3 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 3 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export async function formatError(error: any) {
  console.log(error, 'error')
  if (error.name === "ZodError") {
     const fieldErrors = Object.keys(error.errors).map((field: any) => error.errors[field].message);
     return fieldErrors.join(", ");
  } else if (error.name === "PrismaClientKnownRequestError" && error.code === "P2002") {

  } else {
    
  }
}

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;