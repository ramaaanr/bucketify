'use client';

import TopBar from '@/components/templates/top-bar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import useSnap from '@/hooks/useSnap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Params {
  token: string;
}

export default function Page({ params }: { params: Params }) {
  const router = useRouter();
  const { snapEmbed } = useSnap();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params.token) {
      snapEmbed(params.token, 'snap-container', {
        onSuccess: (result: any) => {
          console.log(result);
          router.push('/orders');
          // setSnapShow(false);
        },
        onPending: (result: any) => {
          console.log(result);
          router.push('/orders');
          // navigate(`/order-status?transaction_id=${response.data.id}`);
          // setSnapShow(false);
        },
        onClose: () => {
          console.log('Snap closed');
          router.push('/orders');
          // navigate(`/order-status?transaction_id=${response.data.id}`);

          // setSnapShow(false);
        },
      });
      setLoading(false);
    }
  }, [params.token, router, snapEmbed]);

  return (
    <>
      <TopBar />
      <div className="py-4 px-8 sm:px-16 md:px-28 lg:px-32">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/orders">Pesanan Anda</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pembayaran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="checkout-container mt-6 w-full min-h-screen">
        <div className="mx-auto w-full max-w-4xl" id="snap-container"></div>
      </div>
    </>
  );
}
