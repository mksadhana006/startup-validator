import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useReports } from '../context/ReportContext';
import ScoreCard from '../components/ScoreCard';
import { ValidationRadarChart } from '../components/ChartComponents';
import {
  ArrowLeft,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Share2,
  Download,
  Users
} from 'lucide-react';

const ValidationReport = () => {
  const { id } = useParams();
  const { getReportById } = useReports();
  const navigate = useNavigate();

  const report = getReportById(id);

  if (!report) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Validation Report Not Found</h3>
        <p className="text-sm text-slate-500 max-w-sm">
          The requested evaluation index has either been deleted or does not exist.
        </p>
        <Link
          to="/dashboard"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Color mappings for the circular overall score gauge
  const getScoreColor = (score) => {
    if (score >= 75) return 'text-emerald-500 border-emerald-500 bg-emerald-500/5';
    if (score >= 50) return 'text-amber-500 border-amber-500 bg-amber-500/5';
    return 'text-rose-500 border-rose-500 bg-rose-500/5';
  };

  const formattedDate = new Date(report.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg transition-colors border border-slate-100 dark:border-slate-800/80"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <div>
            <span className="text-[10px] font-extrabold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-md">
              {report.industry}
            </span>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white mt-2 mb-0">
              {report.name}
            </h1>
            <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 text-xs mt-1 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Validated on {formattedDate}</span>
              <span>•</span>
              <Layers className="w-3.5 h-3.5" />
              <span>{report.fundingStage}</span>
            </div>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex space-x-3 w-full md:w-auto">
          <button
            onClick={() => window.print()}
            className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Report link copied to clipboard!');
            }}
            className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Report</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Value Proposition</h3>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
          {report.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-slate-50 dark:border-slate-800/80 pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div>
            <span className="font-extrabold text-slate-800 dark:text-slate-300 block mb-0.5">Target Market Segment:</span>
            {report.targetMarket}
          </div>
          <div>
            <span className="font-extrabold text-slate-800 dark:text-slate-300 block mb-0.5">Revenue monetization:</span>
            {report.revenueModel}
          </div>
        </div>
      </div>

      {/* Score Overview and Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overall Score Circle Gauge */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">Overall validation score</h3>
          
          <div className={`relative flex items-center justify-center w-36 h-36 rounded-full border-8 font-black text-4xl ${getScoreColor(report.score)}`}>
            {report.score}
            <span className="absolute bottom-6 text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500">Score</span>
          </div>

          <div className="mt-6 space-y-1">
            <h4 className="text-base font-extrabold text-slate-800 dark:text-white">
              {report.score >= 75 ? 'Strong Concept Fit' : report.score >= 50 ? 'Moderate Concept Potential' : 'Needs Pivoting'}
            </h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[200px] leading-relaxed">
              Based on the synthesis of 5 core feasibility categories.
            </p>
          </div>
        </div>

        {/* Category Breakdown Radar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Category Mapping</h3>
          <ValidationRadarChart scores={report.scores} />
        </div>

      </div>

      {/* Sub-Scores Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <ScoreCard title="Market Demand" score={report.scores.marketDemand} type="marketDemand" />
        <ScoreCard title="Financial Feasibility" score={report.scores.financialFeasibility} type="financialFeasibility" />
        <ScoreCard title="Execution Risk" score={report.scores.executionRisk} type="executionRisk" />
        <ScoreCard title="Competitor Density" score={report.scores.competitorDensity} type="competitorDensity" />
        <ScoreCard title="Regulatory compliance" score={report.scores.regulatoryBarrier} type="regulatoryBarrier" />
      </div>

      {/* Analysis Details: Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros (Positives) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Key Strengths & Pros</span>
          </h3>
          <ul className="space-y-3.5">
            {report.positives.map((pos, idx) => (
              <li key={idx} className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <span>{pos}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons (Risks) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Key Vulnerabilities & Risks</span>
          </h3>
          <ul className="space-y-3.5">
            {report.negatives.map((neg, idx) => (
              <li key={idx} className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <span>{neg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-indigo-500" />
          <span>Strategic AI Recommendations</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/40 dark:border-indigo-900/20 rounded-xl space-y-2">
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Rec {idx + 1}</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Benchmarks */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          <span>Competitor Landscape benchmarks</span>
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="pb-3 pr-4">Competitor Name</th>
                <th className="pb-3 pr-4">Estimated Strength</th>
                <th className="pb-3">Your Product Differentiation</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              {report.competitors.map((comp, idx) => (
                <tr key={idx} className="border-b border-slate-50 dark:border-slate-800/40">
                  <td className="py-3.5 pr-4 font-bold text-slate-900 dark:text-white">{comp.name}</td>
                  <td className="py-3.5 pr-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {comp.strength}
                    </span>
                  </td>
                  <td className="py-3.5">{comp.differentiation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ValidationReport;
