import Image from 'next/image';

const UnderConstructionWarning = () => {
  return (
    <div className="warning-container w-full h-screen flex flex-col flex-wrap justify-center content-center">
      <Image
        width={600}
        height={400}
        className="flex justify-center"
        src={'/images/page-under-construction.svg'}
        alt="page is underconstruction"
      />
      <h1 className="text-primary font-semibold text-3xl mt-4">
        Halaman masih dalam pengembangan
      </h1>
    </div>
  );
};

export default UnderConstructionWarning;
