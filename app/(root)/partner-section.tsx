'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const PartnerSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="partner-section"
      className="partner-section flex flex-col lg:flex-row  lg:h-screen"
    >
      <div
        className="partner-example-container w-full h-screen lg:h-full bg-cover"
        style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}
      >
        <motion.div
          whileHover={{ backgroundColor: 'rgba(251, 207, 232, 0.5)' }} // Mengubah background-color menjadi pink saat dihover
          className="opacity-layer  h-full w-full flex flex-wrap justify-center content-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="content flex flex-wrap justify-center content-center w-full h-full"
          >
            <Avatar className="h-40 w-40">
              <AvatarImage src="/images/partner-example-avatar.png" />
            </Avatar>
            <div className="partner-detail-container flex flex-col ml-4 justify-center content-center">
              <h4 className="text-6xl text-white font-semibold">@hello.als</h4>
              <p className="text-2xl text-white font-semibold">
                Banjarbaru, Dahlina Raya
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="pl-8 partner-invitation-container w-full h-screen lg:h-full bg-secondary flex flex-col flex-wrap content-center justify-center">
        <h2 className="text-4xl lg:text-7xl mb-4 font-bold text-primary">
          Membantu Pelaku <span className="text-white">UMKM</span> dalam usaha
          buket kreativ
        </h2>
        <div className="button-container pl-4">
          <Button variant={'outline'}>Bergabung Dengan Kami 👋</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PartnerSection;
