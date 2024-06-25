'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { rupiahFormatter } from '@/utils/stringFormatter';
import { useAuth } from '@clerk/nextjs';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  ShoppingCart,
  ArrowLeft,
  MinusIcon,
  Notebook,
  NotebookPen,
  PlusIcon,
  Heart,
  Star,
  StarIcon,
  HeartOff,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { STORE_IMAGES } from '@/config/kadobu-api';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import CommentsList from '@/components/templates/comments-list';

const comments = [
  {
    name: 'John Doe',
    date: '2023-06-18',
    text: 'Great product! Highly recommend it.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    date: '2023-06-17',
    text: 'Good value for the price.',
    rating: 4,
  },
  {
    name: 'Alice Johnson',
    date: '2023-06-16',
    text: 'Average quality, but fast shipping.',
    rating: 3,
  },
];

interface Product {
  nama_produk: string;
  nama_kategori: string;
  harga_produk: number;
  deskripsi_produk: string;
  stok_produk: number;
  status_produk: string;
  nama_toko: string;
  id_toko: string;
  alamat_toko: string;
  foto_profil: string;
  foto_produk: string;
}

interface Params {
  storeId: string;
  productCode: string;
}

const Page = ({ params }: { params: Params }) => {
  const router = useRouter();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const { isLoaded, userId } = useAuth();
  const { storeId, productCode } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [liked, setLiked] = useState<any>(null);
  const [isFetchLikeLoading, setIsFetchLikeLoading] = useState(true);

  const handleAddToCart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Durasi animasi
  };
  const fetchIsLiked = async () => {
    const res = await fetch(`/api/wishlists?kode_produk=${productCode}`, {
      cache: 'no-cache',
    });

    if (!res.ok) {
      setLiked(null);
    } else {
      const { result } = await res.json();
      setLiked(result.id_wishlist);
    }

    setIsFetchLikeLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/catalogs/${productCode}`, {
        cache: 'no-cache',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const { data } = await res.json();
      setProduct(data);
      setPrice(data.harga_produk);
    };

    fetchData();
    fetchIsLiked();
    return () => {};
  }, [productCode]);

  const orderButton = async () => {
    if (!userId) {
      toast({
        variant: 'destructive',
        title: 'Pesan Gagal',
        description: 'Login terlebih dahulu',
      });
      return null;
    }
    if (!isLoaded || !product) return null;

    if (quantity <= 0) {
      toast({
        variant: 'destructive',
        title: 'Pesan Gagal',
        description: 'Jumlah harus lebih besar dari 0',
      });
      return null;
    }

    const formData = {
      idPembeli: userId,
      kodeProduk: productCode,
      jumlahPesanan: quantity.toString(),
      catatan: note || ' ',
    };

    const response = await fetch(`/api/carts`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      toast({
        variant: 'destructive',
        title: 'Pesanan Gagal Ditambahkan Ke Keranjang',
        description: 'Pesanan Gagal Ditambahkan Ke Keranjang',
      });
      return null;
    }

    if (cancelButtonRef.current) {
      cancelButtonRef.current.click();
    }
    toast({
      variant: 'default',
      title: 'Pesanan Berhasil Ditambahkan Ke Keranjang',
      description: 'Pesanan Berhasil Ditambahkan Ke Keranjang',
    });
    handleAddToCart();
  };

  const handleAddToWishlist = async () => {
    const response = await fetch('/api/wishlists', {
      method: 'POST',
      body: JSON.stringify({ kode_produk: productCode || '' }),
    });
    if (response.ok) {
      toast({
        variant: 'default',
        title: 'Wishlist',
        description: 'Tambah Berhasil !!!',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Wishlist',
        description: 'Tambah Gagal !!!',
      });
    }
    await fetchIsLiked();
  };
  const handleDeleteFromWishlist = async () => {
    const response = await fetch(`/api/wishlists/${liked}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      toast({
        variant: 'default',
        title: 'Wishlist',
        description: 'Hapus Berhasil !!!',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Wishlist',
        description: 'Hapus Gagal !!!',
      });
    }
    await fetchIsLiked();
  };

  if (!product) return <div>Loading</div>;

  return (
    <>
      <div className="max-w-md md:max-w-screen-xl mx-auto flex  flex-col md:justify-center md:flex-row  bg-white ">
        <div className="image-container relative w-full md:w-[400px] h-[500px]">
          <div className="absolute top-1 left-0 right-0 w-full z-10 flex justify-between p-2">
            <div
              onClick={() => router.back()}
              className="p-1 rounded-md  hover:bg-slate-100"
            >
              <ArrowLeft size={36} color={'white'} className="shadow-md" />
            </div>
            <Badge
              variant={
                _.includes(product.status_produk, 'Ready')
                  ? 'highlight'
                  : 'default'
              }
            >
              {product.status_produk}
            </Badge>
          </div>
          <Image
            className="md:rounded-lg"
            src={`${process.env.NEXT_PUBLIC_API_URL}/product_images/${product.foto_produk}`}
            alt="product-image"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="p-4 w-full md:w-[450px]">
          <h2 className="text-3xl md:text-5xl font-semibold mb-2">
            {product.nama_produk}
          </h2>
          <p className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Rp {product.harga_produk.toLocaleString()}
          </p>
          <p className="text-gray-700 mb-4">{product.deskripsi_produk}</p>
          <Separator className="my-2" />
          <div className="md:grid md:grid-cols-2 flex flex-col w-full">
            <p className="text-gray-600 font-semibold col-span-2 mb-2">
              Detail
            </p>
            <p className="text-gray-600 mb-2">Stok: {product.stok_produk}</p>
            <p className="text-gray-600 mb-2">
              Status: {product.status_produk}
            </p>
            <div className=" flex text-gray-600 gap-x-2 mb-2">
              <p>Category</p>{' '}
              <Badge variant={'outline'}>
                {product.nama_kategori.toUpperCase()}
              </Badge>
            </div>
            <div className=" flex text-gray-600 gap-x-2 mb-2">
              <p>Rating</p>{' '}
              <Badge variant={'outline'} className="flex">
                <StarIcon size={12} />
                <p className="ml-1">4.8</p>
              </Badge>
            </div>
          </div>
          <div
            className="flex items-center mt-4 p-2 hover:cursor-pointer rounded-lg bg-slate-50 hover:bg-slate-100 "
            onClick={() => router.push(`/catalogue/${product.id_toko}`)}
          >
            <Image
              width={48}
              height={48}
              src={`${STORE_IMAGES}/${product.foto_profil}`}
              alt={product.nama_toko}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{product.nama_toko}</h3>
              <p className="text-gray-600">{product.alamat_toko}</p>
            </div>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="w-full my-3">Tambahkan ke Keranjang</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Tambahkan Pesanan Ke Keranjang Anda</DrawerTitle>
                  <DrawerDescription>
                    Isi Jumlah Pesanan terlebih dahulu
                  </DrawerDescription>
                </DrawerHeader>
                <div className="counter-container w-full mt-4 p-4 flex">
                  <div className="w-full quantity-container">
                    <Label>Total Pesanan</Label>
                    <div className="pesanan-button-container flex gap-x-2">
                      <Button
                        onClick={() => {
                          const newQuantity = quantity + 1;
                          if (product) {
                            if (product.stok_produk < newQuantity) {
                              toast({
                                variant: 'destructive',
                                description:
                                  'Total pesanan tidak boleh lebih dari stok',
                              });
                            } else {
                              setQuantity(newQuantity);
                              const sum = newQuantity * product.harga_produk;
                              setPrice(sum);
                            }
                          }
                        }}
                        disabled={!product}
                        size={'icon-sm'}
                        variant={'outline'}
                      >
                        <PlusIcon size={16} />
                      </Button>
                      <Input
                        className="w-16 h-6"
                        type="number"
                        value={quantity}
                        disabled
                      ></Input>
                      <Button
                        onClick={() => {
                          const newQuantity = quantity - 1;
                          if (product) {
                            if (0 >= newQuantity) {
                              toast({
                                variant: 'destructive',
                                description:
                                  'Total pesanan tidak boleh kurang dari 0',
                              });
                            } else {
                              setQuantity(newQuantity);
                              const sum = newQuantity * product.harga_produk;
                              setPrice(sum);
                            }
                          }
                        }}
                        disabled={!product}
                        size={'icon-sm'}
                        variant={'outline'}
                      >
                        <MinusIcon size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="w-full price-container">
                    <Label>Total Harga</Label>
                    <p className="text-2xl font-bold">
                      {rupiahFormatter(price)}
                    </p>
                  </div>
                </div>
                <div className="px-4">
                  <div className="flex pb-2">
                    <NotebookPen size={16} />
                    <p className="text-xs ml-1 font-semibold">Catatan</p>
                  </div>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="resize-none"
                  />
                </div>

                <DrawerFooter>
                  <Button onClick={orderButton}>Tambah keranjang</Button>
                  <DrawerClose asChild>
                    <Button ref={cancelButtonRef} variant="outline">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -500 }}
                exit={{ opacity: 0, y: -1000 }}
                transition={{ duration: 0.7 }}
                className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-20 z-[100] h-20 bg-primary rounded-full flex items-center justify-center"
              >
                <ShoppingCart size={36} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          {isFetchLikeLoading ? (
            <Button disabled variant={'outline'} className="w-full">
              Loading
            </Button>
          ) : liked ? (
            <Button
              onClick={handleDeleteFromWishlist}
              variant={'outline'}
              className="w-full"
            >
              <HeartOff className="mr-2" size={24} />
              <p>Hapus dari Wishlist</p>
            </Button>
          ) : (
            <Button
              onClick={handleAddToWishlist}
              variant={'outline'}
              className="w-full"
            >
              <Heart className="mr-2" size={24} />
              <p>Tambahkan ke Wishlist</p>
            </Button>
          )}
        </div>
      </div>
      <CommentsList comments={comments} />
    </>
  );
};

export default Page;
