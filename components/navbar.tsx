import { navItems } from "@/constants/data";
import { MountainIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <header className="bg-background border-b px-4 lg:px-6 h-14 flex items-center">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Blog</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {navItems.map((item) => (
          <Link key={item.id} href={item.href} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-6 relative flex-1 max-w-[200px] hidden sm:block">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8" />
      </div>
    </header>
  )
}