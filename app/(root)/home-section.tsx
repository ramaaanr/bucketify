'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HomeSection = () => {
  return (
    <motion.div
      id="home-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="home-section h-screen"
    >
      <Image
        className="absolute inset-0 z-0"
        src={'/images/hero-bg.jpg'}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="bg"
      />
      <div className="gradient-layer absolute inset-0 z-1   bg-gradient-to-br from-slate-400 to-pink-400 opacity-80"></div>
      <div className="home-container relative z-2  w-full h-full flex-col justify-center content-center px-4 lg:px-20">
        <div className="main-container flex ">
          <div className="text-container h-full flex flex-col align-middle justify-center">
            <h1 className="text-4xl lg:text-7xl font-bold text-white">
              Torehkan Kreativitasmu, Pilih Buket{' '}
              <span className="text-secondary">Hadiahmu</span> Sendiri 💝
            </h1>
            <p className="text-white">
              Setiap Sentuhan, Setiap Hadiah, Menyampaikan Kebahagian yang Tak
              Tergantikan
            </p>
          </div>
          <div className="image-container w-full"></div>
        </div>
        <div className="button-container w-full flex mt-8 gap-4 justify-center">
          <Button variant={'secondary'}>Produk Kami</Button>
          <Button variant={'ghost'} className="text-white">
            Cara Kerja
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSection;
