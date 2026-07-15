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
      className="action-btn delete"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
