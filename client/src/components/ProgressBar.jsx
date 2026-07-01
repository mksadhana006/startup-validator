import React from 'react';

const ProgressBar = ({ value, label = '', showValue = true, height = 'sm', color = '' }) => {
  const percentage = Math.min(Math.max(0, value), 100);

  // Dynamic color threshold mapping if no color is overridden
  const getProgressColor = (val) => {
    if (color) return color;
    if (val >= 75) return 'bg-emerald-500';
    if (val >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const heightClasses = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3.5',
    lg: 'h-5',
  };

  return (
    <div className="w-full space-y-1.5">
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
          {label && <span>{label}</span>}
          {showValue && <span className="font-bold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
