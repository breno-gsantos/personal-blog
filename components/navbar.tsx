import { auth } from "@/auth";
import { navItems } from "@/constants/data";
import { MountainIcon } from "lucide-react";
import Link from "next/link";
import ModeToggle from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/ui/logout-button";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-background border-b px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Blog</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        {navItems.map((item) => (
          <Link key={item.id} href={item.href} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <LogoutButton />
        ) : (
            <Button variant='ghost' asChild>
              <Link href='/login'>Login</Link>
            </Button>
        )}
        <ModeToggle />
      </div>
    </header>
  )
}