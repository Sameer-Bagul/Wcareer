import React from 'react';
import { Navigation } from './Navigation';

export const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1 ml-16 p-8">
        {children}
      </main>
    </div>
  );
};