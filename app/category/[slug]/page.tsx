import { Category } from "@/app/prisma/generated/prisma/client";
import prisma from "@/prisma/prisma";
import Link from "next/link";

export default async function CategoryPage() {
  const categories: Category[] = await prisma.category.findMany();

  return (
    <main className="min-h-screen bg-(--color-secondary) p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Categories
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="p-6 bg-white rounded-xl border hover:shadow-lg transition text-center"
          >
            <p className="text-lg font-medium text-(--color-primary)">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}