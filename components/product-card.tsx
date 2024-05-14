'use client';
import ProductCardProps from '@/props/ProductCardProps';
import { rupiahFormatter, shortenProductName } from '@/utils/stringFormatter';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  store,
  productCode,
  imageUrl,
}) => {
  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="product-card rounded-lg w-[210px]"
      >
        <Link href={`/catalogue/?kode=${productCode}`}>
          <div className="image-container relative w-[210px] h-[280px] bg-">
            <Image
              className="rounded-lg"
              src={imageUrl}
              alt="Logo"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>

          <div className="text-container px-2">
            <p className="product-name h-12">{shortenProductName(name)}</p>
            <p className="product-store text-xs">{store}</p>
            <p className="product-price text-lg font-semibold text-secondary">
              {rupiahFormatter(price)}
            </p>
          </div>
        </Link>
      </motion.div>
      {/* <div
          style={{
            position: 'relative',
            width: `${210}px`,
            height: `${280}px`,
          }}
        >
          <Image
            src={imageUrl}
            alt="Logo"
            fill
            objectFit="cover"
            objectPosition="center"
            style={{ objectFit: 'cover' }}
          />
        </div> */}
    </>
  );
};

export default ProductCard;
