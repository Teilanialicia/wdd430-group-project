'use server'

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function register(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const username = formData.get("username")?.toString();
    const rawPhone = formData.get("phone")?.toString();

    const phone = rawPhone && rawPhone.trim() !== '' ? rawPhone : null;

    if (!email || !password || !username) {
      return "Username, email, and password are required";
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return "User already exists";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        phone: phone,
      },
    });

    return "success";
  } catch (error) {
    console.error(error);
    return "Something went wrong";
  }
}