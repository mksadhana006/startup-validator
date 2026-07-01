import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../context/ReportContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, Rocket, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

const StartupForm = () => {
  const { analyzeStartup } = useReports();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    targetMarket: '',
    revenueModel: '',
    fundingStage: ''
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  
  // Evaluation Progress States
  const [isValidating, setIsValidating] = useState(false);
  const [validationStep, setValidationStep] = useState('');
  const [validationProgress, setValidationProgress] = useState(0);

  const industries = [
    'SaaS / Software',
    'AI / Machine Learning',
    'Fintech',
    'Healthcare / Biotech',
    'Edtech',
    'Logistics / Supply Chain',
    'Sustainability / GreenTech',
    'E-commerce / Retail',
    'Web3 / Blockchain'
  ];

  const fundingStages = [
    'Idea Stage',
    'Pre-seed',
    'Seed',
    'Series A',
    'Bootstrapped / Self-funded'
  ];

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Startup name is required.';
    if (!formData.description.trim()) {
      tempErrors.description = 'Concept description is required.';
    } else if (formData.description.trim().length < 15) {
      tempErrors.description = 'Description must be at least 15 characters to analyze.';
    }
    if (!formData.industry) tempErrors.industry = 'Please select an industry.';
    if (!formData.targetMarket.trim()) tempErrors.targetMarket = 'Target market description is required.';
    if (!formData.revenueModel.trim()) tempErrors.revenueModel = 'Revenue model description is required.';
    if (!formData.fundingStage) tempErrors.fundingStage = 'Please select a funding stage.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please correct the validation errors in the form.', 'warning');
      return;
    }

    setIsValidating(true);
    try {
      // Begin the mock multi-step analysis
      const analysis = await analyzeStartup(formData);
      
      const newReport = await analysis.run((stepMsg, stepIndex) => {
        setValidationStep(stepMsg);
        setValidationProgress(Math.round(((stepIndex + 1) / analysis.steps.length) * 100));
      });

      addToast('Startup validation report compiled!', 'success');
      navigate(`/dashboard/report/${newReport.id}`);
    } catch (err) {
      addToast('Validation simulator failed. Please try again.', 'error');
      setIsValidating(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center py-12 px-4 text-center max-w-xl mx-auto space-y-8 animate-in fade-in duration-300">
        <div className="relative">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-xl scale-125 animate-pulse" />
          <div className="relative p-6 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-full">
            <Rocket className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-bounce" />
          </div>
        </div>

        <div className="space-y-3 w-full">
          <h3 className="text-xl font-black text-slate-950 dark:text-white">Analyzing Your Startup Idea</h3>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Our validator is scanning models, competitor metrics, and margins...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500">
            <span className="truncate">{validationStep}</span>
            <span>{validationProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${validationProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2.5 px-4 py-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl max-w-md w-full justify-center">
          <LoadingSpinner size="sm" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Estimating execution risks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg transition-colors border border-slate-100 dark:border-slate-800/80"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-950 dark:text-white m-0">Validate Business Concept</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
            Fill in the details below to evaluate the market demand and feasibility indexes.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Startup Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Startup / Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-2 block w-full px-4 py-3 border rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.name
                  ? 'border-rose-300 focus:border-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
              }`}
              placeholder="e.g. EcoPack Logistics"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Value Proposition & Concept Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className={`mt-2 block w-full px-4 py-3 border rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.description
                  ? 'border-rose-300 focus:border-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
              }`}
              placeholder="Explain the core problem you solve, what your solution is, and how it delivers value..."
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Grid: Industry & Funding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Industry */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Industry Sector
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`mt-2 block w-full px-4 py-3 border rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                  errors.industry
                    ? 'border-rose-300 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                }`}
              >
                <option value="">Select industry...</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.industry}
                </p>
              )}
            </div>

            {/* Funding Stage */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Current Development / Funding Stage
              </label>
              <select
                name="fundingStage"
                value={formData.fundingStage}
                onChange={handleInputChange}
                className={`mt-2 block w-full px-4 py-3 border rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                  errors.fundingStage
                    ? 'border-rose-300 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                }`}
              >
                <option value="">Select current stage...</option>
                {fundingStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
              {errors.fundingStage && (
                <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fundingStage}
                </p>
              )}
            </div>
          </div>

          {/* Target Market */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Primary Target Audience / Target Market
            </label>
            <input
              type="text"
              name="targetMarket"
              value={formData.targetMarket}
              onChange={handleInputChange}
              className={`mt-2 block w-full px-4 py-3 border rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.targetMarket
                  ? 'border-rose-300 focus:border-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
              }`}
              placeholder="e.g. Local artisan e-commerce stores, mid-sized B2B retailers"
            />
            {errors.targetMarket && (
              <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.targetMarket}
              </p>
            )}
          </div>

          {/* Revenue Model */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Intended Revenue Model / Monetization Strategy
            </label>
            <input
              type="text"
              name="revenueModel"
              value={formData.revenueModel}
              onChange={handleInputChange}
              className={`mt-2 block w-full px-4 py-3 border rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.revenueModel
                  ? 'border-rose-300 focus:border-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
              }`}
              placeholder="e.g. B2B Subscription SaaS, Transaction fees, direct sales contracts"
            />
            {errors.revenueModel && (
              <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.revenueModel}
              </p>
            )}
          </div>

          {/* Action Trigger */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all text-xs"
            >
              <Sparkles className="w-4.5 h-4.5" />
              <span>Generate Validation Report</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StartupForm;
