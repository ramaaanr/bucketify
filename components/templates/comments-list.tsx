import React from 'react';
import CommentItem from '../organisms/comment-item';

interface Comment {
  name: string;
  date: string;
  text: string;
  rating: number;
}

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="max-w-screen-lg md:px-24 mx-auto p-4 bg-gray-white col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          name={comment.name}
          date={comment.date}
          text={comment.text}
          rating={comment.rating}
        />
      ))}
    </div>
  );
};

export default CommentsList;
