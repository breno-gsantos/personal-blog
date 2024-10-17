'use server'

import { db } from "@/lib/db";
import { getUserByEmail, hashPassword } from "@/lib/utils";
import { registerSchema } from "@/schemas";
import { z } from "zod";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors as string }
  }

  const { firstName, lastName, email, password } = validatedFields.data

  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {error: 'Email already in use'}
  }

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword
    }
  })
}