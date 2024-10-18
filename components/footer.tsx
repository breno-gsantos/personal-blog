import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <Link href="#" className="text-muted-foreground hover:text-secondary-foreground">
            <Facebook size={24} />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-secondary-foreground">
            <Instagram size={24} />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-secondary-foreground">
            <Twitter size={24} />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">© 2024 My Blog. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}