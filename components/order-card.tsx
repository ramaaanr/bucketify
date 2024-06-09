'use client';

import Order from '@/props/Order';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Gift, StoreIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import { dateFormatter, rupiahFormatter } from '@/utils/stringFormatter';
import Image from 'next/image';
import { API_PRODUCT_IMG } from '@/config/kadobu-api';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface OrderCardProps {
  data: Order;
}

interface statusValue {
  text: string;
  color: string;
}

interface OrderStatus {
  [key: string]: statusValue;
}

const orderStatus: OrderStatus = {
  PENDING: {
    text: 'Belum Dibayar',
    color: 'bg-yellow-500',
  },
  PAID: {
    text: 'Sudah Dibayar',
    color: 'bg-indigo-500',
  },
  CANCELED: {
    text: 'GAGAL',
    color: 'bg-red-500',
  },
  ACCEPT: {
    text: 'Diterima',
    color: 'bg-blue-500',
  },
  ON_PROGRESS: {
    text: 'Diproses',
    color: 'bg-sky-500',
  },
  READY: {
    text: 'Siap Diambil',
    color: 'bg-emerald-500',
  },
  COMPLETE: {
    text: 'Selesai',
    color: 'bg-green-500',
  },
};

const OrderCard: React.FC<OrderCardProps> = ({ data }) => {
  const router = useRouter();
  const {
    id_order,
    created_at,
    status,
    snap_token,
    total_harga,
    total_pesanan,
    nama_produk,
    foto_produk,
    kode_pesanan,
    keterangan,
    nama_toko,
    kode_produk,
    id_toko,
  } = data;

  const orderText = orderStatus[`${status}`].text;
  const orderColor = orderStatus[`${status}`].color;
  return (
    <>
      <Card>
        <CardHeader className="w-full">
          <div className="flex card-header items-center w-full gap-x-2">
            <Gift color="#fc5c64" />
            <p className="text-gray-500">{kode_pesanan}</p>
            <p className="font-medium">{dateFormatter(created_at)}</p>
            <div
              className={`self-end place-content-end ${orderColor} p-1 text-xs text-white rounded-md`}
            >
              {orderText}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="card-content flex ">
            <Image
              alt={nama_produk}
              height={100}
              width={100}
              src={`${API_PRODUCT_IMG}/${foto_produk}`}
              className="rounded-lg"
            />
            <div className="detail-container p-2">
              <div className="toko-container items-center flex">
                <StoreIcon size={16} className="mr-1" />
                <p>{nama_toko}</p>
              </div>
              <p className="font-semibold text-xl">{nama_produk}</p>
              <p className="text-gray-500 text-xs">{`${total_pesanan} pesanan x ${rupiahFormatter(
                total_harga / total_pesanan,
              )}`}</p>
            </div>
            <div className="price-container ml-auto border-l border-l-gray-300 py-1 pl-4">
              <p>Total Belanja</p>
              <p className="font-bold">{rupiahFormatter(total_harga)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="card-footer w-full">
            <div className="footer-content-container pt-2 flex w-full">
              <div className="keterangan w-full text-xs">
                <span className="font-semibold mr-1">Keterangan:</span>
                {keterangan}
              </div>
              <div className="button-container gap-x-2 flex">
                <Button
                  disabled={status !== 'PENDING'}
                  onClick={() => router.push(`/orders/checkout/${snap_token}`)}
                  variant={'outline'}
                >
                  Bayar
                </Button>
                <Button
                  onClick={() =>
                    router.push(`/catalogue/${id_toko}/${kode_produk}`)
                  }
                  variant={'secondary'}
                >
                  Beli Lagi
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default OrderCard;
