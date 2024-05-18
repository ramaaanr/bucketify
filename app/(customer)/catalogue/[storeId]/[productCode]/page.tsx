'use client';

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
import Image from 'next/image';
import Link from 'next/link';

const dataDummy = {
  name: 'Buket Bunga Campur',
  store: 'Toko Bunga Harmoni',
  price: 80000,
  productCode: 'BBC-010',
  imageUrl: '/images/bb-2.jpeg',
  description:
    'Buket bunga campur yang indah ini terdiri dari berbagai jenis bunga segar yang dirangkai dengan penuh cinta untuk memberikan keindahan dan kebahagiaan kepada penerimanya.',
};

const Page = ({
  params,
}: {
  params: { storeId: string; productCode: string };
}) => {
  const { storeId, productCode } = params;
  const { name, store, price, imageUrl, description } = dataDummy;
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
                {storeId}
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{productCode}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="detail-container px-24 py-4 flex ">
        <div className="image-container relative w-[345px] h-[460px]">
          <Image
            className="rounded-lg"
            src={imageUrl}
            alt="Logo"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="text-container flex flex-col gap-y-2 w-[500px] px-8">
          <div className="header-container">
            <Badge>Pre-Order 3 Hari</Badge>
            <h1 className="text-4xl font-semibold">{name}</h1>
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
              <p className="font-medium text-sm">{store}</p>
              <p className="text-gray-500 text-sm">Alamat</p>
            </div>
          </div>
          <p className="text-4xl font-bold">{rupiahFormatter(price)}</p>
          <Button>Buat Pesanan</Button>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Page;
