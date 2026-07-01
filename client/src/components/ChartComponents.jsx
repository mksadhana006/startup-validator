import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

// Custom Tooltip component for premium look
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl shadow-lg">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
          Score: <span className="text-slate-900 dark:text-white font-extrabold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// 1. Line/Area Chart showing score history
export const ValidationHistoryChart = ({ data = [] }) => {
  const { darkMode } = useTheme();
  
  // Format data for chart
  const chartData = data
    .map((report) => ({
      name: report.name.length > 15 ? report.name.substring(0, 12) + '...' : report.name,
      score: report.score,
      date: new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }))
    .reverse(); // Show chronological order

  return (
    <div className="w-full h-72">
      {chartData.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-400">
          No history data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? '#1e293b' : '#f1f5f9'}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke={darkMode ? '#64748b' : '#94a3b8'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              domain={[0, 100]}
              stroke={darkMode ? '#64748b' : '#94a3b8'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

// 2. Radar/Spider chart for individual score breakdown
export const ValidationRadarChart = ({ scores = {} }) => {
  const { darkMode } = useTheme();

  const data = [
    { subject: 'Market Demand', score: scores.marketDemand || 0 },
    { subject: 'Financial Feasibility', score: scores.financialFeasibility || 0 },
    { subject: 'Execution Risk', score: scores.executionRisk || 0 },
    { subject: 'Competitor Density', score: scores.competitorDensity || 0 },
    { subject: 'Regulatory Barrier', score: scores.regulatoryBarrier || 0 },
  ];

  return (
    <div className="w-full h-72 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke={darkMode ? '#334155' : '#e2e8f0'} />
          <PolarAngleAxis
            dataKey="subject"
            stroke={darkMode ? '#cbd5e1' : '#475569'}
            fontSize={10.5}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            stroke={darkMode ? '#475569' : '#94a3b8'}
            fontSize={9}
            tickLine={false}
            axisLine={false}
          />
          <Radar
            name="Valuation"
            dataKey="score"
            stroke="#a855f7"
            fill="#a855f7"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
