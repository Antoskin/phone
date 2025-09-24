import { PrismaClient } from "../src/generated/prisma";
import { data } from "./data";

async function seed() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: data,
  });

  console.log("Products seeded successfully");
}

seed();