import React from 'react';
import { Button } from './ui/button';
import { DM_Serif_Display as DSD } from 'next/font/google';

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
  return (
    <nav
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
                <a href={item.href} className="nav-link text-secondary ">
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
    </nav>
  );
};

export default Navbar;
