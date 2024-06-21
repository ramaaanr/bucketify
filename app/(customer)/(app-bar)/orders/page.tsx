'use client';
import { MoonLoader } from 'react-spinners';
import React, { useState, useEffect } from 'react';
import Order from '@/props/Order';
import OrderCard from '@/components/order-card';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
const Page = () => {
  const [data, setData] = useState<Order[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const fetchData = async () => {
    const response = await fetch('/api/orders');
    const res = await response.json();
    if (response.ok) {
      const { data } = res;
      setData(data);
      setLoading(false);
    } else {
      setError(true);
    }
  };
  const fetchDataByStatus = async (status: string) => {
    setLoading(true);
    const response = await fetch(`/api/orders?status=${status}`);
    const res = await response.json();
    if (response.ok) {
      const { data } = res;
      setData(data);
      setLoading(false);
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filterStatusOnChange = async (value: any) => {
    setSelectedStatus(value);
    await fetchDataByStatus(value);
  };

  if (error) {
    throw new Error('Halaman Order Bermasalah');
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/orders">Pesanan Anda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="order-container pb-8 pt-4 pr-20 gap-x-4 flex">
        <Card className="h-fit w-52">
          <CardHeader>
            <h2 className="text-sm">Filter Pesanan</h2>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="filter-container">
              <p className="font-semibold text-sm mb-2">Status</p>
              <Select
                onValueChange={filterStatusOnChange}
                value={selectedStatus}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Semuanya">semuanya</SelectItem>
                    <SelectItem value="CANCELED">gagal</SelectItem>
                    <SelectItem value="PENDING">belum bayar</SelectItem>
                    <SelectItem value="ON_PROGRESS">diproses</SelectItem>
                    <SelectItem value="READY">Siap Diambil</SelectItem>
                    <SelectItem value="COMPLETED">selesai</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <div className="order-card-container w-full mx-auto space-y-4">
          {!loading ? (
            data ? (
              data.map((order) => (
                <OrderCard key={order.id_order} data={order} />
              ))
            ) : (
              ''
            )
          ) : (
            <MoonLoader className="mx-auto mt-16" color="#fc5c64" />
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
