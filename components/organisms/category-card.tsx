import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCard {
  type: string;
}

function formatString(input: string) {
  // Memisahkan string berdasarkan tanda hubung
  const words = input.split('-');

  // Mengubah huruf pertama setiap kata menjadi huruf besar
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Menggabungkan kembali kata-kata dengan spasi
  return capitalizedWords.join(' ');
}

const CategoryCard: React.FC<CategoryCard> = ({ type }) => {
  return (
    <>
      <Link
        href={`/catalogues?category=${type}`}
        className="cursor-pointer p-2 hover:bg-gray-100 md:hidden rounded-md text-center w-fit h-fit flex flex-col items-center justify-center"
      >
        <div className="category-card  h-fit w-fit flex border border-gray-100 p-2 shadow-sm rounded-md">
          {type === 'lain-lain' ? (
            <MoreVertical size={24} color="#372947" />
          ) : (
            <Image
              className="mr-1"
              width={24}
              height={24}
              src={`/images/${type}.svg`}
              alt={type}
            />
          )}
        </div>
        <p className="text-gray-400 mt-2 text-xs">{formatString(type)}</p>
      </Link>

      <Link
        href={`/catalogues?category=${type}`}
        className="category-card cursor-pointer hidden sm:hidden md:flex hover:bg-gray-100/50 border border-gray-100 p-2 shadow-sm rounded-md"
      >
        {type === 'lain-lain' ? (
          ''
        ) : (
          <Image
            className="mr-1"
            width={24}
            height={24}
            src={`/images/${type}.svg`}
            alt={type}
          />
        )}
        <p className="text-gray-400">{formatString(type)}</p>
      </Link>
    </>
  );
};

export default CategoryCard;
