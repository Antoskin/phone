"use server";

import { PrismaClient } from "../../../src/generated/prisma";

export async function getProducts() {
  const prisma = new PrismaClient();
  
  const products = await prisma.product.findMany();
  return products;
};

export async function getProduct(slug: string) {
  const prisma = new PrismaClient();
  const product = await prisma.product.findFirst({
    where: { slug: slug },
  });

  return product;
};