'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../ui/button';

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Function to determine the page title based on the current route
  const getPageTitle = () => {
    if (pathname.includes('carts')) return 'Keranjang';
    if (pathname.includes('wishlist')) return 'Wishlist';
    if (pathname.includes('orders')) return 'Pesanan';
    return 'Kembali'; // Default title
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-20">
      <div className="flex md:hidden px-4 items-center h-16">
        <Button
          variant={'ghost'}
          className="mr-2"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <p className="font-semibold text-2xl">{getPageTitle()}</p>
      </div>
    </div>
  );
}
