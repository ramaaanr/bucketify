import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { FaStar } from 'react-icons/fa';
import { toast } from 'sonner';
import { HEADERS } from '@/config/kadobu-api';
import { useRouter } from 'next/navigation';

interface CommentDialogProps {
  cartId: number;
  commentId?: number;
  onCommentSubmitted: (id_komen: string) => void;
}

export default function CommentDialog({
  cartId,
  commentId,
  onCommentSubmitted,
}: CommentDialogProps) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          idKeranjang: cartId,
          text: text,
          rating: rating,
        }),
        headers: HEADERS,
      });

      if (response.ok) {
        toast.success('Berhasil memberikan ulasan!');
        // Reset form fields after successful submission
        setText('');
        setRating(0);
        const { data } = await response.json();
        onCommentSubmitted(data.id_komen);
      } else {
        toast.error('Gagal memberikan Ulasan');
      }
    } catch (error) {
      toast.error('An error occurred while submitting the comment');
    }
  };

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Berikan Ulasan</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Ulasan</AlertDialogTitle>
          <AlertDialogDescription>
            Berikan ulasan untuk produk berikut
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-4">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                id="text"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    onClick={() => handleRating(star)}
                    className={`cursor-pointer ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
