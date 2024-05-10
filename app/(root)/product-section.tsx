'use client';

import PreviewCard from '@/components/preview-card';
import { Button } from '@/components/ui/button';
import PreviewCardProps from '@/props/PreviewCardProps';
import { motion, animate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import useMeasure from 'react-use-measure';
const previewProducts: PreviewCardProps[] = [
  { label: 'Buket Boneka', href: '/images/buket-boneka.jpeg' },
  { label: 'Buket Balon', href: '/images/buket-balon.jpeg' },
  { label: 'Buket Uang', href: '/images/buket-uang.jpeg' },
  { label: 'Buket Bunga', href: '/images/buket-bunga.jpeg' },
  { label: 'Buket Snack', href: '/images/buket-snack.jpeg' },
];

const ProductSection = () => {
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 816;
    controls = animate(xTranslation, [0, finalPosition], {
      ease: 'linear',
      duration: 25,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  return (
    <div className="product-section  h-screen bg-tertiary flex-col content-center">
      <div className="my-8 header-container flex justify-end px-20">
        <h2 className="text-7xl text-primary font-bold">Produk Kami</h2>
      </div>
      <div className="my-8 preview-card-container w-full">
        <motion.div
          className="absoulute left-0 right-0 flex gap-4"
          style={{ x: xTranslation }}
          ref={ref}
        >
          {[...previewProducts, ...previewProducts].map(
            (previewProduct, index) => (
              <div className="card-item" key={index}>
                <PreviewCard
                  label={previewProduct.label}
                  href={previewProduct.href}
                />
              </div>
            ),
          )}
        </motion.div>
      </div>
      <div className="my-8  button-container w-full flex justify-center">
        <Button variant={'secondary'} size={'lg'} className="text-lg">
          Lihat Lebih Banyak Produk Kami...
        </Button>
      </div>
    </div>
  );
};

export default ProductSection;
