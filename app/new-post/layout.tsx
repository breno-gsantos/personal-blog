import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface NewPostLayoutProps{
  children: ReactNode;
}

export default async function NewPostLayout({ children }: NewPostLayoutProps) {
  const session = await auth();
  if(!session?.user) redirect('/login')

  return (
    <div className="flex items-center justify-center flex-1">
    {children}
  </div>
  )
}