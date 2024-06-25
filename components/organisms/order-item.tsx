'use client';

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
import { Badge } from '../ui/badge';
import _ from 'lodash';
import CommentDialog from './comment-dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface OrderItemProps {
  data: {
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
    kode_pesanan: string;
    id_toko: string;
    nama_toko: string;
    status_keranjang: string;
    id_komen: number;
  };
  isDisabled: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ data, isDisabled }) => {
  const {
    id_order,
    kode_pesanan,
    id_keranjang,
    status_keranjang,
    created_at,
    jumlah_pesanan,
    total_harga,
    catatan,
    nama_produk,
    foto_produk,
    status_produk,
    kode_produk,
    id_toko,
    nama_toko,
    id_komen,
  } = data;
  const [idKomen, setIdKomen] = useState<string | null | number>(id_komen);

  const [commentSubmitted, setCommentSubmitted] = useState(!!id_komen);
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/comment/${idKomen}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Komentar berhasil dihapus!');
        setIdKomen(null);
        setCommentSubmitted(!commentSubmitted);
      } else {
        toast.error('Gagal menghapus komentar');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the comment');
    }
  };

  const handleCommentSubmitted = (id_komen: string) => {
    setIdKomen(id_komen);
    setCommentSubmitted(!commentSubmitted);
  };

  return (
    <Card>
      <CardHeader className="w-full">
        <div className="flex card-header items-center w-full gap-x-2">
          <Gift color="#fc5c64" />
          <p className="font-semibold">{kode_pesanan}</p>

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
            {status_keranjang === 'COMPLETE' ? (
              commentSubmitted ? (
                <Button variant="outline" onClick={handleDelete}>
                  Hapus Ulasan
                </Button>
              ) : (
                <CommentDialog
                  cartId={id_keranjang}
                  commentId={id_komen}
                  onCommentSubmitted={handleCommentSubmitted}
                />
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderItem;
