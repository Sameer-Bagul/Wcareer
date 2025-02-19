import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout as LayoutIcon, Video, PieChart, Plus } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed left-0 top-0 h-full w-16 bg-gray-900 flex flex-col items-center py-8 space-y-8">
      <Link to="/dashboard" className="text-white">
        <LayoutIcon className={`w-6 h-6 ${isActive('/dashboard') ? 'text-blue-400' : 'text-gray-400'}`} />
      </Link>
      <Link to="/create-interview" className="text-white">
        <Plus className={`w-6 h-6 ${isActive('/create-interview') ? 'text-blue-400' : 'text-gray-400'}`} />
      </Link>
      <Link to="/interview" className="text-white">
        <Video className={`w-6 h-6 ${isActive('/interview') ? 'text-blue-400' : 'text-gray-400'}`} />
      </Link>
      <Link to="/feedback" className="text-white">
        <PieChart className={`w-6 h-6 ${isActive('/feedback') ? 'text-blue-400' : 'text-gray-400'}`} />
      </Link>
    </nav>
  );
};