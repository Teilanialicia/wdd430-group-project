import prisma from "@/prisma";

interface Props {
  params: { id: string };
}

export default async function CategoryProductsPage({ params }: Props) {
  const categoryId = Number(params.id);

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      products: true,
    },
  });

  if (!category) {
    return <div className="p-10">Category not found</div>;
  }

  return (
    <main className="min-h-screen bg-(--color-secondary) p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        {category.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {category.products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border p-4 hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h2 className="font-semibold text-lg">
              {product.name}
            </h2>

            <p className="text-(--color-accent) font-bold">
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}