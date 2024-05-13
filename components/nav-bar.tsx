'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { DM_Serif_Display as DSD, Fascinate_Inline } from 'next/font/google';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  RedirectToSignUp,
} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
const dsd = DSD({
  weight: ['400'],
  subsets: ['latin'],
});

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const router = useRouter();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isSidebarShowed, setIsSidebarShowed] = useState(false);
  const navAnimationVariantsValue = {
    onUp: {
      y: '0',
      backgroundImage: `linear-gradient(to bottom right, rgba(107, 114, 128, 0.6), rgba(244, 114, 182, 0.6))`,
    },
    onDown: {
      y: '-100%',
      backgroundImage: `linear-gradient(to bottom right, rgba(107, 114, 128, 0.6), rgba(244, 114, 182, 0.6))`,
    },
    onTop: {
      y: '0',
      backgroundImage: `linear-gradient(to bottom right, rgba(107, 114, 128, 0), rgba(244, 114, 182, 0))`,
    },
    onMobile: {
      y: '0',
      backgroundImage: `linear-gradient(to bottom right, rgba(55, 41, 72, 100), rgba(55, 41, 72, 100))`,
    },
  };
  const [navAnimationVariants, setNavAnimationVariants] = useState(
    width >= 1024 ? 'onTop' : 'onMobile',
  );
  useEffect(() => {
    if (width >= 1024) {
      setIsSidebarShowed(false);
      setNavAnimationVariants('onTop');
    } else {
      setNavAnimationVariants('onMobile');
    }
  }, [width]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (width < 1024) {
      setNavAnimationVariants('onMobile');
    } else {
      if (previous && latest > previous && latest > 150) {
        setNavAnimationVariants('onDown');
      } else {
        if (latest === 0) {
          setNavAnimationVariants('onTop');
        } else {
          setNavAnimationVariants('onUp');
        }
      }
    }
  });
  const scrollToSection = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        variants={navAnimationVariantsValue}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        animate={navAnimationVariants}
        className="navbar navbar-expand-lg navbar-light  
     py-3 px-4  lg:px-10 fixed top-0 left-0 right-0 z-20 "
      >
        <div className="nav-content-container flex">
          <div className="nav-logo w-full">
            <a
              className={`${dsd.className} text-3xl text-white text-secondary`}
              href="/"
            >
              Bucketify
            </a>
          </div>
          <div className="nav-action w-full justify-end flex">
            {width >= 1024 ? (
              <ul className="nav-menu-container flex gap-4 px-4 py-2">
                {navItems.map((item, index) => (
                  <li className="nav-item d-none" key={index}>
                    <a
                      onClick={() => scrollToSection(`${item.href}`)}
                      className="nav-link text-white cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              ''
            )}
            {width >= 1024 ? (
              <>
                <SignedOut>
                  <Button
                    variant={'secondary'}
                    onClick={() => router.push('/sign-up')}
                  >
                    Daftar
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            ) : (
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={() => {
                  setIsSidebarShowed(!isSidebarShowed);
                }}
              >
                {isSidebarShowed ? (
                  <X size={24} color="white" />
                ) : (
                  <Menu size={24} color="white" />
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.nav>
      <motion.aside
        initial={'hidden'}
        variants={{ hidden: { top: '-450px' }, visible: { top: '64px' } }}
        animate={isSidebarShowed ? 'visible' : 'hidden'}
        transition={{ duration: '0.25', ease: 'easeInOut' }}
        className="sidebar fixed left-0 right-0 z-10 bg-primary"
      >
        <ul className="nav-menu-container flex flex-col px-4 py-2 gap-y-6">
          {width < 1024 ? (
            <>
              {navItems.map((item, index) => (
                <li className="nav-item w-full " key={index}>
                  <Button
                    onClick={() => scrollToSection(`${item.href}`)}
                    className="nav-link text-white block text-center w-full "
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
              <SignedOut>
                <li className="nav-item w-full">
                  <Button
                    variant={'secondary'}
                    onClick={() => router.push('/sign-up')}
                    className="nav-link text-white block text-center w-full "
                  >
                    Daftar
                  </Button>
                </li>
              </SignedOut>
              <SignedIn>
                <li className="nav-item w-full text-center">
                  <UserButton />
                </li>
              </SignedIn>
            </>
          ) : (
            ''
          )}
        </ul>
      </motion.aside>
    </>
  );
};

export default Navbar;
