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

export async function getNavigationCategories() {
  try {
    // Fetch categories and only include their products' genders
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        products: {
          select: {
            gender: true
          }
        }
      }
    });
    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching navigation categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function createCategory(name: string, image?: string, gender: string = "UNISEX") {
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
      data: { name: normalizedName, image, gender }
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

export async function updateCategory(id: string, data: { name?: string, image?: string | null, gender?: string }) {
  try {
    let normalizedName = data.name;
    if (data.name) {
      if (!data.name.trim()) {
        return { success: false, error: "Category name cannot be empty" };
      }
      normalizedName = data.name
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(normalizedName && { name: normalizedName }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.gender && { gender: data.gender })
      }
    });
    
    revalidatePath("/", "layout");
    return { success: true, category };
  } catch (error: any) {
    console.error("Error updating category:", error);
    if (error.code === 'P2002') {
      return { success: false, error: "Category with this name already exists" };
    }
    return { success: false, error: "Failed to update category" };
  }
}
