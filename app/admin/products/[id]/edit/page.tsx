import { ProductForm } from "../../_components/ProductForm";
import Link from "next/link";
import { getProduct } from "@/app/actions/product";
import { getCategories } from "@/app/actions/category";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { product, success } = await getProduct(resolvedParams.id);
  const { categories } = await getCategories();

  if (!success || !product) {
    return <div>Product not found</div>;
  }

  const productData = {
    ...product,
    weight: product.weight ?? undefined,
    categoryId: product.categoryId ?? undefined,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading text-text-primary">Edit Product</h1>
        <Link href="/admin/products" className="inline-block bg-transparent text-text-primary px-6 py-3 text-sm uppercase tracking-wide border border-text-primary transition-all hover:bg-text-primary hover:text-bg-primary">
          Back to Products
        </Link>
      </div>
      <ProductForm initialData={productData} categories={categories || []} />
    </div>
  );
}
