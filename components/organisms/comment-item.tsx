'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { dateFormatter } from '@/utils/stringFormatter';

interface CommentItemProps {
  username: string;
  created_at: string;
  text: string;
  rating: number;
  id_pembeli: string;
}
const CommentItem: React.FC<CommentItemProps> = ({
  username,
  created_at,
  text,
  rating,
  id_pembeli,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`/api/get-user-image/${id_pembeli}`);
        if (res.ok) {
          const data = await res.json();
          setImageUrl(data.imageUrl);
        } else {
          throw new Error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        setError(true);
      }
    };

    fetchImage();
  }, []);

  const initials = username
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="flex items-start p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full text-lg font-bold mr-4 overflow-hidden">
        {imageUrl && !error ? (
          <Image
            src={imageUrl}
            alt={`${username}'s avatar`}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div>
        <h3 className="text-lg md:text- font-semibold">{username}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {dateFormatter(created_at)}
        </p>
        <p className="text-gray-800 mb-2">{text}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.356 4.184h4.392c.969 0 1.371 1.24.588 1.81l-3.557 2.612 1.356 4.184c.3.921-.755 1.688-1.54 1.118L10 13.011l-3.557 2.614c-.784.57-1.84-.197-1.54-1.118l1.356-4.184-3.557-2.612c-.783-.57-.381-1.81.588-1.81h4.392l1.356-4.184z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
