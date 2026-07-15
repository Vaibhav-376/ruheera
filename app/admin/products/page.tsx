import { getProducts } from "@/app/actions/product";
import Link from "next/link";
import { DeleteButton } from "./_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const { products, success } = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading text-text-primary">Products</h1>
        <Link href="/admin/products/new" className="inline-block bg-text-primary text-bg-primary px-6 py-3 text-sm uppercase tracking-wide border border-text-primary transition-colors hover:bg-bg-primary hover:text-text-primary">
          Add New Product
        </Link>
      </div>

      <div className="bg-bg-primary rounded-lg shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left border-b border-border-color bg-[#fafafa] font-semibold text-text-secondary">Image</th>
              <th className="p-4 text-left border-b border-border-color bg-[#fafafa] font-semibold text-text-secondary">Name</th>
              <th className="p-4 text-left border-b border-border-color bg-[#fafafa] font-semibold text-text-secondary">Price</th>
              <th className="p-4 text-left border-b border-border-color bg-[#fafafa] font-semibold text-text-secondary">Weight</th>
              <th className="p-4 text-left border-b border-border-color bg-[#fafafa] font-semibold text-text-secondary">Category</th>
              <th className="p-4 text-left border-b border-border-color bg-[#fafafa] font-semibold text-text-secondary">Created At</th>
              <th className="p-4 text-left border-b border-border-color bg-[#fafafa] font-semibold text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!success || !products || products.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center border-b border-border-color">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="last:border-0 border-b border-border-color">
                  <td className="p-4 text-left">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-[50px] h-[50px] object-cover rounded"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] bg-[#eee] rounded" />
                    )}
                  </td>
                  <td className="p-4 text-left">{product.name}</td>
                  <td className="p-4 text-left">₹{product.price}</td>
                  <td className="p-4 text-left">{product.weight ? `${product.weight}g` : "-"}</td>
                  <td className="p-4 text-left">{product.category ? product.category.name : "-"}</td>
                  <td className="p-4 text-left">{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-left">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="px-3 py-1.5 rounded border border-[#1a73e8] text-[#1a73e8] text-xs font-medium bg-transparent transition-colors hover:bg-[#1a73e8] hover:text-white">
                        Edit
                      </Link>
                      <DeleteButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
