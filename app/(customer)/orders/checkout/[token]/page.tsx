'use client';

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
      <div className="checkout-container mt-4 w-full pr-16">
        <div className="w-full" id="snap-container"></div>
      </div>
    </>
  );
}
