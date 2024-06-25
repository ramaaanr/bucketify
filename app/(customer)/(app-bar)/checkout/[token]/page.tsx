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
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Params {
  token: string;
}

export default function Page({ params }: { params: Params }) {
  const { snapEmbed } = useSnap();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params.token) {
      console.log('Token:', params.token);
      snapEmbed(params.token, 'snap-container', {
        onSuccess: (result: any) => {
          console.log('Success:', result);
          // navigate(`/order-status?transaction_id=${response.data.id}`);
          // setSnapShow(false);
        },
        onPending: (result: any) => {
          console.log('Pending:', result);
          // navigate(`/order-status?transaction_id=${response.data.id}`);
          // setSnapShow(false);
        },
        onClose: () => {
          console.log('Snap closed');
          // navigate(`/order-status?transaction_id=${response.data.id}`);
          // setSnapShow(false);
        },
      });
      setLoading(false);
    }
  }, [params.token, snapEmbed]);

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
      <div className="checkout-container w-full pr-16">
        <div className="w-full" id="snap-container"></div>
      </div>
    </>
  );
}
