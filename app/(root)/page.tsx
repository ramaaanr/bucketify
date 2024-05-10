'use client';

import Navbar from '@/components/nav-bar';
import HomeSection from './home-section';
import ProductSection from './product-section';
import WorkSection from './work-section';
import PartnerSection from './partner-section';
import AboutSection from './about-section';

export default function Home() {
  return (
    <>
      <Navbar
        navItems={[
          { label: 'Home', href: 'home-section' },
          { label: 'Produk', href: 'product-section' },
          { label: 'Cara Kerja', href: 'work-section' },
          { label: 'Partner', href: 'partner-section' },
          { label: 'Tentang', href: 'about-section' },
        ]}
      />
      <HomeSection />
      <ProductSection />
      <WorkSection />
      <PartnerSection />
      <AboutSection />
      <footer className="w-full bg-secondary pl-2 text-xs py-2 text-white">
        © Kadobu 2024, All rights reserved
      </footer>
    </>
  );
}
