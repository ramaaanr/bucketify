import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const PartnerSection = () => {
  return (
    <div className="partner-section flex h-screen">
      <div
        className="partner-example-container w-full h-full bg-cover"
        style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}
      >
        <div className="opacity-layer bg-pink-200 bg-opacity-50 h-full w-full flex flex-wrap justify-center content-center">
          <div className="content flex">
            <Avatar className="h-40 w-40">
              <AvatarImage src="/images/partner-example-avatar.png" />
            </Avatar>
            <div className="partner-detail-container flex flex-col ml-4 justify-center content-center">
              <h4 className="text-6xl text-white font-semibold">@hello.als</h4>
              <p className="text-2xl text-white font-semibold">
                Banjarbaru, Dahlina Raya
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-8 partner-invitation-container w-full h-full bg-secondary flex flex-col flex-wrap content-center justify-center">
        <h2 className="text-7xl mb-4 font-bold text-primary">
          Membantu Pelaku <span className="text-white">UMKM</span> dalam usaha
          buket kreativ
        </h2>
        <div className="button-container pl-4">
          <Button variant={'outline'}>Bergabung Dengan Kami 👋</Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
