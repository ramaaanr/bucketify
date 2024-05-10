import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';
import { DM_Serif_Display as DSD } from 'next/font/google';

const dsd = DSD({
  weight: ['400'],
  subsets: ['latin'],
});

interface PreviewCardProps {
  label: string;
  href: string;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ label, href }) => {
  return (
    <Card
      className="relative overflow-hidden bg-cover w-72 h-72 flex flex-col justify-end"
      style={{ backgroundImage: `url(${href})` }}
    >
      <CardContent
        className={`${dsd.className} relative z-2 text-4xl font-bold text-white`}
      >
        {label}
      </CardContent>
    </Card>
  );
};

export default PreviewCard;
