import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function Sidebar({ topThreads = [] }) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'fixed top-1/2 -translate-y-1/2 z-40 lg:hidden',
          'bg-black text-white p-3 rounded-l-lg shadow-lg',
          'transition-all duration-300 ease-in-out',
          isOpen ? 'right-[320px]' : 'right-0'
        )}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
      </button>

      {/* Overlay for closing sidebar on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Content */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-80 lg:w-auto lg:static',
          'bg-white z-40 lg:z-auto',
          'transition-transform duration-300 ease-in-out lg:transform-none',
          'p-4 border-l border-gray-200 lg:border-none',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="lg:sticky lg:top-8">
          <h2 className="text-lg font-semibold mb-4">Popular Threads</h2>

          {/* Topics */}
          <div className="space-y-2 mb-6">
            <button
              onClick={() => setSelectedTopic('all')}
              className={clsx(
                'w-full text-left px-3 py-2 rounded-md transition-colors',
                selectedTopic === 'all' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
              )}
            >
              All Topics
            </button>
            {['Development', 'Design', 'Marketing'].map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={clsx(
                  'w-full text-left px-3 py-2 rounded-md transition-colors',
                  selectedTopic === topic ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                )}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Threads */}
          <div className="space-y-4">
            {topThreads.map((thread) => (
              <div
                key={thread.id}
                className="p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
              >
                <h3 className="font-medium text-gray-900">{thread.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>{thread.likes} likes</span>
                  <span className="mx-2">•</span>
                  <span>{thread.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  topThreads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
    })
  ),
};

export default Sidebar;
