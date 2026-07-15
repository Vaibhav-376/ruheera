import { getCategories } from "@/app/actions/category";
import { CategoryManager } from "./_components/CategoryManager";

export default async function AdminCategoriesPage() {
  const { categories, success, error } = await getCategories();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading text-text-primary">Categories</h1>
      </div>
      
      {!success ? (
        <div className="bg-[#fce8e8] text-[#c92a2a] p-4 rounded mb-6">
          {error || "Failed to load categories"}
        </div>
      ) : (
        <CategoryManager initialCategories={categories || []} />
      )}
    </div>
  );
}
