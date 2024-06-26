'use client';

import React, { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import Cart from '@/props/CartProps';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/organisms/cart-item';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { rupiahFormatter } from '@/utils/stringFormatter';
import { ShoppingCart } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState<Cart[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<Cart[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false); // State untuk menunjukkan proses order sedang berlangsung

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch('/api/carts');
    const res = await response.json();
    if (response.ok) {
      const { results: data } = res;
      setData(data);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    throw new Error('Halaman cart Bermasalah');
  }

  const handleSelectItem = (item: Cart, isSelected: boolean) => {
    if (isSelected) {
      if (totalOrders + item.jumlah_pesanan > 5) {
        toast.error('Pesanan tidak boleh lebih dari 5');
        return;
      }
      setSelectedItems([...selectedItems, item]);
      setTotalOrders(totalOrders + item.jumlah_pesanan);
    } else {
      setSelectedItems(
        selectedItems.filter((i) => i.id_keranjang !== item.id_keranjang),
      );
      setTotalOrders(totalOrders - item.jumlah_pesanan);
    }
  };

  const handleDeleteItem = async (id_keranjang: number) => {
    try {
      const response = await fetch(`/api/carts/${id_keranjang}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Item berhasil dihapus');
        setSelectedItems([]);
        fetchData();
      } else {
        toast.error('Gagal menghapus item');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus item');
    }
  };

  const handleBuyItems = async () => {
    try {
      setIsProcessingOrder(true); // Menampilkan indikator loading
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listKeranjang: selectedItems }),
      });

      if (response.ok) {
        toast.success('Pembelian berhasil');
        const res = await response.json();
        router.push(`/orders/checkout/${res.data.snap_token}`);
      } else {
        toast.error('Gagal melakukan pembelian');
        setSelectedItems([]);
        setIsProcessingOrder(false); // Menyembunyikan indikator loading setelah selesai
        fetchData();
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat melakukan pembelian');
      fetchData();
      setSelectedItems([]);
      setIsProcessingOrder(false); // Menyembunyikan indikator loading setelah selesai
    }
  };

  const totalSelectedPrice = selectedItems.reduce(
    (total, item) => total + item.total_harga,
    0,
  );

  return (
    <>
      <div className="py-4 px-8 sm:px-16 md:px-28 lg:px-32">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                <p>Keranjang Anda</p>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="cart-container pb-8 pt-8 md:pt-4 px-4 gap-x-4 flex justify-center">
        {loading ? (
          <div className="w-1/2">
            <MoonLoader className="mx-auto mt-16" color="#fc5c64" />
          </div>
        ) : data && data.length > 0 ? (
          <div className="cart-card-container w-full md:w-1/2 pb-32 space-y-4">
            {data.map((cart) => (
              <CartItem
                key={cart.id_keranjang}
                data={cart}
                onSelectItem={handleSelectItem}
                onDeleteItem={handleDeleteItem}
                isDisabled={totalOrders >= 5}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center mt-16 justify-center w-full md:w-72">
            <div className="text-center">
              <ShoppingCart size={64} className="mx-auto" />
              <p className="mt-4 text-gray-500 text-lg">
                Keranjang Anda kosong.
              </p>
            </div>
          </div>
        )}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-lg z-20">
          <div className="md:hidden h-fit px-2 py-2 pb-4">
            <div className="rounded-lg border p-4 mb-2 border-gray-200">
              <div className="flex justify-between">
                <p className="text-xl font-semibold">Total Harga</p>
                <span className="text-xl">
                  {rupiahFormatter(totalSelectedPrice)}
                </span>
              </div>
            </div>
            <div className="flex gap-x-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant={'outline'}
                    className="w-full"
                    disabled={selectedItems.length === 0 || isProcessingOrder}
                  >
                    {isProcessingOrder ? (
                      <MoonLoader size={20} color="#ffffff" />
                    ) : (
                      'Lihat Detail Belanja'
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full pb-8 max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Ringkasan Belanja</DrawerTitle>
                    </DrawerHeader>
                    {selectedItems.map((item) => (
                      <div
                        key={item.id_keranjang}
                        className="flex justify-between mb-2"
                      >
                        <span className="max-w-64">{item.nama_produk}</span>
                        <span>
                          {item.jumlah_pesanan} x{' '}
                          {rupiahFormatter(
                            item.total_harga / item.jumlah_pesanan,
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>
              <Button
                className="w-full"
                disabled={selectedItems.length === 0 || isProcessingOrder}
                onClick={handleBuyItems}
              >
                {isProcessingOrder ? 'Memproses...' : 'Beli'}
              </Button>
            </div>
          </div>
        </div>
        {isProcessingOrder && (
          <div className="overlay-loading">
            <MoonLoader size={50} color="#ffffff" />
          </div>
        )}
        <Card className="sticky hidden md:block top-32 w-[400px] h-fit">
          <CardHeader>
            <h2 className="font-semibold">Ringkasan Belanja</h2>
          </CardHeader>
          <CardContent>
            {selectedItems.map((item) => (
              <div
                key={item.id_keranjang}
                className="flex justify-between mb-2"
              >
                <span className="max-w-64">{item.nama_produk}</span>
                <span>
                  {item.jumlah_pesanan} x{' '}
                  {rupiahFormatter(item.total_harga / item.jumlah_pesanan)}
                </span>
              </div>
            ))}
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total Harga:</span>
              <span>{rupiahFormatter(totalSelectedPrice)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={selectedItems.length === 0 || isProcessingOrder}
              onClick={handleBuyItems}
            >
              {isProcessingOrder ? 'Memproses...' : 'Beli'}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default Page;
