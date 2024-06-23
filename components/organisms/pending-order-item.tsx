'use client';

import { Order, KeranjangItem } from '@/props/OrderProps';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Gift, StoreIcon } from 'lucide-react';
import { dateFormatter, rupiahFormatter } from '@/utils/stringFormatter';
import Image from 'next/image';
import { API_PRODUCT_IMG } from '@/config/kadobu-api';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import _ from 'lodash';
import Link from 'next/link';

interface OrderItemProps {
  data: Order;
}

const PendingOrderItem: React.FC<OrderItemProps> = ({ data }) => {
  const router = useRouter();

  const {
    id_order,
    kode_pesanan,
    created_at,
    status,
    total_harga,
    snap_token,
    keranjang,
  } = data;

  // Get the first cart item for image
  const firstCartItem = keranjang[0];
  const { foto_produk, nama_toko } = firstCartItem;

  return (
    <Card>
      <CardContent className="px-4 pt-4">
        <div className="card-content flex">
          <div className="image-container relative w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
            <Image
              className="rounded-lg"
              src={`${API_PRODUCT_IMG}/${foto_produk}`}
              alt="Logo"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="p-2">
            <div className="detail-container">
              <p className="font-semibold text-lg">
                Kode Pesanan: {kode_pesanan}
              </p>

              <div className="flex gap-x-2">
                <p className="font-medium text-lg">
                  {dateFormatter(created_at)}
                </p>
                <Badge
                  variant={
                    _.includes(status, 'PENDING') ? 'highlight' : 'default'
                  }
                  className=" text-sm"
                >
                  {status}
                </Badge>
              </div>
              <p className="text-gray-500 text-lg">
                Total Belanja: {rupiahFormatter(total_harga)}
              </p>
            </div>
          </div>
        </div>
        <div className="cart-items-container mt-4">
          {keranjang.map((item: KeranjangItem) => (
            <div key={item.id_keranjang} className="cart-item mb-2 gap-x-2">
              <Link
                href={`/catalogue/${item.id_toko}/${item.kode_produk}}`}
                className="text-sm md:text-base cursor-pointer flex"
              >
                <p>{item.nama_produk}</p>{' '}
                <Badge variant={'outline'} className="text-xs flex">
                  <StoreIcon size={12} />
                  <p> {item.nama_toko}</p>
                </Badge>
              </Link>
              <p className="text-gray-500 text-xs md:text-base">{`${
                item.jumlah_pesanan
              } pesanan x ${rupiahFormatter(item.harga_produk)}`}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="card-footer w-full">
          <div className="footer-content-container pt-2 flex w-full">
            <Button
              onClick={() => router.push(`/orders/checkout/${snap_token}`)}
              className="w-full"
            >
              Bayar
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PendingOrderItem;
