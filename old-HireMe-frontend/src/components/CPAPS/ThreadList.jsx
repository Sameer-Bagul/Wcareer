import PropTypes from 'prop-types';
import Thread from './Thread';

function ThreadList({ threads, onAddComment }) {
  return (
    <div className="space-y-4">
      {threads.map(thread => (
        <Thread
          key={thread.id}
          thread={thread}
          onAddComment={(content) => onAddComment(thread.id, content)}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // Add other thread properties here if needed
  })).isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default ThreadList;