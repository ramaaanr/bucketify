'use client';

import useSnap from '@/hooks/useSnap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { API_ORDER, HEADERS } from '@/config/kadobu-api';
import { rupiahFormatter } from '@/utils/stringFormatter';
import { useAuth } from '@clerk/nextjs';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  nama_produk: string;
  harga_produk: number;
  deskripsi_produk: string;
  stok_produk: number;
  status_produk: string;
  nama_toko: string;
  id_toko: string;
  alamat_toko: string;
  foto_produk: string;
}

interface Params {
  storeId: string;
  productCode: string;
}

const Page = ({ params }: { params: Params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded, userId } = useAuth();
  const { storeId, productCode } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/catalogs/${productCode}`, {
        cache: 'no-cache',
      });

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }

      const result = await res.json();
      setProduct(result.data);
    };

    fetchData();
    return () => {};
  }, [productCode]);

  const orderButton = async () => {
    if (!userId) {
      toast({
        variant: 'destructive',
        title: 'Pesan Gagal',
        description: 'Login terlebih dahulu',
      });
      return null;
    }
    if (!isLoaded || !product) return null;

    if (quantity <= 0) {
      toast({
        variant: 'destructive',
        title: 'Pesan Gagal',
        description: 'Jumlah harus lebih besar dari 0',
      });
      return null;
    }

    const formData = {
      idPembeli: userId,
      kodeProduk: productCode,
      keterangan: 'Menunggu Pembayaran',
      totalPesanan: quantity.toString(),
    };

    const response = await fetch(`/api/orders`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      toast({
        variant: 'destructive',
        title: 'Pesan Gagal',
        description: 'Anda tidak bisa memesan produk',
      });
      return null;
    }

    const res = await response.json();
    router.push(`/orders/checkout/${res.data.snap_token}`);
    toast({
      variant: 'default',
      title: 'Pesan Berhasil',
      description: 'Pesanan anda berhasil',
    });
  };

  if (!product) return <div>Loading</div>;

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Link
                className="text-gray-400 hover:text-gray-500 cursor-pointer"
                href="/catalogue"
              >
                Katalog
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Link
                className="text-gray-400 hover:text-gray-500 cursor-pointer"
                href={`/catalogue/${product.id_toko}`}
              >
                {product.nama_toko}
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Produk</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="detail-container px-24 py-4 flex">
        <div className="image-container relative w-[345px] h-[460px]">
          <Image
            className="rounded-lg"
            src={`${process.env.NEXT_PUBLIC_API_URL}/product_images/${product.foto_produk}`}
            alt="Logo"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="text-container flex flex-col gap-y-2 w-[500px] px-8">
          <div className="header-container">
            <Badge
              variant={
                _.includes(product.status_produk, 'Ready')
                  ? 'highlight'
                  : 'default'
              }
            >
              {product.status_produk}
            </Badge>
            <h1 className="text-4xl font-semibold">{product.nama_produk}</h1>
          </div>
          <p className="text-xs text-gray-500">
            {`Stok Produk: ${product.stok_produk}`}
          </p>
          <div className="store-container flex flex-wrap items-center gap-x-2 px-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/images/partner-example-avatar.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="store-detail-container">
              <p className="font-medium text-sm">{product.nama_toko}</p>
              <p className="text-gray-500 text-sm">{product.alamat_toko}</p>
            </div>
          </div>
          <p className="text-4xl font-bold">
            {rupiahFormatter(product.harga_produk)}
          </p>
          <div className="action-container flex gap-x-2">
            <Button onClick={orderButton} className="w-1/2">
              Buat Pesanan
            </Button>
            <Input
              onChange={(e) => setQuantity(Number(e.target.value))}
              value={quantity}
              className="w-1/2"
              min={1}
              max={100}
              type="number"
              placeholder="Jumlah"
            />
          </div>
          <p className="text-gray-600 text-sm">{product.deskripsi_produk}</p>
        </div>
        <div id="snap-container"></div>
      </div>
    </>
  );
};

export default Page;
