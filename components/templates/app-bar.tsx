import React from 'react';
import { useRouter } from 'next/navigation';
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
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-gray-700 cursor-pointer hover:text-gray-900"
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

const AppBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-20">
      <div className="flex md:hidden justify-around items-center h-16">
        <MenuItem
          icon={<ShoppingCart size={24} />}
          label="Carts"
          onClick={() => router.push('/carts')}
        />
        <MenuItem
          icon={<Heart size={24} />}
          label="Wishlist"
          onClick={() => router.push('/wishlist')}
        />
        <MenuItem
          icon={<ScrollText size={24} />}
          label="Orders"
          onClick={() => router.push('/orders')}
        />
        <MenuItem
          icon={<Gift size={24} />}
          label="Catalogue"
          onClick={() => router.push('/catalogue')}
        />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button variant={'secondary'} onClick={() => router.push('/sign-up')}>
            <LogIn size={24} />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default AppBar;
