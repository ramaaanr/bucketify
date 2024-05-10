'use client';

import { motion } from 'framer-motion';
import { CreditCard, Flower2, PackageCheck, UserRoundPlus } from 'lucide-react';
const WorkSection = () => {
  return (
    <div className="work-section bg-white h-screen px-20 flex-col content-center">
      <div className="my-8 header-container flex justify-center">
        <h2 className="text-6xl text-primary font-bold">
          Bagaimana Aplikasi Kami Bekerja
        </h2>
      </div>
      <div className="my-16 how-works-container w-full">
        <ul className="work-list flex w-full justify-evenly">
          <motion.li
            whileHover={{ scale: 1.1 }}
            className="work-item flex flex-wrap flex-col cursor-pointer"
          >
            <UserRoundPlus className="self-center" color="#372948" size={120} />
            <p className="text-primary font-semibold text-2xl">
              Daftarkan Akun Anda
            </p>
          </motion.li>{' '}
          <motion.li
            whileHover={{ scale: 1.1 }}
            className=" cursor-pointer work-item flex flex-col "
          >
            <Flower2 className="self-center" color="#372948" size={120} />
            <p className="text-primary font-semibold text-2xl">
              Cari & Pilih Buket Kami
            </p>
          </motion.li>{' '}
          <motion.li
            whileHover={{ scale: 1.1 }}
            className=" cursor-pointer work-item flex flex-col "
          >
            <CreditCard className="self-center" color="#372948" size={120} />

            <p className="text-primary font-semibold text-2xl">
              Pemesanan & Pembayaran
            </p>
          </motion.li>{' '}
          <motion.li
            whileHover={{ scale: 1.1 }}
            className=" cursor-pointer work-item flex flex-col "
          >
            <PackageCheck className="self-center" color="#372948" size={120} />
            <p className="text-primary font-semibold text-2xl">
              Pengambilan Buket
            </p>
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default WorkSection;
