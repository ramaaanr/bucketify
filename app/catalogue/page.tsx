import Navbar from '@/components/customer-nav-bar';
import ProductCard from '@/components/product-card';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import ProductCardProps from '@/props/ProductCardProps';
const products: ProductCardProps[] = [
  {
    name: 'Buket Boneka Teddy Bear Wisuda - S',
    store: 'Toko Buket Kreatif',
    price: 75000,
    productCode: 'BBTW-S001',
    imageUrl: '/images/bb-1.jpeg',
  },
  {
    name: 'Buket Bunga Mawar Merah',
    store: 'Toko Mawar Indah',
    price: 50000,
    productCode: 'BBMM-002',
    imageUrl: '/images/buket-boneka.jpeg',
  },
  {
    name: 'Buket Coklat Ferrero Rocher',
    store: 'Toko Manis Sejati',
    price: 120000,
    productCode: 'BCFR-003',
    imageUrl: '/images/bb-3.jpeg',
  },
  {
    name: 'Buket Bunga Tulip Putih',
    store: 'Toko Bunga Elegan',
    price: 85000,
    productCode: 'BBTP-004',
    imageUrl: '/images/buket-balon.jpeg',
  },
  {
    name: 'Buket Buah Segar',
    store: 'Toko Segar Alami',
    price: 90000,
    productCode: 'BBS-005',
    imageUrl: '/images/buket-snack.jpeg',
  },
  {
    name: 'Buket Bunga Lily Kuning',
    store: 'Toko Bunga Cantik',
    price: 70000,
    productCode: 'BBLK-006',
    imageUrl: '/images/buket-snack.jpeg',
  },
  {
    name: 'Buket Bunga Anggrek Ungu',
    store: 'Toko Bunga Indah',
    price: 95000,
    productCode: 'BBAU-007',
    imageUrl: '/images/bb-4.jpeg',
  },
  {
    name: 'Buket Snack Kekinian',
    store: 'Toko Cemilan Lezat',
    price: 110000,
    productCode: 'BSK-008',
    imageUrl: '/images/buket-boneka.jpeg',
  },
  {
    name: 'Buket Bunga Matahari',
    store: 'Toko Bunga Ceria',
    price: 65000,
    productCode: 'BBM-009',
    imageUrl: '/images/buket-bunga.jpeg',
  },
  {
    name: 'Buket Bunga Campur',
    store: 'Toko Bunga Harmoni',
    price: 80000,
    productCode: 'BBC-010',
    imageUrl: '/images/bb-2.jpeg',
  },
];
const Page = () => {
  return (
    <>
      <Navbar />
      <div className="catalogue-container pl-6 lg:pl-24 mt-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Katalog Produk</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ul className="grid grid-cols-5 gap-y-4 p-4">
          {products.map((product) => (
            <ProductCard
              imageUrl={product.imageUrl}
              key={product.productCode}
              name={product.name}
              price={product.price}
              productCode={product.productCode}
              store={product.store}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
export default Page;
