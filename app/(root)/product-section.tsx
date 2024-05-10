import PreviewCard from '@/components/preview-card';
import { Button } from '@/components/ui/button';

const ProductSection = () => {
  return (
    <div className="product-section px-20 h-screen bg-tertiary flex-col content-center">
      <div className="my-8 header-container flex justify-end">
        <h2 className="text-7xl text-primary font-bold">Produk Kami</h2>
      </div>
      <div className="my-8 preview-card-container w-full">
        <ul className="card-list flex w-full justify-evenly">
          <li className="card-item">
            <PreviewCard
              label={'Buket Boneka'}
              href={'/images/buket-boneka.jpeg'}
            />
          </li>
          <li className="card-item">
            <PreviewCard
              label={'Buket Balon'}
              href={'/images/buket-balon.jpeg'}
            />
          </li>
          <li className="card-item">
            <PreviewCard
              label={'Buket Uang'}
              href={'/images/buket-uang.jpeg'}
            />
          </li>
          <li className="card-item">
            <PreviewCard
              label={'Buket Bunga'}
              href={'/images/buket-bunga.jpeg'}
            />
          </li>
        </ul>
      </div>
      <div className="my-8 button-container w-full flex justify-center">
        <Button variant={'secondary'} size={'lg'} className="text-lg">
          Lihat Lebih Banyak Produk Kami...
        </Button>
      </div>
    </div>
  );
};

export default ProductSection;
