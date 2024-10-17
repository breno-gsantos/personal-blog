import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { db } from "./db"
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({
    where:{email}
  })
  
  return user;
}

export async function hashPassword(password: string) {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}