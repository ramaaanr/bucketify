'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/product-card';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import ProductCardProps from '@/props/ProductCardProps';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CategoryContainer from '@/components/templates/category-container';
import { Separator } from '@/components/ui/separator';
import BannerCarousel from '@/components/templates/banner-carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { STORE_IMAGES } from '@/config/kadobu-api';
import { Avatar } from '@radix-ui/react-avatar';
import { Store } from 'lucide-react';
import Image from 'next/image';

const Page = ({ params }: { params: { storeId: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>();
  const [store, setStore] = useState<any>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/store/${params.storeId}`);
        const { result } = await res.json();
        setData(result.katalog);
        setStore(result);
      } catch (err: any) {
        setError(err.message);
        throw Error('Halaman Utama Bermasalah');
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
              <BreadcrumbLink>
                <Link href="/catalogue">Katalog Produk</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{!store ? '' : store.alamat_toko}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="px-7 md:px-32 mb-2">
        <Card>
          {loading ? (
            ''
          ) : (
            <CardContent className="flex px-0 flex-col">
              <CardHeader className="flex mt-1 flex-row">
                <Image
                  width={48}
                  height={48}
                  src={`${STORE_IMAGES}/${store.foto_profil}`}
                  alt={store.nama_toko}
                  className="w-12 md:w-28 md:h-28 h-12 rounded-full mr-4"
                />
                <div className="store-detail">
                  <p className="text-base md:text-xl font-semibold">
                    {store.nama_toko}
                  </p>
                  <div className="flex items-start text-sm md:text-lg">
                    <Store size={14} className="mt-1 mr-1" />
                    <p>{store.alamat_toko}</p>
                  </div>
                </div>
              </CardHeader>
              <CardDescription className="w-full px-4 md:text-lg mt-1">
                <span className="font-semibold ">Tentang toko </span>
                {store.deskripsi_toko}
              </CardDescription>
              <CardFooter className="w-full md:w-1/3 flex py-0 gap-x-2 mt-4">
                <Link
                  className="px-2 text-center hover:bg-slate-50 py-1 w-full bg-white border border-gray-500 rounded-md"
                  href={store.lokasi_toko}
                >
                  Pergi Ke Toko
                </Link>
                <Link
                  className="px-2 text-center hover:bg-slate-50 py-1 w-full bg-white border border-gray-500 rounded-md"
                  href={store.telepon_toko.replace(/^0/, 'https://wa.me/62')}
                >
                  Hubungi Toko
                </Link>
              </CardFooter>
            </CardContent>
          )}
        </Card>
      </div>
      <div className="w-full px-8">
        <Separator className="w-full md:hidden my-2" />
      </div>
      <div className="grid grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4 w-fit mx-auto">
        {loading ? (
          <>
            {Array(10)
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
              ))}
          </>
        ) : (
          <>
            {data.map((product: ProductCardProps) => (
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
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Page;
