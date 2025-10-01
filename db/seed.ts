import { PrismaClient } from "../src/generated/prisma/client";
import { sampleData } from "./data";

async function seed() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();


  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log("Products seeded successfully");

  await prisma.user.createMany({
    data: sampleData.users,
  });

  console.log("Users seeded successfully");
}

seed();