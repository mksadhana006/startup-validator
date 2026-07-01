import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, ArrowRight } from 'lucide-react';

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex-1 min-h-[80vh] flex flex-col justify-center items-center px-4 py-16 text-center space-y-8 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto space-y-6">
        <div className="p-5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-full animate-pulse">
          <Compass className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-slate-900 dark:text-white">404</h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Lost in the Ecosystem?</h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
            The page you are looking for does not exist or has been shifted. Let's redirect you back to a verified route.
          </p>
        </div>

        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors text-xs"
        >
          <span>{isAuthenticated ? 'Go to Dashboard' : 'Back to Home'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
