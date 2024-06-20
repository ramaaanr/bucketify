import Image from 'next/image';

export default function BannerItem() {
  return (
    <div className="max-w-[1000px] mx-auto w-full">
      <div className="aspect-w-4 aspect-h-1 bg-gray-400">
        <Image
          className="rounded-lg"
          src={`/images/banner/banner-1.png`}
          alt="Logo"
          fill
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
  );
}
