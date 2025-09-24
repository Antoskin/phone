"use server";

import { PrismaClient } from "../../../src/generated/prisma";

export async function getProducts() {
  const prisma = new PrismaClient();
  
  const products = await prisma.product.findMany();
  return products;
};