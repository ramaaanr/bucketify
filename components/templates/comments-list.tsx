import React from 'react';
import CommentItem from '../organisms/comment-item';

interface Comment {
  username: string;
  created_at: string;
  text: string;
  rating: number;
  id_pembeli: string;
}

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="max-w-screen-lg md:px-24 mx-auto p-4 bg-gray-white col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentItem
            id_pembeli={comment.id_pembeli}
            key={index}
            username={comment.username}
            created_at={comment.created_at}
            text={comment.text}
            rating={comment.rating}
          />
        ))
      ) : (
        <div>Belum Ada Ulasan</div>
      )}
    </div>
  );
};

export default CommentsList;
