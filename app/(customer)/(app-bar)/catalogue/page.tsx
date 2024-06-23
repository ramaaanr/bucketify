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
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CategoryContainer from '@/components/templates/category-container';
import { Separator } from '@/components/ui/separator';
import BannerCarousel from '@/components/templates/banner-carousel';

const Page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ProductCardProps[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        const cari = searchParams.get('cari');
        if (cari) {
          res = await fetch(`/api/catalogs?cari=${cari}`, {});
          setSearch(cari);
        } else {
          setSearch(null);
          res = await fetch('/api/catalogs');
        }
        if (!res.ok) {
          return new Error('Halaman Utama Bermasalah');
        }
        const result = await res.json();
        setData(result.data);
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
            {search ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{search}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              ''
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BannerCarousel />
      <CategoryContainer />
      <div className="w-full px-8">
        <Separator className="w-full md:hidden my-2" />
      </div>
      <div className="grid grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4 w-fit mx-auto">
        {loading ? (
          <>
            {Array(10)
              .fill({})
              .map((_, index) => (
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
        ) : data.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 mt-4">
            Tidak ada produk yang ditemukan.
          </div>
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
