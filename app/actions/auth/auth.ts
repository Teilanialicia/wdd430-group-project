'use server';

import { signIn } from '@/auth';
import prisma from '@/prisma';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt"

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', {
      ...formData,
      redirectTo: "/",
    });
  } 
  catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    throw error;
  }
}

export async function createUser(user: {
  email: string
  password: string
  phone: string
  username: string
}) {
  const { username, password, phone, email } = user;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 5)
  await prisma.user.create({ data: { email, password: hashedPassword, username, phone } });

  const newUser = prisma.user.findFirst({ select: { email: true, username: true, phone: true }, where: { email } })

  return newUser;
}