import CategoryCard from '../organisms/category-card';
const kategori = [
  'balon',
  'uang',
  'boneka',
  'bunga',
  'foto',
  'snack',
  'lainnya',
];

export default function CategoryContainer() {
  return (
    <div className="w-fit mb-4 px-8 sm:px-16 md:px-28 lg:px-32 ">
      <h2 className="text-gray-500 text-xs mb-2">Pilih Kategori</h2>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-2 lg:flex w-fit">
        {kategori.map((item, index) => (
          <CategoryCard key={index} type={item} />
        ))}
      </div>
    </div>
  );
}
