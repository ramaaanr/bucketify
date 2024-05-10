'use client';

import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion dari Framer Motion
import { DM_Serif_Display as DSD } from 'next/font/google';
import PreviewCardProps from '@/props/PreviewCardProps';

const dsd = DSD({
  weight: ['400'],
  subsets: ['latin'],
});

const PreviewCard: React.FC<PreviewCardProps> = ({ label, href }) => {
  return (
    <motion.div // Gunakan motion.div sebagai wrapper
      className="relative overflow-hidden bg-cover w-72 h-72 rounded-lg "
      style={{ backgroundImage: `url(${href})` }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        whileHover={{
          opacity: 1,
          paddingBottom: '1rem',
          backgroundImage:
            'linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))',
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`${dsd.className} relative z-2 opacity-0 text-4xl  font-bold text-primary w-full h-full px-4 flex flex-col flex-wrap align-bottom justify-end`}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

export default PreviewCard;
