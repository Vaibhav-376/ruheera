"use client";

import { useState } from "react";
import { createCategory, deleteCategory } from "@/app/actions/category";

type Category = {
  id: string;
  name: string;
  image?: string | null;
};

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewCategoryImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setLoading(true);
    setError("");
    
    const result = await createCategory(newCategoryName, newCategoryImage || undefined);
    if (result.success && result.category) {
      setCategories(prev => [...prev, result.category].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategoryName("");
      setNewCategoryImage("");
    } else {
      setError(result.error || "Failed to add category");
    }
    
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    const result = await deleteCategory(id);
    if (result.success) {
      setCategories(prev => prev.filter(c => c.id !== id));
    } else {
      alert(result.error || "Failed to delete category");
    }
  };

  return (
    <div className="bg-bg-primary rounded-lg shadow-sm p-6 max-w-2xl">
      {error && <div className="bg-[#fce8e8] text-[#c92a2a] p-3 rounded mb-6 text-sm">{error}</div>}
      
      <form onSubmit={handleAddCategory} className="flex flex-col gap-4 mb-8">
        <div className="flex gap-4">
          {newCategoryImage && (
            <div className="relative w-12 h-12 shrink-0 border border-border-color rounded overflow-hidden">
              <img src={newCategoryImage} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setNewCategoryImage("")}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-bl w-4 h-4 flex items-center justify-center text-[10px]"
                title="Remove image"
              >
                &times;
              </button>
            </div>
          )}
          <div className="flex-1">
            <input
              type="text"
              placeholder="New category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full p-3 border border-border-color rounded font-body text-sm transition-colors focus:outline-none focus:border-text-primary"
              required
            />
          </div>
          <div className="relative">
            <label className="inline-block border border-border-color p-3 rounded text-sm text-text-secondary cursor-pointer hover:bg-bg-secondary transition-colors text-center w-[160px]">
              {newCategoryImage ? 'Change Image' : 'Upload Thumbnail'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !newCategoryName.trim()}
          className="self-end bg-text-primary text-bg-primary px-6 py-3 text-sm uppercase tracking-wide border border-text-primary transition-colors hover:bg-bg-primary hover:text-text-primary disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      <div>
        <h3 className="font-heading text-xl mb-4 font-medium text-text-primary">Existing Categories</h3>
        {categories.length === 0 ? (
          <p className="text-text-secondary text-sm">No categories created yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {categories.map((category) => (
              <li key={category.id} className="flex justify-between items-center p-4 border border-border-color rounded hover:bg-bg-secondary transition-colors">
                <div className="flex items-center gap-4">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded border border-border-color" />
                  ) : (
                    <div className="w-10 h-10 bg-bg-accent rounded border border-border-color flex items-center justify-center text-xs text-text-light">
                      No Img
                    </div>
                  )}
                  <span className="font-medium text-text-primary">{category.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="px-3 py-1.5 rounded border border-[#d93025] text-[#d93025] text-xs font-medium bg-transparent transition-colors hover:bg-[#d93025] hover:text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
