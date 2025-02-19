import { useState } from 'react';
import SearchBar from '../../components/CPAPS/SearchBar';
import ThreadList from '../../components/CPAPS/ThreadList';
import Sidebar from '../../components/CPAPS/Sidebar';
import CreateThread from '../../components/CPAPS/CreateThread';
import { FiPlusCircle, FiMessageSquare, FiX } from 'react-icons/fi';
import ChatResponder from '../../components/CPAPS/ChatResponder';

// Mock data with comments
const mockThreads = [
  {
    id: 1,
    title: "Best practices for React Performance",
    content: "What are your go-to techniques for optimizing React applications?",
    author: {
      name: "Sameer Bagul",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    tags: ["React", "Performance", "JavaScript"],
    votes: 42,
    likes: 23,
    comments: [
      {
        id: 1,
        content: "Memoization is key for preventing unnecessary re-renders!",
        author: {
          name: "Babu raw",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        },
        createdAt: "2024-02-21T08:30:00Z"
      }
    ],
    createdAt: "2024-02-20T10:00:00Z"
  },
  {
    id: 2,
    title: "Learning Path: From Junior to Senior Developer",
    content: "Let's discuss the essential skills and experiences needed to progress in your development career.",
    author: {
      name: "Sakshi Jadhav",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    tags: ["Career", "Development", "Learning"],
    votes: 38,
    likes: 19,
    comments: [],
    createdAt: "2024-02-19T15:30:00Z"
  }
];

const topThreads = [
  {
    id: 1,
    title: "Understanding React Server Components",
    likes: 156,
    comments: 45
  },
  {
    id: 2,
    title: "The Future of Web Development",
    likes: 132,
    comments: 38
  }
];

function CommunityPage() {
  const [threads, setThreads] = useState(mockThreads);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSearch = (query) => {
    const filteredThreads = mockThreads.filter(thread => 
      thread.title.toLowerCase().includes(query.toLowerCase()) ||
      thread.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setThreads(filteredThreads);
  };

  const handleCreateThread = (newThread) => {
    const thread = {
      id: threads.length + 1,
      ...newThread,
      author: {
        name: "Current User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
      },
      votes: 0,
      likes: 0,
      comments: []
    };
    setThreads([thread, ...threads]);
  };

  const handleAddComment = (threadId, content) => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          comments: [
            ...thread.comments,
            {
              id: thread.comments.length + 1,
              content,
              author: {
                name: "Current User",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
              },
              createdAt: new Date().toISOString()
            }
          ]
        };
      }
      return thread;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Discussions</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <FiPlusCircle />
            New Thread
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <ThreadList
              threads={threads}
              onAddComment={(threadId, content) => handleAddComment(threadId, content)}
            />
          </div>
          
          <aside className="lg:w-80">
            <Sidebar topThreads={topThreads} />
          </aside>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateThread
          onCreateThread={handleCreateThread}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {/* Floating Chatbox */}
      <button
        className="fixed bottom-4 right-4 bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-500 transition-colors"
        onClick={() => setIsChatOpen(true)}
      >
        <FiMessageSquare size={24} />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-8 w-100 h-106 bg-white shadow-lg rounded-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-gray-600 text-white p-3 rounded-t-lg">
            <span className="font-semibold">Chat Support</span>
            <button onClick={() => setIsChatOpen(false)}>
              <FiX size={20} />
            </button>
          </div>
          {/* ChatResponder */}
          <ChatResponder />
        </div>
      )}
    </div>
  );
}

export default CommunityPage;
