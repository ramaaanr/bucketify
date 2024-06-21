'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/product-card';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import ProductCardProps from '@/props/ProductCardProps';
import { useRouter, useSearchParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { BookHeart, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<{
    available: ProductCardProps[];
    notAvailable: ProductCardProps[];
  }>({ available: [], notAvailable: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/wishlists`, {
          cache: 'no-cache',
        });

        if (!res.ok) {
          throw new Error('Halaman Wishlist Bermasalah');
        }
        const { results } = await res.json();
        const available = results.filter(
          (item: any) => item.deleted_at === null && item.stok_produk > 0,
        );

        const notAvailable = results.filter(
          (item: any) => item.deleted_at !== null || item.stok_produk <= 0,
        );

        setData({ available, notAvailable });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="py-4 px-8 sm:px-16 md:px-28 lg:px-32">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Wishlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4 w-fit mx-auto">
        {loading ? (
          Array(10)
            .fill({})
            .map((product: ProductCardProps, index) => (
              <ProductCard
                key={index}
                isLoading={true}
                foto_produk={''}
                nama_produk={'test'}
                harga_produk={0}
                kode_produk={''}
                nama_toko={''}
                status_produk={''}
                id_toko={''}
                alamat_toko={''}
              />
            ))
        ) : (
          <>
            {data.available.length > 0 ? (
              data.available.map((product: ProductCardProps) => (
                <ProductCard
                  isLoading={false}
                  foto_produk={product.foto_produk}
                  key={product.kode_produk}
                  nama_produk={product.nama_produk}
                  harga_produk={product.harga_produk}
                  kode_produk={product.kode_produk}
                  nama_toko={product.nama_toko}
                  status_produk={product.status_produk}
                  id_toko={product.id_toko}
                  alamat_toko={product.alamat_toko}
                  disabled={
                    product.deleted_at !== null || product.stok_produk <= 0
                  }
                />
              ))
            ) : (
              <div className="col-span-full mx-6 py-4 mt-32 md:mt-8 md:px-16 rounded-lg p-4 border border-gray-300 shadow-md">
                <BookHeart className="mx-auto" size={240} color={'#372947'} />
                <div className="text-3xl text-primary font-semibold text-center">
                  Anda Belum Menambahkan Produk Favorit!
                </div>
                <Button
                  onClick={() => router.push('/catalogue')}
                  className="w-full my-4"
                >
                  Lihat Katalog Produk
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      {data.notAvailable.length > 0 && (
        <>
          <div className="px-8 sm:px-16 md:px-28 lg:px-32 mt-4">
            <Separator className="w-full " />
          </div>
          <h2 className="my-2 px-8 sm:px-16 md:px-28 lg:px-32 ">
            Produk Tidak Tersedia
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4 w-fit mx-auto">
            {loading
              ? Array(10)
                  .fill({})
                  .map((product: ProductCardProps, index) => (
                    <ProductCard
                      key={index}
                      isLoading={true}
                      foto_produk={''}
                      nama_produk={'test'}
                      harga_produk={0}
                      kode_produk={''}
                      nama_toko={''}
                      status_produk={''}
                      id_toko={''}
                      alamat_toko={''}
                    />
                  ))
              : data.notAvailable.map((product: ProductCardProps) => (
                  <ProductCard
                    isLoading={false}
                    foto_produk={product.foto_produk}
                    key={product.kode_produk}
                    nama_produk={product.nama_produk}
                    harga_produk={product.harga_produk}
                    kode_produk={product.kode_produk}
                    nama_toko={product.nama_toko}
                    status_produk={product.status_produk}
                    id_toko={product.id_toko}
                    alamat_toko={product.alamat_toko}
                    disabled={
                      product.deleted_at !== null || product.stok_produk <= 0
                    }
                  />
                ))}
          </div>
        </>
      )}
    </>
  );
};

export default Page;
