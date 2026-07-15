import { ProductForm } from "../_components/ProductForm";
import Link from "next/link";
import { getCategories } from "@/app/actions/category";

export default async function NewProductPage() {
  const { categories } = await getCategories();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading text-text-primary">Add New Product</h1>
        <Link href="/admin/products" className="inline-block bg-transparent text-text-primary px-6 py-3 text-sm uppercase tracking-wide border border-text-primary transition-all hover:bg-text-primary hover:text-bg-primary">
          Back to Products
        </Link>
      </div>
      <ProductForm categories={categories || []} />
    </div>
  );
}
