"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

type OrderItemInput = {
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

export async function createOrder(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  notes?: string;
  items: OrderItemInput[];
}) {
  try {
    if (!data.items || data.items.length === 0) {
      return { success: false, error: "Your cart is empty." };
    }
    if (!data.name || !data.email || !data.phone || !data.address || !data.city || !data.state || !data.postalCode) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const session = await getServerSession(authOptions);
    const subtotal = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        notes: data.notes,
        subtotal,
        items: {
          create: data.items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            image: i.image,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: true },
    });

    revalidatePath("/admin/orders");
    return { success: true, order };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to place your order. Please try again." };
  }
}

export async function getOrder(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) return { success: false, error: "Order not found" };
    return { success: true, order };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, error: "Failed to fetch order" };
  }
}

export async function getOrders() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
  return orders;
}

export async function updateOrderStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.order.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/orders");
  return { success: true };
}
