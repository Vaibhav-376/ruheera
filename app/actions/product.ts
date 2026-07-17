"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts(categoryId?: string, gender?: string, search?: string) {
  try {
    let products = await prisma.product.findMany({
      where: {
        ...(categoryId ? { categoryId } : {}),
        ...(gender ? {
          gender: {
            in: [gender, 'UNISEX']
          }
        } : {})
      },
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    });

    if (search && search.trim()) {
      const query = search.trim().toLowerCase();
      products = products.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category?.name.toLowerCase().includes(query)
      );
    }

    return { success: true, products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!product) return { success: false, error: "Product not found" };
    return { success: true, product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  weight?: number;
  images: string[];
  categoryId?: string;
  gender?: string;
}) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        weight: data.weight,
        images: data.images,
        categoryId: data.categoryId,
        gender: data.gender || "UNISEX",
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, data: {
  name?: string;
  description?: string;
  price?: number;
  weight?: number;
  images?: string[];
  categoryId?: string | null;
  gender?: string;
}) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        weight: data.weight,
        images: data.images,
        categoryId: data.categoryId,
        gender: data.gender,
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath(`/product/${id}`);
    revalidatePath("/");
    return { success: true, product };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
