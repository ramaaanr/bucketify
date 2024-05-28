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
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>();
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        const cari = searchParams.get('cari');
        if (cari) {
          res = await fetch(`/api/catalogs?cari=${cari}`);
          setSearch(cari);
        } else {
          setSearch(null);
          res = await fetch('/api/catalogs');
        }
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result.data);
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
      <ul className="grid grid-cols-5 gap-y-4 p-4">
        {loading ? (
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
                nama_toko={product.nama_toko}
                status_produk={product.status_produk}
                id_toko={product.id_toko}
              />
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default Page;
