'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { DM_Serif_Display as DSD, Fascinate_Inline } from 'next/font/google';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
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
  };
  const [navAnimationVariants, setNavAnimationVariants] = useState('onTop');
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && latest > 150) {
      // on down
      setNavAnimationVariants('onDown');
    } else {
      if (latest === 0) {
        setNavAnimationVariants('onTop');
      } else {
        setNavAnimationVariants('onUp');
      }
    }
  });
  return (
    <motion.nav
      variants={navAnimationVariantsValue}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      animate={navAnimationVariants}
      className="navbar navbar-expand-lg navbar-light 
     py-3 px-10 fixed top-0 left-0 right-0 z-10 "
    >
      <div className="container flex">
        <div className="nav-logo w-full">
          <a
            className={`${dsd.className} text-3xl text-white text-secondary`}
            href="/"
          >
            Bucketify
          </a>
        </div>
        <div className="nav-action w-full justify-end flex">
          <ul className="nav-menu-container flex gap-4 px-4 py-2">
            {navItems.map((item, index) => (
              <li className="nav-item " key={index}>
                <a href={item.href} className="nav-link text-white ">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button variant={'secondary'} className="text-xs" size={'sm'}>
            Daftar
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
