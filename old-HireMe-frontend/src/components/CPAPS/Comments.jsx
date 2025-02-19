import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FiMessageSquare } from 'react-icons/fi';
import PropTypes from 'prop-types';

function Comments({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('');

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
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
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

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  onAddComment: PropTypes.func.isRequired,
};

export default Comments;