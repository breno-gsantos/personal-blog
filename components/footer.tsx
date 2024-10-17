import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            <Facebook size={24} />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            <Instagram size={24} />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            <Twitter size={24} />
          </Link>
        </div>
        <p className="text-sm text-gray-600">© 2024 My Blog. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}