import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  ShoppingCart,
  Heart,
  User,
  ScrollText,
  Gift,
  LogIn,
} from 'lucide-react';
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs';
import { Button } from '../ui/button';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, path }) => {
  const router = useRouter();
  const isActive = usePathname() === path;

  return (
    <div
      className={`flex flex-col rounded-lg p-2 items-center justify-center hover:bg-primary/10 text-gray-700 cursor-pointer hover:text-gray-900 ${
        isActive ? 'bg-primary/20 text-white  font-semibold' : ''
      }`}
      onClick={() => router.push(path)}
    >
      {icon}
    </div>
  );
};

const AppBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 border-t border-t-gray-200 py-2 left-0 right-0 bg-white shadow-lg z-20">
      <div className="flex md:hidden justify-around items-center h-16">
        <MenuItem
          icon={<ShoppingCart size={32} />}
          label="Carts"
          path="/carts"
        />
        <MenuItem
          icon={<Heart size={32} />}
          label="Wishlist"
          path="/wishlist"
        />
        <MenuItem
          icon={<ScrollText size={32} />}
          label="Orders"
          path="/orders"
        />
        <MenuItem
          icon={<Gift size={32} />}
          label="Catalogue"
          path="/catalogue"
        />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button variant={'secondary'}>
            <LogIn size={32} />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default AppBar;
