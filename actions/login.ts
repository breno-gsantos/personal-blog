'use server'

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/utils";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod"

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {error: "Email não existe"}
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    return {success: 'Logado com sucesso!'}
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credenciais inválidas' }
        default: 
          return {error: 'Algo deu errado'}
      }
    }
    throw error
  }
}