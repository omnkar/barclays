import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/termsheets', icon: '📑', label: 'Term Sheets' },
    { path: '/validationrules', icon: '⚙️', label: 'Validation Rules' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
    { path: '/compliance', icon: '🔒', label: 'Compliance' },
    { path: '/usermanagement', icon: '👥', label: 'User Management' },
    { path: '/settings', icon: '🛠️', label: 'Settings' }
  ];

  return (
    <div className={`sidebar bg-gray-900 text-white min-h-screen p-4 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed && <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">TermSheet AI</h2>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-gray-400 hover:text-white p-1 rounded-full"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <div className="nav-menu flex flex-col gap-2">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`nav-item flex items-center rounded-lg transition-all duration-200 hover:bg-gray-800 ${
              location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-300'
            } ${
              isCollapsed ? 'justify-center p-3' : 'p-3'
            }`}
          >
            <span className={`text-xl ${isCollapsed ? 'mx-0' : 'mr-3'}`}>{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
      
      {!isCollapsed && (
        <div className="mt-auto pt-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Need help?</p>
            <Link to="/support" className="text-blue-400 hover:text-blue-300 text-sm">Contact support</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;