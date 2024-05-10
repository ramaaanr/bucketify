'use client';

import { motion } from 'framer-motion';
import { CreditCard, Flower2, PackageCheck, UserRoundPlus } from 'lucide-react';
const WorkSection = () => {
  return (
    <motion.div
      id="work-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="work-section bg-white min-h-screen lg:h-screen px-4 lg:px-20 flex-col content-center"
    >
      <div className="my-4 lg:my-8 header-container text-center lg:text-start flex justify-center">
        <h2 className="text-4xl lg:text-6xl text-primary font-bold">
          Bagaimana Aplikasi Kami Bekerja?
        </h2>
      </div>
      <div className="my-16 how-works-container w-full">
        <ul className="work-list flex flex-col lg:flex-row w-full justify-evenly">
          <motion.li
            whileHover={{ scale: 1.1 }}
            className="work-item flex flex-wrap flex-col cursor-pointer"
          >
            <UserRoundPlus className="self-center" color="#372948" size={120} />
            <p className="text-primary font-semibold text-md text-center lg:text-2xl">
              Daftarkan Akun Anda
            </p>
          </motion.li>{' '}
          <motion.li
            whileHover={{ scale: 1.1 }}
            className=" cursor-pointer work-item flex flex-col "
          >
            <Flower2 className="self-center" color="#372948" size={120} />
            <p className="text-primary font-semibold text-md text-center lg:text-2xl">
              Cari & Pilih Buket Kami
            </p>
          </motion.li>{' '}
          <motion.li
            whileHover={{ scale: 1.1 }}
            className=" cursor-pointer work-item flex flex-col "
          >
            <CreditCard className="self-center" color="#372948" size={120} />

            <p className="text-primary font-semibold text-md text-center lg:text-2xl">
              Pemesanan & Pembayaran
            </p>
          </motion.li>{' '}
          <motion.li
            whileHover={{ scale: 1.1 }}
            className=" cursor-pointer work-item flex flex-col "
          >
            <PackageCheck className="self-center" color="#372948" size={120} />
            <p className="text-primary font-semibold text-md text-center lg:text-2xl">
              Pengambilan Buket
            </p>
          </motion.li>
        </ul>
      </div>
    </motion.div>
  );
};

export default WorkSection;
