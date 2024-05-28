import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { rupiahFormatter } from '@/utils/stringFormatter';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

async function getKatalog(kode_produk: string) {
  console.log();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/katalogs/${kode_produk}`,
    {
      cache: 'no-cache',
    },
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Page = async ({
  params,
}: {
  params: { storeId: string; productCode: string };
}) => {
  const { storeId, productCode } = params;
  const katalog = await getKatalog(productCode);
  console.log(katalog);
  const {
    nama_produk,
    harga_produk,
    nama_toko,
    id_toko,
    alamat_toko,
    kode_produk,
    foto_produk,
    status_produk,
    deskripsi_produk,
  } = katalog.result;
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
            <BreadcrumbPage>
              <Link
                className="text-gray-400 hover:text-gray-500 cursor-pointer"
                href="/"
              >
                {nama_toko}
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Buket Bunga</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="detail-container px-24 py-4 flex ">
        <div className="image-container relative w-[345px] h-[460px]">
          <Image
            className="rounded-lg"
            src={`${process.env.NEXT_PUBLIC_API_URL}/product_images/${foto_produk}`}
            alt="Logo"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="text-container flex flex-col gap-y-2 w-[500px] px-8">
          <div className="header-container">
            <Badge
              variant={
                _.includes(status_produk, 'Ready') ? 'highlight' : 'default'
              }
            >
              {status_produk}
            </Badge>
            <h1 className="text-4xl font-semibold">{nama_produk}</h1>
          </div>
          <div className="store-container flex flex-wrap items-center  gap-x-2 px-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/images/partner-example-avatar.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="store-detail-container">
              <p className="font-medium text-sm">{nama_toko}</p>
              <p className="text-gray-500 text-sm">{alamat_toko}</p>
            </div>
          </div>
          <p className="text-4xl font-bold">{rupiahFormatter(harga_produk)}</p>
          <Button>Buat Pesanan</Button>
          <p className="text-gray-600 text-sm">{deskripsi_produk}</p>
        </div>
      </div>
    </>
  );
};

export default Page;
