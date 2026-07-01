import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReports } from '../context/ReportContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, ShieldAlert, Sparkles, Loader2, CheckCircle } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { reports } = useReports();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [role, setRole] = useState(user?.role || 'Founder');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('Name field cannot be left blank.', 'warning');
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({ name, bio, role });
      addToast('Profile changes saved successfully.', 'success');
    } catch (err) {
      addToast('Failed to update profile settings.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const proFeatures = [
    'Run unlimited idea validation scans',
    'Export high-quality PDFs for pitch decks',
    'Custom SWOT and competitor matrices',
    'Priority regulatory and compliance databases'
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-black text-slate-950 dark:text-white m-0">Profile Settings</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
          Manage your account credentials, view workspace metrics, and update subscription plans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card & Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Form Heading */}
              <div className="flex items-center space-x-3.5 border-b border-slate-50 dark:border-slate-800/80 pb-4">
                <div className="w-11 h-11 bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center font-bold text-base rounded-xl shadow-md">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Account Details</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Member since {user?.createdAt || 'today'}
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Full Name
                </label>
                <div className="mt-1.5 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Email Address (Disabled)
                </label>
                <div className="mt-1.5 relative rounded-md shadow-sm opacity-60">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-slate-500 text-xs focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Role Title */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Your Role Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1.5 block w-full px-3.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  placeholder="e.g. Founder, CEO, Product Manager"
                />
              </div>

              {/* Bio Description */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Bio / Tagline
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="mt-1.5 block w-full px-3.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  placeholder="Describe yourself or your company mission..."
                />
              </div>

              {/* Update Trigger */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all text-xs disabled:opacity-50"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Subscription Tier Info */}
        <div className="space-y-6">
          {/* Active Plan details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Subscription Tier</h3>
            
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-400">Explorer Free Plan</h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">3 validations / month limit</p>
                </div>
                <span className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Pro Features Waiting:</span>
              <ul className="space-y-2.5">
                {proFeatures.map((feat) => (
                  <li key={feat} className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-slate-300 dark:text-slate-700 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => addToast('Pro plan upgrading demo triggered. Feature placeholder only.', 'info')}
              className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl shadow-md transition-all text-xs"
            >
              <Sparkles className="w-4.5 h-4.5" />
              <span>Upgrade to Founder Pro</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Workspace usage</h3>
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-black text-slate-950 dark:text-white">{reports.length}</span>
              <span className="text-xs text-slate-400 font-semibold">/ 3 scans limit used</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden mt-3">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${Math.min((reports.length / 3) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
