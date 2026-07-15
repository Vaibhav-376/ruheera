"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function createCategory(name: string, image?: string) {
  try {
    if (!name.trim()) {
      return { success: false, error: "Category name is required" };
    }

    const normalizedName = name
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const category = await prisma.category.create({
      data: { name: normalizedName, image }
    });
    revalidatePath("/", "layout");
    return { success: true, category };
  } catch (error: any) {
    console.error("Error creating category:", error);
    if (error.code === 'P2002') {
      return { success: false, error: "Category with this name already exists" };
    }
    return { success: false, error: "Failed to create category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id }
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category (it may be in use by products)" };
  }
}
