import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trash2, ArrowRight } from 'lucide-react';

const StartupCard = ({ report, onDelete }) => {
  const getScoreColor = (score) => {
    if (score >= 75) return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30';
    if (score >= 50) return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30';
    return 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30';
  };

  const formattedDate = new Date(report.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all group flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Top bar with Industry and Score */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-[10px] font-extrabold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-md">
              {report.industry}
            </span>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white mt-2.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {report.name}
            </h3>
          </div>
          
          <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border font-black text-lg ${getScoreColor(report.score)}`}>
            {report.score}
          </div>
        </div>

        {/* Truncated description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {report.description}
        </p>

        {/* Date submission */}
        <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>Validated on {formattedDate}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-800/50 mt-5 pt-4">
        <button
          onClick={() => onDelete(report.id)}
          className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-2 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
          title="Delete Validation Report"
        >
          <Trash2 className="w-4.5 h-4.5" />
        </button>

        <Link
          to={`/dashboard/report/${report.id}`}
          className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 gap-1.5"
        >
          <span>Full Report</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default StartupCard;
