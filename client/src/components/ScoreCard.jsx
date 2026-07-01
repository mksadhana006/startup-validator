import React from 'react';
import ProgressBar from './ProgressBar';
import { ShieldCheck, TrendingUp, DollarSign, Users, Scale } from 'lucide-react';

const ScoreCard = ({ title, score, type }) => {
  const getRating = (val) => {
    if (val >= 80) return { label: 'Exceptional', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' };
    if (val >= 65) return { label: 'Healthy Fit', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' };
    if (val >= 50) return { label: 'Moderate Risk', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' };
    return { label: 'High Alert', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' };
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5 text-indigo-500 dark:text-indigo-400";
    switch (type) {
      case 'marketDemand':
        return <TrendingUp className={iconClass} />;
      case 'financialFeasibility':
        return <DollarSign className={iconClass} />;
      case 'executionRisk':
        return <ShieldCheck className={iconClass} />;
      case 'competitorDensity':
        return <Users className={iconClass} />;
      case 'regulatoryBarrier':
        return <Scale className={iconClass} />;
      default:
        return <ShieldCheck className={iconClass} />;
    }
  };

  const rating = getRating(score);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{title}</h4>
          </div>
        </div>
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${rating.color}`}>
          {rating.label}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{score}</span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>
        <ProgressBar value={score} showValue={false} />
      </div>
    </div>
  );
};

export default ScoreCard;
