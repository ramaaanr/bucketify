'use client';
import ProductCardProps from '@/props/ProductCardProps';
import { rupiahFormatter, shortenProductName } from '@/utils/stringFormatter';
import { motion } from 'framer-motion';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

const ProductCard: React.FC<any> = ({
  isLoading,
  nama_produk,
  harga_produk,
  nama_toko,
  kode_produk,
  foto_produk,
  status_produk,
  id_toko,
}) => {
  // const api = process.env.NEXT_PUBLIC_API_URL;
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/katalogs/${kode_produk}`);
  console.log();
  if (isLoading)
    return (
      <>
        <motion.div
          whileHover={{ y: -4 }}
          className="product-card rounded-lg w-[210px]"
        >
          <Link href={isLoading ? '' : `/catalogue/${id_toko}/${kode_produk}`}>
            <div className="image-container relative w-[210px] h-[280px] ">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>

            <div className="text-container flex flex-col mt-2 gap-y-2">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-3/4 h-4" />
              <div className="product-store-container flex items-center">
                <Skeleton className=" w-1/3 h-2" />
              </div>
              <div className="product-price text-lg font-semibold text-secondary">
                <Skeleton className="w-1/2 h-4" />
              </div>
            </div>
          </Link>
        </motion.div>
      </>
    );

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="product-card rounded-lg w-[210px]"
      >
        <Link href={isLoading ? '' : `/catalogue/${id_toko}/${kode_produk}`}>
          <div className="image-container relative w-[210px] h-[280px] ">
            <Badge
              variant={
                _.includes(status_produk, 'Ready') ? 'highlight' : 'default'
              }
              className="absolute top-1 left-1 z-10"
            >
              {status_produk}
            </Badge>
            <Image
              className="rounded-lg"
              src={`${process.env.NEXT_PUBLIC_API_URL}/product_images/${foto_produk}`}
              alt="Logo"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>

          <div className="text-container px-2">
            <p className="product-name font-semibold h-12">
              {shortenProductName(nama_produk)}
            </p>
            <div className="product-store-container flex items-center">
              <Image
                width={16}
                height={16}
                src={'/images/flower-sho-icon.png'}
                alt="shop-icon"
              />
              <p className="product-store text-gray-500 text-xs">{nama_toko}</p>
            </div>
            <p className="product-price text-lg font-semibold text-secondary">
              {rupiahFormatter(harga_produk)}
            </p>
          </div>
        </Link>
      </motion.div>
    </>
  );
};

export default ProductCard;
