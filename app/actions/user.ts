"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getUsers() {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
    orderBy: {
      role: 'asc', // ADMINs first, then USERs
    }
  });

  return users;
}

export async function deleteUser(userId: string) {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Prevent deleting the primary admin or self
  const userToDelete = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userToDelete) {
    throw new Error("User not found");
  }

  if (userToDelete.email === "admin@ruheera.com") {
    throw new Error("Cannot delete the primary admin account");
  }

  if (userToDelete.id === session.user.id) {
    throw new Error("Cannot delete your own account");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateUserRole(userId: string, newRole: "ADMIN" | "USER") {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const userToUpdate = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userToUpdate) {
    throw new Error("User not found");
  }

  if (userToUpdate.email === "admin@ruheera.com") {
    throw new Error("Cannot modify the primary admin account");
  }

  if (userToUpdate.id === session.user.id) {
    throw new Error("Cannot modify your own role");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/admin/users");
  return { success: true };
}
