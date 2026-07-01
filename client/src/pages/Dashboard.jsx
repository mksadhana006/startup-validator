import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReports } from '../context/ReportContext';
import { useToast } from '../context/ToastContext';
import StartupCard from '../components/StartupCard';
import { ValidationHistoryChart } from '../components/ChartComponents';
import Modal from '../components/Modal';
import {
  FileText,
  Percent,
  CheckCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  Sparkles,
  Inbox
} from 'lucide-react';

const Dashboard = () => {
  const { reports, deleteReport } = useReports();
  const { addToast } = useToast();
  
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Math Calculations for Dashboard Stats
  const totalScans = reports.length;
  
  const averageScore = totalScans > 0 
    ? Math.round(reports.reduce((acc, curr) => acc + curr.score, 0) / totalScans) 
    : 0;

  const topIdeasCount = reports.filter((r) => r.score >= 75).length;

  const avgMarketDemand = totalScans > 0
    ? Math.round(reports.reduce((acc, curr) => acc + (curr.scores?.marketDemand || 0), 0) / totalScans)
    : 0;

  // Handler for delete modal confirmation
  const triggerDelete = (id) => {
    setSelectedReportId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteReport(selectedReportId);
    addToast('Validation report deleted successfully.', 'info');
    setIsDeleteModalOpen(false);
    setSelectedReportId(null);
  };

  const stats = [
    {
      name: 'Total Ideas Scanned',
      value: totalScans,
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
      bg: 'bg-indigo-50 dark:bg-indigo-950/30'
    },
    {
      name: 'Average Validation Score',
      value: `${averageScore}/100`,
      icon: <Percent className="w-5 h-5 text-pink-500" />,
      bg: 'bg-pink-50 dark:bg-pink-950/30'
    },
    {
      name: 'Highly Feasible (>=75)',
      value: topIdeasCount,
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/30'
    },
    {
      name: 'Avg. Market Demand',
      value: `${avgMarketDemand}%`,
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-50 dark:bg-blue-950/30'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
            Workspace Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Analyze new product concepts and review previous validation indexes.
          </p>
        </div>
        <Link
          to="/dashboard/submit"
          className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition-all text-xs relative z-10"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Validate New Idea</span>
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm flex items-center space-x-4"
          >
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{stat.name}</p>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white mt-1 mb-0">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Validation Score Trends</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
            Overview of validation output scores for your registered startup ideas.
          </p>
        </div>
        <ValidationHistoryChart data={reports} />
      </div>

      {/* Recent Submissions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Idea Valuations</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
              The latest business proposals run through the evaluation system.
            </p>
          </div>
          <Link
            to="/dashboard/history"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl py-12 flex flex-col items-center justify-center text-center">
            <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
            <p className="text-sm font-bold text-slate-800 dark:text-slate-300">No startup ideas scanned yet</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mt-1 leading-relaxed">
              Submit your first idea now and get a comprehensive evaluation report in seconds.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.slice(0, 3).map((report) => (
              <StartupCard
                key={report.id}
                report={report}
                onDelete={triggerDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Report Deletion"
        footerActions={
          <>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-md shadow-rose-600/10 transition-all"
            >
              Delete Permanently
            </button>
          </>
        }
      >
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Are you sure you want to delete this validation report? This action is permanent and cannot be undone. All scores, competitor analyses, and recommendations for this item will be removed.
        </p>
      </Modal>
    </div>
  );
};

export default Dashboard;
