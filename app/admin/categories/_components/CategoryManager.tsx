"use client";

import { useState } from "react";
import { createCategory, deleteCategory, updateCategory } from "@/app/actions/category";

type Category = {
  id: string;
  name: string;
  image?: string | null;
  gender?: string;
};

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<string>("");
  const [newCategoryGender, setNewCategoryGender] = useState("UNISEX");
  
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState<string>("");
  const [editCategoryGender, setEditCategoryGender] = useState("UNISEX");

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

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditCategoryImage(reader.result);
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
    
    const result = await createCategory(newCategoryName, newCategoryImage || undefined, newCategoryGender);
    if (result.success && result.category) {
      setCategories(prev => [...prev, result.category].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategoryName("");
      setNewCategoryImage("");
      setNewCategoryGender("UNISEX");
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

  const startEdit = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditCategoryName(category.name);
    setEditCategoryImage(category.image || "");
    setEditCategoryGender(category.gender || "UNISEX");
  };

  const cancelEdit = () => {
    setEditingCategoryId(null);
  };

  const handleUpdateCategory = async (id: string) => {
    if (!editCategoryName.trim()) return;
    setLoading(true);
    
    // Convert empty string back to undefined/null for the backend if needed, or pass it directly.
    const imageToSend = editCategoryImage === "" ? null : editCategoryImage;
    
    const result = await updateCategory(id, { name: editCategoryName, image: imageToSend, gender: editCategoryGender });
    if (result.success && result.category) {
      setCategories(prev => prev.map(c => c.id === id ? result.category : c).sort((a, b) => a.name.localeCompare(b.name)) as Category[]);
      cancelEdit();
    } else {
      alert(result.error || "Failed to update category");
    }
    setLoading(false);
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
          <div className="w-[120px]">
            <select
              value={newCategoryGender}
              onChange={(e) => setNewCategoryGender(e.target.value)}
              className="w-full p-3 border border-border-color rounded font-body text-sm bg-bg-primary text-text-primary transition-colors focus:outline-none focus:border-text-primary"
            >
              <option value="UNISEX">Unisex</option>
              <option value="MEN">Men</option>
              <option value="WOMEN">Women</option>
            </select>
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
          className="self-end bg-brand-gold-dark text-black px-6 py-3 text-sm uppercase tracking-widest font-medium rounded-sm border border-brand-gold-dark transition-all hover:bg-transparent hover:text-brand-gold-dark disabled:opacity-50 disabled:cursor-not-allowed"
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
              <li key={category.id} className="flex flex-col gap-4 p-4 border border-border-color rounded hover:bg-bg-secondary transition-colors">
                {editingCategoryId === category.id ? (
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-4 items-center">
                      {editCategoryImage && (
                        <div className="relative w-12 h-12 shrink-0 border border-border-color rounded overflow-hidden">
                          <img src={editCategoryImage} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setEditCategoryImage("")}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-bl w-4 h-4 flex items-center justify-center text-[10px]"
                          >
                            &times;
                          </button>
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="w-full p-2 border border-border-color rounded font-body text-sm transition-colors focus:outline-none focus:border-text-primary bg-bg-primary text-text-primary"
                        />
                      </div>
                      <div className="w-[100px]">
                        <select
                          value={editCategoryGender}
                          onChange={(e) => setEditCategoryGender(e.target.value)}
                          className="w-full p-2 border border-border-color rounded font-body text-sm bg-bg-primary text-text-primary focus:outline-none focus:border-text-primary"
                        >
                          <option value="UNISEX">Unisex</option>
                          <option value="MEN">Men</option>
                          <option value="WOMEN">Women</option>
                        </select>
                      </div>
                      <div className="relative">
                        <label className="inline-block border border-border-color p-2 rounded text-sm text-text-secondary cursor-pointer hover:bg-bg-secondary transition-colors text-center w-[100px]">
                          {editCategoryImage ? 'Change' : 'Upload'}
                          <input type="file" accept="image/*" onChange={handleEditFileChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={cancelEdit} className="px-3 py-1.5 rounded-sm border border-border-color text-text-secondary text-xs font-medium transition-colors hover:bg-white hover:text-black">Cancel</button>
                      <button onClick={() => handleUpdateCategory(category.id)} disabled={loading} className="px-3 py-1.5 rounded-sm border border-brand-gold-dark text-brand-gold-dark text-xs font-medium bg-transparent transition-colors hover:bg-brand-gold-dark hover:text-black">Save</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                      {category.image ? (
                        <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded border border-border-color" />
                      ) : (
                        <div className="w-10 h-10 bg-bg-elevated rounded border border-border-color flex items-center justify-center text-xs text-text-light">
                          No Img
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium text-text-primary">{category.name}</span>
                        <span className="text-xs text-text-secondary uppercase tracking-wider">{category.gender || "UNISEX"}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(category)}
                        className="px-3 py-1.5 rounded-sm border border-border-color text-text-secondary text-xs font-medium transition-colors hover:bg-white hover:text-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-3 py-1.5 rounded-sm border border-[#c92a2a] text-[#c92a2a] text-xs font-medium bg-transparent transition-colors hover:bg-[#c92a2a] hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
