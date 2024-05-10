import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const abouts = [
  {
    title: 'Selamat Datang di Kadobu',
    content:
      'Kadobu lahir dari hasrat kami untuk memberdayakan pelaku UMKM dalam industri kreatif, khususnya para pengusaha buket. Kami percaya bahwa setiap karya memiliki cerita, dan setiap pengusaha berbakat layak untuk diperhatikan.',
  },
  {
    title: 'Mengapa Kadobu?',
    content:
      'Kami memahami bahwa mengelola bisnis buket kreatif tidak selalu mudah. Dari mencari bahan baku berkualitas hingga menjangkau pasar yang tepat, setiap langkah memiliki tantangan sendiri. Di Kadobu, kami berkomitmen untuk membantu Anda melewati setiap tahap perjalanan bisnis Anda dengan dukungan teknologi terkini.',
  },
  {
    title: 'Apa yang Kami Tawarkan?',
    content:
      'Dengan Kadobu, Anda tidak hanya mendapatkan platform jual beli yang andal, tetapi juga alat pengelolaan usaha yang lengkap. Dari manajemen inventaris hingga pelacakan pesanan, kami menyediakan solusi yang intuitif dan efisien agar Anda dapat fokus pada apa yang Anda cintai: menciptakan buket indah untuk pelanggan Anda.',
  },
];

const AboutSection = () => {
  return (
    <div className="about-section h-screen flex flex-wrap justify-center content-center px-20">
      <Carousel className="w-full ">
        <CarouselContent>
          {abouts.map((about, index) => (
            <CarouselItem key={index}>
              <div className="about-card" key={index}>
                <h2 className="mb-2 text-primary font-semibold text-5xl text-center">
                  {about.title}
                </h2>
                <p className="text-primary font-semibold text-2xl text-center">
                  {about.content}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default AboutSection;
