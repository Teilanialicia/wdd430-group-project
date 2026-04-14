import { PrismaClient, Prisma } from "../app/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    username: "Alice",
    email: "alice@prisma.io",
    password: "",
    phone: "",
  },
  {
    username: "Bob",
    email: "bob@prisma.io",
    password: "",
    phone: "",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }

  const jewelry = await prisma.category.create({
    data: {
      name: "Jewelry",
      slug: "jewelry",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Silver Necklace",
        price: 45,
        image: "https://via.placeholder.com/300",
        categoryId: jewelry.id,
      },
      {
        name: "Gold Ring",
        price: 120,
        image: "https://via.placeholder.com/300",
        categoryId: jewelry.id,
      },
    ],
  });
}



main();