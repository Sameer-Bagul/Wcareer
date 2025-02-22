import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FiMessageSquare } from 'react-icons/fi';

export default function Comments({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('');
  console.log(comments); 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <FiMessageSquare />
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff8643] focus:ring-[#ff8643]"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#ff8643] text-white rounded-md hover:bg-[#f59e00]"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4 mt-6">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={comment.author.avatar}
                alt=""
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium text-gray-900">{comment.author.name}</span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
