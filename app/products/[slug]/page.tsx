import prisma from "@/lib/prisma";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default async function ProductsPage({ params }: Props) {
  const { slug } = await params;

  const categories = await prisma.category.findMany();

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug,
      },
    },
    include: {
      category: true,
    },
  });

  return (
    <main className="min-h-screen bg-(--color-secondary) p-10">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {slug}
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products/${category.slug}`}
            className={`
              px-4 py-2 rounded-full border transition
              ${
                category.slug === slug
                  ? "bg-(--color-primary) text-white"
                  : "bg-white hover:shadow"
              }
            `}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl border hover:shadow transition"
          >
            <img
              src={p.image}
              className="h-40 w-full object-cover rounded-md"
            />

            <h2 className="font-semibold mt-2">{p.name}</h2>

            <p className="text-sm text-gray-500">
              {p.category.name}
            </p>

            <p className="text-(--color-accent) font-bold">
              ${p.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}