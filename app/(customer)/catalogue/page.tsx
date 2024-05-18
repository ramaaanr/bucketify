import ProductCard from '@/components/product-card';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import ProductCardProps from '@/props/ProductCardProps';
async function getData() {
  console.log();
  const res = await fetch(`${process.env.API_URL}/katalogs`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
const Page = async () => {
  const data = await getData();
  console.log(data);
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Katalog Produk</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ul className="grid grid-cols-5 gap-y-4 p-4">
        {data.data.map((product: ProductCardProps) => (
          <ProductCard
            foto_produk={product.foto_produk}
            key={product.kode_produk}
            nama_produk={product.nama_produk}
            harga_produk={product.harga_produk}
            kode_produk={product.kode_produk}
            nama_toko={product.nama_toko}
            status_produk={product.status_produk}
          />
        ))}
      </ul>
    </>
  );
};
export default Page;
