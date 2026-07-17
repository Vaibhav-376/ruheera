"use client";

import { deleteProduct } from "@/app/actions/product";
import { useState } from "react";

export function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      await deleteProduct(id);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1.5 rounded-sm border border-[#c92a2a] text-[#c92a2a] text-xs font-medium bg-transparent transition-colors hover:bg-[#c92a2a] hover:text-white disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
