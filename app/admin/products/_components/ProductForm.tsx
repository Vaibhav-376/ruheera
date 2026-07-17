"use client";

import { createProduct, updateProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductData = {
  id?: string;
  name: string;
  description: string;
  price: number;
  weight?: number;
  images: string[];
  categoryId?: string;
  gender?: string;
};

export function ProductForm({ initialData, categories }: { initialData?: ProductData, categories: { id: string; name: string }[] }) {
  const [formData, setFormData] = useState<ProductData>(
    initialData || { name: "", description: "", price: 0, weight: 0, images: [], categoryId: "", gender: "UNISEX" }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const submissionData = {
      ...formData,
      categoryId: formData.categoryId === "" ? undefined : formData.categoryId,
    };

    let result;
    if (formData.id) {
      result = await updateProduct(formData.id, submissionData);
    } else {
      result = await createProduct(submissionData);
    }

    setLoading(false);
    
    if (result && result.success === false) {
      setError(result.error || "Failed to save product");
      return;
    }
    
    router.push("/admin/products");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Clear the input so the same files can be selected again if needed
    e.target.value = '';
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-bg-primary p-8 rounded-lg shadow-sm max-w-[800px]">
      {error && <div className="mb-6 p-4 bg-[#fce8e8] text-[#c92a2a] rounded text-sm">{error}</div>}
      
      <div className="w-full mb-5">
        <label className="block mb-2 text-sm font-medium">Product Name</label>
        <input
          type="text"
          className="w-full p-3 border border-border-color rounded font-body text-sm transition-colors focus:outline-none focus:border-text-primary"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="w-full mb-5">
        <label className="block mb-2 text-sm font-medium">Description</label>
        <textarea
          className="w-full p-3 border border-border-color rounded font-body text-sm transition-colors focus:outline-none focus:border-text-primary min-h-[120px] resize-y"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-5 mb-5">
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium">Price (₹)</label>
          <input
            type="number"
            className="w-full p-3 border border-border-color rounded font-body text-sm transition-colors focus:outline-none focus:border-text-primary"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            min="0"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium">Weight (g)</label>
          <input
            type="number"
            className="w-full p-3 border border-border-color rounded font-body text-sm transition-colors focus:outline-none focus:border-text-primary"
            value={formData.weight || ""}
            onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
            min="0"
          />
        </div>
      </div>

      <div className="flex gap-5 mb-5">
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium">Category</label>
          <select
            className="w-full p-3 border border-border-color rounded font-body text-sm transition-colors focus:outline-none focus:border-text-primary bg-bg-primary"
            value={formData.categoryId || ""}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option value="">No Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium">Gender</label>
          <select
            className="w-full p-3 border border-border-color rounded font-body text-sm transition-colors focus:outline-none focus:border-text-primary bg-bg-primary"
            value={formData.gender || "UNISEX"}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="UNISEX">Unisex</option>
            <option value="MEN">Men</option>
            <option value="WOMEN">Women</option>
          </select>
        </div>
      </div>

      <div className="w-full mb-8">
        <label className="block mb-2 text-sm font-medium">Product Images</label>
        
        {/* Image Previews */}
        {formData.images.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded border border-border-color overflow-hidden group">
                <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* File Input */}
        <div className="relative border-2 border-dashed border-border-color rounded p-6 text-center hover:bg-bg-secondary transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-text-secondary">
            <span className="font-semibold text-text-primary">Click to upload</span> or drag and drop
            <p className="text-xs mt-1">SVG, PNG, JPG or GIF</p>
          </div>
        </div>
      </div>

      <button type="submit" className="inline-block bg-brand-gold-dark text-black px-6 py-3 text-sm uppercase tracking-widest font-medium rounded-sm border border-brand-gold-dark transition-all hover:bg-transparent hover:text-brand-gold-dark disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
