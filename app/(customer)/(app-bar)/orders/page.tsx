'use client';

import React, { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Toaster, toast } from 'sonner';
import { ScrollText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PendingOrderItem from '@/components/organisms/pending-order-item';
import OrderItem from '@/components/organisms/order-item';
import { KeranjangItem } from '@/props/OrderProps';
import useDebounce from '@/hooks/useDebounce'; // Make sure to implement/use a debounce hook
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import TopBar from '@/components/templates/top-bar';

interface PendingOrder {
  id_order: number;
  kode_pesanan: string;
  jenis_pembayaran: string | null;
  status: string;
  total_harga: number;
  id_pembeli: string;
  created_at: string;
  snap_token: string;
  keranjang: KeranjangItem[];
}

interface NonPendingOrder {
  id_order: number;
  id_keranjang: number;
  created_at: string;
  jumlah_pesanan: number;
  total_harga: number;
  catatan: string;
  nama_produk: string;
  foto_produk: string;
  status_produk: string;
  kode_produk: string;
  id_toko: string;
  nama_toko: string;
}

const Page = () => {
  const router = useRouter();
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[] | null>(
    null,
  );
  const [nonPendingOrders, setNonPendingOrders] = useState<
    NonPendingOrder[] | null
  >(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>('PENDING'); // Default filter status
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term with 500ms delay

  const fetchData = async () => {
    setLoading(true);
    setPendingOrders(null); // Clear pending orders
    setNonPendingOrders(null); // Clear non-pending orders

    try {
      let response;
      if (filterStatus === 'PENDING') {
        response = await fetch(
          `/api/orders?cari=${encodeURIComponent(debouncedSearchTerm)}`,
        );
      } else {
        response = await fetch(
          `/api/orders?status=${filterStatus}&cari=${encodeURIComponent(
            debouncedSearchTerm,
          )}`,
        );
      }
      const res = await response.json();
      if (response.ok) {
        const { data } = res;
        if (filterStatus === 'PENDING') {
          setPendingOrders(data);
        } else {
          setNonPendingOrders(data);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedSearchTerm, filterStatus]); // Trigger fetch data when searchTerm or filterStatus changes

  const handleFilterChange = (filterValue: string) => {
    setFilterStatus(filterValue);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    throw new Error('Halaman order Bermasalah');
  }

  return (
    <>
      <TopBar />
      <div className="py-4 px-8 sm:px-16 md:px-28 lg:px-32">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                <p>Pesanan Anda</p>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="order-container pb-8 pt-8 md:pt-4 px-4 gap-x-4 flex justify-center">
        <Card className="sticky hidden md:block top-32 w-[400px] h-fit">
          <CardHeader>
            <h2 className="font-semibold">Filter & Pencarian Pesanan</h2>
          </CardHeader>
          <CardContent>
            <Label htmlFor="statusSelect">Status:</Label>
            <Select
              onValueChange={handleFilterChange}
              defaultValue={filterStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih status pesanan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Belum Dibayar</SelectItem>
                <SelectItem value="PAID">Dibayar</SelectItem>
                <SelectItem value="CANCELED">Dibatalkan</SelectItem>
                <SelectItem value="ACCEPT">Diterima</SelectItem>
                <SelectItem value="ON_PROGRESS">Diproses</SelectItem>
                <SelectItem value="READY">Siap Diambil</SelectItem>
                <SelectItem value="COMPLETE">Selesai</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="inputCari">Cari:</Label>
            <Input
              id="inputCari"
              type="text"
              placeholder="Cari pesanan..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </CardContent>
        </Card>

        {loading ? (
          <div className="w-1/2">
            <MoonLoader className="mx-auto mt-16" color="#fc5c64" />
          </div>
        ) : filterStatus === 'PENDING' ? (
          pendingOrders && pendingOrders.length > 0 ? (
            <div className="order-card-container w-full md:w-1/2 pb-32 space-y-4">
              {pendingOrders.map((order) => (
                <PendingOrderItem key={order.id_order} data={order} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full md:max-w-[693px]">
              <div className="text-center">
                <ScrollText size={64} className="mx-auto" />
                <p className="mt-4 text-gray-500 text-lg">
                  Anda Belum Memiliki Pesanan
                </p>
              </div>
            </div>
          )
        ) : nonPendingOrders && nonPendingOrders.length > 0 ? (
          <div className="order-card-container w-full md:w-1/2 pb-32 space-y-4">
            {nonPendingOrders.map((order) => (
              <OrderItem isDisabled={false} key={order.id_order} data={order} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full md:max-w-[693px]">
            <div className="text-center">
              <ScrollText size={64} className="mx-auto" />
              <p className="mt-4 text-gray-500 text-lg">
                Anda Belum Memiliki Pesanan
              </p>
            </div>
          </div>
        )}
      </div>

      <Toaster position="top-right" />
    </>
  );
};

export default Page;
