
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                P
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Product Photo AI Studio</h1>
                <p className="text-gray-500">Generate professional e-commerce imagery in seconds.</p>
            </div>
        </div>
      </div>
    </header>
  );
};
