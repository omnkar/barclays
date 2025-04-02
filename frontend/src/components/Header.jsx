import React from 'react';
import { Bell, Settings, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">TermSheet Validation</h1>
          <div className="ml-8 hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none text-sm w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Bell size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Settings size={20} />
          </button>
          <div className="flex items-center ml-4">
            <span className="text-sm font-medium mr-2 hidden md:inline">Welcome, Admin</span>
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;