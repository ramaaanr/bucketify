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
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { STORE_IMAGES } from '@/config/kadobu-api';
import { Skeleton } from '@/components/ui/skeleton';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Page({ params }: { params: { storeId: string } }) {
  const [data, setData] = useState<any>();
  const [store, setStore] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/store/${params.storeId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const { result } = await res.json();
        setData(result.katalog);
        delete result.katalog;
        setStore(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

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
            {!loading || store ? (
              <BreadcrumbPage>
                <Link
                  className="text-gray-400 hover:text-gray-500 cursor-pointer"
                  href={`/catalogue/${store.id_toko}`}
                >
                  {store.nama_toko}
                </Link>
              </BreadcrumbPage>
            ) : (
              ''
            )}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pr-16 mt-4">
        <Card>
          <CardContent className="flex pt-4 mt-2 px-6 gap-x-3">
            {store ? (
              <>
                <Avatar className="h-28 w-28">
                  <AvatarImage
                    src={`${STORE_IMAGES}/${store.foto_profil}`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>{store.nama_toko}</AvatarFallback>
                </Avatar>
                <div className="store-detail mt-2">
                  <p className="text-3xl font-semibold">{store.nama_toko}</p>
                  <div className="flex items-start text-medium  mt-1">
                    <Store size={14} className="mt-1" />
                    <p>{store.alamat_toko}</p>
                  </div>
                </div>
                <div className="mt-12 text-medium">
                  <span className="font-semibold">Deskripsi :</span>
                  <span className="text-gray-500">{store.deskripsi_toko}</span>
                </div>
                <div className="button-container self-center ml-auto  flex h-full items-center gap-x-2 ">
                  <Button variant={'outline'}>
                    <Link
                      target={'_blank'}
                      className="text-gray-400  hover:text-gray-800 mr-2"
                      href={store.lokasi_toko}
                    >
                      Kunjungi Toko
                    </Link>
                  </Button>
                  <Button variant={'outline'}>
                    <Link
                      target="_blank"
                      className="text-gray-400  hover:text-gray-800 mr-2"
                      href={store.telepon_toko.replace(
                        /^0/,
                        'https://wa.me/62',
                      )}
                    >
                      Chat Penjual
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Avatar className="h-28 w-28">
                  <Skeleton className="w-full h-full rounded-full" />
                </Avatar>
                <div className="store-detail mt-2">
                  <Skeleton className="h-8 w-48" />
                  <div className="flex items-start text-medium  mt-1">
                    <Store size={14} className="mt-1" />
                    <Skeleton className="h-4 mt-1 w-24"></Skeleton>
                  </div>
                </div>
                <div className="mt-12 text-medium">
                  <span className="font-semibold">Deskripsi :</span>
                  <Skeleton className="h-2 w-60" />
                </div>
                <div className="button-container self-center ml-auto  flex h-full items-center gap-x-2 ">
                  <Button disabled variant={'outline'}>
                    Kunjungi Toko
                  </Button>
                  <Button disabled variant={'outline'}>
                    Chat Penjual
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <ul className="grid grid-cols-5 gap-y-4 p-4">
        {loading || !store ? (
          <>
            {Array(10)
              .fill({})
              .map((product: ProductCardProps, index) => (
                <ProductCard key={index} isLoading={true} />
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
                nama_toko={store.nama_toko}
                status_produk={product.status_produk}
                id_toko={store.id_toko}
              />
            ))}
          </>
        )}
      </ul>
    </>
  );
}
