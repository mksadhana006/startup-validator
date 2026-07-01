import React from 'react';

const LoadingSkeleton = ({ variant = 'card', lines = 3 }) => {
  const pulseClass = "animate-pulse bg-slate-200 dark:bg-slate-700/60 rounded";

  if (variant === 'card') {
    return (
      <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center space-x-4">
          <div className={`${pulseClass} w-12 h-12 rounded-full`} />
          <div className="space-y-2 flex-1">
            <div className={`${pulseClass} h-4 w-1/3`} />
            <div className={`${pulseClass} h-3 w-1/4`} />
          </div>
        </div>
        <div className="space-y-2 pt-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`${pulseClass} h-3`}
              style={{ width: i === lines - 1 ? '60%' : '100%' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className={`${pulseClass} h-6 w-1/4`} />
        <div className="h-48 flex items-end space-x-2 pt-4">
          {Array.from({ length: 12 }).map((_, i) => {
            const heights = ['20%', '40%', '35%', '60%', '55%', '80%', '70%', '90%', '75%', '50%', '40%', '65%'];
            return (
              <div
                key={i}
                className={`${pulseClass} flex-1`}
                style={{ height: heights[i % heights.length] }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3 p-3 border-b border-slate-100 dark:border-slate-800/40">
            <div className={`${pulseClass} w-4 h-4 rounded-full`} />
            <div className="flex-1 space-y-2">
              <div className={`${pulseClass} h-3.5 w-1/4`} />
              <div className={`${pulseClass} h-2.5 w-3/4`} />
            </div>
            <div className={`${pulseClass} w-10 h-6`} />
          </div>
        ))}
      </div>
    );
  }

  // Text variant
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${pulseClass} h-3`}
          style={{ width: i === lines - 1 ? '50%' : '100%' }}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
