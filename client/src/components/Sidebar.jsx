import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FilePlus2,
  History,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Overview', to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Validate Idea', to: '/dashboard/submit', icon: <FilePlus2 className="w-5 h-5" /> },
    { name: 'History', to: '/dashboard/history', icon: <History className="w-5 h-5" /> },
    { name: 'Profile', to: '/dashboard/profile', icon: <User className="w-5 h-5" /> },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80 transition-all duration-300">
      {/* Branding Header */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 h-16 border-b border-slate-50 dark:border-slate-800/50`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm text-slate-950 dark:text-white">
              S-Validator
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="p-1.5 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Collapse Button (Desktop only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 rounded-lg transition-colors border border-slate-100 dark:border-slate-700"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3.5 px-4'} py-3 rounded-xl font-semibold text-sm transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20'
                }`
              }
              title={isCollapsed ? item.name : ''}
            >
              <div className={`${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'}`}>
                {item.icon}
              </div>
              {!isCollapsed && <span>{item.name}</span>}

              {/* Hover Tooltip when Collapsed */}
              {isCollapsed && (
                <div className="absolute left-16 scale-0 bg-slate-950 text-white text-xs px-2.5 py-1.5 rounded-lg group-hover:scale-100 transition-all font-medium pointer-events-none z-55 whitespace-nowrap shadow-md">
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      {user && (
        <div className="border-t border-slate-50 dark:border-slate-800/50 p-4 space-y-3.5">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm rounded-xl">
              {user.name.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-medium truncate">{user.email}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center px-0' : 'space-x-3 px-4'
            } py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all`}
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside className={`hidden md:block h-screen sticky top-0 flex-shrink-0 z-20 ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Mobile Backdrop */}
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs"
          />
          {/* Drawer Panel */}
          <div className="relative w-64 max-w-xs h-full flex-shrink-0 flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
            {/* Close button inside drawer */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-[-44px] p-2 bg-slate-900 text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
