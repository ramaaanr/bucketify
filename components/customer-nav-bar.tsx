'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DM_Serif_Display as DSD, Fascinate_Inline } from 'next/font/google';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Gift, ScrollText, Search } from 'lucide-react';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
const dsd = DSD({
  weight: ['400'],
  subsets: ['latin'],
});

const Navbar = () => {
  const router = useRouter();
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobileScreen(width < 1024);
  }, [width]);

  return (
    <>
      <motion.nav
        className="navbar navbar-expand-lg navbar-light bg-white  
     pl-6 lg:pl-24 pr-6 shadow-sm py-2  fixed top-0 left-0 right-0 z-20 "
      >
        <div className="nav-content-container flex gap-x-2 sm:gap-x-4 md:gap-x-8">
          <div className="nav-logo w-fit hidden md:block">
            <a className={`${dsd.className} text-3xl text-secondary`} href="/">
              Kadobu
            </a>
          </div>
          <div className="relative w-full flex-1">
            <button
              className="absolute left-2.5 top-2.5 text-muted-foreground"
              onClick={() => router.push(`/catalogue?cari=${search}`)}
            >
              <Search size={16} />
            </button>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
          <div className="nav-action w-fit justify-end flex  gap-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={() => router.push('/orders')}
                  >
                    <ScrollText size={24} color="#372948" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Pesanan Anda</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={() => router.push('/catalogue')}
                  >
                    <Gift size={24} color="#372948" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Katalog</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button
                variant={'secondary'}
                onClick={() => router.push('/sign-up')}
              >
                Daftar
              </Button>
              <Button
                variant={'outline'}
                onClick={() => router.push('/sign-in')}
              >
                Masuk
              </Button>
            </SignedOut>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
