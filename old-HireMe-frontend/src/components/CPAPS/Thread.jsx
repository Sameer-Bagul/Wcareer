import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiThumbsUp, FiThumbsDown, FiMessageSquare, FiHeart } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Comments from './Comments';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function Thread({ thread, onAddComment }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userVote, setUserVote] = useLocalStorage(`vote-${thread.id}`, null);
  const [votes, setVotes] = useState(thread.votes);
  const [likes, setLikes] = useState(thread.likes);
  const [isLiked, setIsLiked] = useLocalStorage(`like-${thread.id}`, false);

  const handleVote = (type) => {
    if (userVote === type) return; // Already voted this way

    setVotes(prev => {
      if (userVote) {
        // Removing previous vote first
        prev = prev + (userVote === 'up' ? -1 : 1);
      }
      return prev + (type === 'up' ? 1 : -1);
    });
    setUserVote(type);
  };

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{thread.title}</h3>
          <div className="flex items-center mt-2 space-x-2">
            <img src={thread.author.avatar} alt="" className="w-6 h-6 rounded-full" />
            <span className="text-sm text-gray-600">{thread.author.name}</span>
            <span className="text-sm text-gray-400">
              {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
      
      <p className="mt-3 text-gray-700">{thread.content}</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {thread.tags.map(tag => (
          <span key={tag} className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center mt-4 space-x-6">
        <button
          onClick={() => handleVote('up')}
          className={`flex items-center space-x-1 ${
            userVote === 'up' ? 'text-primary-500' : 'text-gray-600 hover:text-primary-500'
          }`}
          disabled={userVote === 'up'}
        >
          <FiThumbsUp />
          <span>{votes}</span>
        </button>
        <button
          onClick={() => handleVote('down')}
          className={`flex items-center space-x-1 ${
            userVote === 'down' ? 'text-primary-500' : 'text-gray-600 hover:text-primary-500'
          }`}
          disabled={userVote === 'down'}
        >
          <FiThumbsDown />
        </button>
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            isLiked ? 'text-red-500' : 'text-gray-600'
          } hover:text-red-500`}
        >
          <FiHeart />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-gray-600 hover:text-primary-500"
        >
          <FiMessageSquare />
          <span>{thread.comments?.length || 0}</span>
        </button>
      </div>

      {isExpanded && (
        <Comments
          comments={thread.comments}
          onAddComment={onAddComment}
        />
      )}
    </div>
  );
}

Thread.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    votes: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default Thread;
