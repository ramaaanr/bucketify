'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DM_Serif_Display as DSD, Fascinate_Inline } from 'next/font/google';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ScrollText } from 'lucide-react';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
const dsd = DSD({
  weight: ['400'],
  subsets: ['latin'],
});

const Navbar = () => {
  const router = useRouter();
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
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
        className="navbar navbar-expand-lg navbar-light  
     pl-6 lg:pl-24 pr-6 py-4  fixed top-0 left-0 right-0 z-20 "
      >
        <div className="nav-content-container flex gap-x-2 sm:gap-x-4 md:gap-x-8">
          <div className="nav-logo w-fit hidden md:block">
            <a className={`${dsd.className} text-3xl text-secondary`} href="/">
              Kadobu
            </a>
          </div>
          <Input type="text" placeholder="Cari" className="w-full" />
          <div className="nav-action w-fit justify-end flex  gap-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={'ghost'} size={'icon'}>
                    <ScrollText size={24} color="#372948" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="rounded-sm bg-white border border-gray-200 py-1 px-2 mt-2 text-xs">
                    Pesanan Anda
                  </div>
                </TooltipContent>
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
            </SignedOut>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
