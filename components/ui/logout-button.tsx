import { signOut } from "@/auth"
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export function LogoutButton() {
  return (
    <form action={async () => {
      'use server'

      await signOut();
      revalidatePath('/');
    }}>
      <Button variant='ghost'>
        <LogOutIcon />
        Sair
      </Button>
    </form>
  )
}