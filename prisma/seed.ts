import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  { name: "Jewelry", slug: "jewelry" },
  { name: "Home Decor", slug: "home-decor" },
  { name: "Clothing", slug: "clothing" },
  { name: "Art", slug: "art" },
];

const products = [
  // ===================== Jewelry =====================
  { name: "Gold Hoop Earrings", price: 45.0, image: "/images/jewelry1.jpg", category: "jewelry" },
  { name: "Silver Pendant Necklace", price: 60.0, image: "/images/jewelry2.jpg", category: "jewelry" },
  { name: "Minimalist Ring Set", price: 35.0, image: "/images/jewelry3.jpg", category: "jewelry" },
  { name: "Pearl Bracelet", price: 55.0, image: "/images/jewelry4.jpg", category: "jewelry" },
  { name: "Diamond Stud Earrings", price: 120.0, image: "/images/jewelry5.jpg", category: "jewelry" },
  { name: "Boho Anklet", price: 25.0, image: "/images/jewelry6.jpg", category: "jewelry" },
  { name: "Crystal Charm Necklace", price: 70.0, image: "/images/jewelry7.jpg", category: "jewelry" },
  { name: "Stackable Gold Rings", price: 40.0, image: "/images/jewelry8.jpg", category: "jewelry" },
  { name: "Vintage Brooch", price: 30.0, image: "/images/jewelry9.jpg", category: "jewelry" },
  { name: "Birthstone Pendant", price: 50.0, image: "/images/jewelry10.jpg", category: "jewelry" },

  // ===================== Home decor =====================
  { name: "Ceramic Vase Set", price: 65.0, image: "/images/decor1.jpg", category: "home-decor" },
  { name: "Wall Macrame Hanging", price: 80.0, image: "/images/decor2.jpg", category: "home-decor" },
  { name: "Scented Candle Trio", price: 30.0, image: "/images/decor3.jpg", category: "home-decor" },
  { name: "Wooden Coffee Table Tray", price: 45.0, image: "/images/decor4.jpg", category: "home-decor" },
  { name: "Minimalist Wall Clock", price: 55.0, image: "/images/decor5.jpg", category: "home-decor" },
  { name: "Decorative Throw Pillows", price: 40.0, image: "/images/decor6.jpg", category: "home-decor" },
  { name: "Indoor Plant Set", price: 70.0, image: "/images/decor7.jpg", category: "home-decor" },
  { name: "Glass Terrarium", price: 60.0, image: "/images/decor8.jpg", category: "home-decor" },
  { name: "LED Fairy Lights", price: 20.0, image: "/images/decor9.jpg", category: "home-decor" },
  { name: "Abstract Wall Art Print", price: 75.0, image: "/images/decor10.jpg", category: "home-decor" },

  // ===================== Clothing =====================
  { name: "Oversized Linen Shirt", price: 50.0, image: "/images/clothing1.jpg", category: "clothing" },
  { name: "High-Waisted Jeans", price: 65.0, image: "/images/clothing2.jpg", category: "clothing" },
  { name: "Cotton Basic Tee", price: 25.0, image: "/images/clothing3.jpg", category: "clothing" },
  { name: "Wool Knit Sweater", price: 80.0, image: "/images/clothing4.jpg", category: "clothing" },
  { name: "Summer Midi Dress", price: 70.0, image: "/images/clothing5.jpg", category: "clothing" },
  { name: "Denim Jacket", price: 90.0, image: "/images/clothing6.jpg", category: "clothing" },
  { name: "Athleisure Joggers", price: 45.0, image: "/images/clothing7.jpg", category: "clothing" },
  { name: "Silk Scarf", price: 35.0, image: "/images/clothing8.jpg", category: "clothing" },
  { name: "Basic Hoodie", price: 60.0, image: "/images/clothing9.jpg", category: "clothing" },
  { name: "Tailored Blazer", price: 110.0, image: "/images/clothing10.jpg", category: "clothing" },

  // ===================== Art =====================
  { name: "Abstract Canvas Painting", price: 150.0, image: "/images/art1.jpg", category: "art" },
  { name: "Watercolor Landscape Print", price: 60.0, image: "/images/art2.jpg", category: "art" },
  { name: "Modern Line Art Poster", price: 40.0, image: "/images/art3.jpg", category: "art" },
  { name: "Framed Botanical Illustration", price: 55.0, image: "/images/art4.jpg", category: "art" },
  { name: "Geometric Wall Art", price: 85.0, image: "/images/art5.jpg", category: "art" },
  { name: "Black & White Photography Print", price: 70.0, image: "/images/art6.jpg", category: "art" },
  { name: "Handmade Sketch Portrait", price: 120.0, image: "/images/art7.jpg", category: "art" },
  { name: "Digital Art Print Set", price: 65.0, image: "/images/art8.jpg", category: "art" },
  { name: "Pop Art Poster", price: 50.0, image: "/images/art9.jpg", category: "art" },
  { name: "Minimalist Typography Art", price: 35.0, image: "/images/art10.jpg", category: "art" },
];

export async function main() {
  // Clear existing data (optional but recommended for dev)
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const createdCategories = await Promise.all(
    categories.map((c) =>
      prisma.category.create({
        data: c,
      })
    )
  );

  // Map slug → id
  const categoryMap = Object.fromEntries(
    createdCategories.map((c) => [c.slug, c.id])
  );

  // Create products
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        price: p.price,
        image: p.image,
        categoryId: categoryMap[p.category],
      },
    });
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });