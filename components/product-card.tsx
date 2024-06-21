'use client';
import React from 'react';
import { rupiahFormatter, shortenProductName } from '@/utils/stringFormatter';
import { motion } from 'framer-motion';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Store } from 'lucide-react';

interface ProductCardProps {
  isLoading?: boolean;
  nama_produk: string;
  harga_produk: number;
  nama_toko: string;
  kode_produk: string;
  foto_produk: string;
  status_produk: string;
  id_toko: string;
  alamat_toko: string;
  disabled?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  isLoading,
  nama_produk,
  harga_produk,
  nama_toko,
  kode_produk,
  foto_produk,
  status_produk,
  id_toko,
  alamat_toko,
  disabled = false,
}) => {
  if (isLoading)
    return (
      <>
        <motion.div
          whileHover={{ y: -4 }}
          className="product-card rounded-lg  w-[150px] md:w-[210px] "
        >
          <div className="relative">
            <div className="image-container relative w-[150px] h-[200px] md:w-[210px]  md:h-[280px]  ">
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
          </div>
        </motion.div>
      </>
    );

  return (
    <>
      <motion.div
        whileHover={{ y: disabled ? 0 : -4 }}
        className={`product-card rounded-lg w-[150px] md:w-[210px] ${
          disabled ? 'pointer-events-none' : ''
        }`}
      >
        <div className="relative">
          <Link href={disabled ? '' : `/catalogue/${id_toko}/${kode_produk}`}>
            <div className="image-container relative w-[150px] h-[200px] md:w-[210px]  md:h-[280px]  ">
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
              {disabled && (
                <div className="absolute inset-0 bg-gray-100 opacity-75 rounded-lg"></div>
              )}
            </div>

            <div className="text-container px-2">
              <div className="product-store-container mt-2 flex items-center">
                <Image
                  width={16}
                  height={16}
                  src={'/images/flower-sho-icon.png'}
                  alt="shop-icon"
                />
                <p className="product-store font-semibold text-primary text-xs">
                  {nama_toko}
                </p>
              </div>
              <p className="product-name  text-gray-500 text-xs">
                {shortenProductName(nama_produk)}
              </p>
              <p className="product-price text-lg mb-0 font-semibold text-secondary">
                {rupiahFormatter(harga_produk)}
              </p>
              <div className="product-address-container flex items-center">
                <Store size={12} color="#372947" />
                <p className="ml-1 product-address text-gray-500 text-xs">
                  {shortenProductName(alamat_toko)}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;
