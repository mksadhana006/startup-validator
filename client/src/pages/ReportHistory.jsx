import React, { useState } from 'react';
import { useReports } from '../context/ReportContext';
import { useToast } from '../context/ToastContext';
import StartupCard from '../components/StartupCard';
import Modal from '../components/Modal';
import { Search, SlidersHorizontal, Trash2, Inbox } from 'lucide-react';

const ReportHistory = () => {
  const { reports, deleteReport } = useReports();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedScoreRange, setSelectedScoreRange] = useState('');
  
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Extract unique industries from reports for the filter dropdown
  const industries = [...new Set(reports.map((r) => r.industry))];

  // Filtering Logic
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry ? report.industry === selectedIndustry : true;
    
    let matchesScore = true;
    if (selectedScoreRange === 'high') matchesScore = report.score >= 75;
    else if (selectedScoreRange === 'medium') matchesScore = report.score >= 50 && report.score < 75;
    else if (selectedScoreRange === 'low') matchesScore = report.score < 50;

    return matchesSearch && matchesIndustry && matchesScore;
  });

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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-slate-950 dark:text-white m-0">Evaluation History</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
          Access and search all your previously generated startup validation reports.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 md:p-5 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        {/* Search */}
        <div className="flex-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            placeholder="Search startup name or industry..."
          />
        </div>

        {/* Filters Wrapper */}
        <div className="flex flex-col sm:flex-row gap-3 md:flex-none">
          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="block w-full sm:w-44 px-3.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 transition-all"
          >
            <option value="">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          {/* Score Filter */}
          <select
            value={selectedScoreRange}
            onChange={(e) => setSelectedScoreRange(e.target.value)}
            className="block w-full sm:w-44 px-3.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 transition-all"
          >
            <option value="">All Scores</option>
            <option value="high">High Feasibility (75+)</option>
            <option value="medium">Medium Feasibility (50-74)</option>
            <option value="low">Needs Pivot (&lt;50)</option>
          </select>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredReports.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl py-20 flex flex-col items-center justify-center text-center">
          <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
          <p className="text-sm font-bold text-slate-800 dark:text-slate-300">No matching reports found</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mt-1 leading-relaxed">
            Try adjusting your search queries or filter parameters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <StartupCard
              key={report.id}
              report={report}
              onDelete={triggerDelete}
            />
          ))}
        </div>
      )}

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

export default ReportHistory;
