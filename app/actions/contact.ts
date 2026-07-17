"use server";

import prisma from "@/lib/prisma";

export async function submitLead(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Name, email, and message are required." };
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    return { success: true, lead };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false, error: "Failed to submit your message. Please try again later." };
  }
}
