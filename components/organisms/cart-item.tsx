'use client';

import Cart from '@/props/CartProps';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Gift, StoreIcon, Trash } from 'lucide-react';
import { dateFormatter, rupiahFormatter } from '@/utils/stringFormatter';
import Image from 'next/image';
import { API_PRODUCT_IMG } from '@/config/kadobu-api';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';
import _ from 'lodash';
import { useState } from 'react';

interface CartItemProps {
  data: Cart;
  onSelectItem: (item: Cart, isSelected: boolean) => void;
  onDeleteItem: (id_keranjang: number) => void;
  isDisabled: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  data,
  onSelectItem,
  onDeleteItem,
  isDisabled,
}) => {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    id_keranjang,
    created_at,
    jumlah_pesanan,
    total_harga,
    catatan,
    nama_produk,
    foto_produk,
    status_produk,
    kode_produk,
    id_toko,
    foto_profil,
    nama_toko,
  } = data;

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
    onSelectItem(data, !isSelected);
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    await onDeleteItem(id_keranjang);
    setIsDeleting(false);
  };

  return (
    <Card>
      <CardHeader className="w-full">
        <div className="flex card-header items-center w-full gap-x-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            disabled={isDisabled && !isSelected}
          />
          <Gift color="#fc5c64" />
          <p className="font-medium">{dateFormatter(created_at)}</p>
          <Badge
            variant={
              _.includes(status_produk, 'Ready') ? 'highlight' : 'default'
            }
            className=""
          >
            {status_produk}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-0">
        <div className="card-content flex ">
          <div className="image-container relative w-[100px] h-[100px] md:w-[150px] md:h-[150px]   ">
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
              <div className="toko-container items-center flex">
                <StoreIcon size={12} className="mr-1" />
                <p className="text-xs md:text-base">{nama_toko}</p>
              </div>
              <p className="font-semibold text-xs md:text-base">
                {nama_produk}
              </p>
              <p className="text-gray-500 text-xs md:text-base">{`${jumlah_pesanan} pesanan x ${rupiahFormatter(
                total_harga / jumlah_pesanan,
              )}`}</p>
            </div>
            <div className="price-container">
              <p className="text-xs md:text-base">Total Belanja</p>
              <p className="text-xs md:text-base font-bold">
                {rupiahFormatter(total_harga)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="card-footer w-full">
          <div className="footer-content-container pt-2 flex w-full">
            <div className="Catatan w-full text-xs md:text-base">
              <span className="font-semibold mr-1">Catatan:</span>
              {catatan}
            </div>
            <div className="button-container gap-x-2 flex">
              <Button
                onClick={() =>
                  router.push(`/catalogue/${id_toko}/${kode_produk}`)
                }
                variant={'secondary'}
              >
                Beli Lagi
              </Button>
              <Button
                onClick={handleDeleteClick}
                className="flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="mr-2">Loading...</span>
                ) : (
                  <>
                    <Trash className="mr-2" size={16} />
                    Hapus
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CartItem;
