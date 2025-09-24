import { z } from "zod";

export const insertProductSchema = z.object({
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  price: z.number().min(3, "Price must be greater than 3"),
  description: z.string().min(3, "Description must be at least 3 characters"),
});

export type ProductSchema = z.infer<typeof insertProductSchema>;