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
        <Link href="/admin/products/new" className="inline-block bg-brand-gold-dark text-black px-6 py-3 text-sm uppercase tracking-widest font-medium rounded-sm border border-brand-gold-dark transition-all hover:bg-transparent hover:text-brand-gold-dark">
          Add New Product
        </Link>
      </div>

      <div className="bg-bg-primary rounded-lg shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border-color bg-bg-secondary text-sm font-medium uppercase tracking-widest text-text-secondary">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Weight</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Created At</th>
              <th className="p-4 text-left">Actions</th>
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
                <tr key={product.id} className="last:border-0 border-b border-border-color hover:bg-bg-secondary transition-colors">
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
                      <Link href={`/admin/products/${product.id}/edit`} className="px-3 py-1.5 rounded-sm border border-border-color text-text-secondary text-xs font-medium transition-colors hover:bg-white hover:text-black">
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
