import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, DollarSign, Target, ShieldCheck, ArrowRight, Layers, Zap } from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const features = [
    {
      title: 'Market Demand Scoring',
      desc: 'Verify if your product matches active customer searches and industry growth models.',
      icon: <TrendingUp className="w-6 h-6 text-indigo-500" />,
      color: 'from-indigo-500/10 to-indigo-500/0'
    },
    {
      title: 'Financial Feasibility',
      desc: 'Evaluate margins, CAC profiles, and monetization streams for sustainable scale.',
      icon: <DollarSign className="w-6 h-6 text-pink-500" />,
      color: 'from-pink-500/10 to-pink-500/0'
    },
    {
      title: 'Competitor Mapping',
      desc: 'Check barrier heights and position differentiation matrices against existing solutions.',
      icon: <Target className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-500/10 to-blue-500/0'
    },
    {
      title: 'Execution & Compliance',
      desc: 'Audit technical complexities and identify critical regulatory hurdles early.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      color: 'from-emerald-500/10 to-emerald-500/0'
    }
  ];

  return (
    <div className="w-full relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-full">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Introducing Instant Diagnostic Reports
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1]"
          >
            Validate Your Startup Idea <br />
            <span className="text-gradient font-extrabold">Before You Build</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Startup Validator evaluates your value proposition, competition, market volume, and legal risks using custom analytics templates. Build with certainty.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center w-full sm:w-auto text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all space-x-2 group"
            >
              <span>Validate Your Idea Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center w-full sm:w-auto text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              Learn Methodology
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 50 }}
          className="mt-16 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 p-2 max-w-5xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/20 to-transparent pointer-events-none" />
          <div className="flex items-center space-x-2 px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 rounded-t-xl">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold ml-4">https://startupvalidator.com/dashboard</span>
          </div>
          <div className="aspect-[16/9] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8">
            <Layers className="w-12 h-12 text-slate-300 dark:text-slate-700 animate-bounce mb-4" />
            <p className="text-xs text-slate-400 dark:text-slate-600 font-bold">Interactive Evaluation Workspace Preview</p>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 border-y border-slate-100 dark:border-slate-900/60 bg-white dark:bg-slate-900/30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Multi-Dimensional Evaluation Engine
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
              Validate every corner of your concept before committing capital, developers, or marketing spend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`p-3 bg-gradient-to-br ${feat.color} rounded-xl inline-block`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">{feat.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Transparent, Value-First Pricing
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
              Start diagnosing ideas for free. Upgrade as your research needs expand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">Explorer</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1">For validating initial side projects.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                  <span className="text-xs text-slate-400 font-semibold ml-2">/ month</span>
                </div>
                <ul className="space-y-3 border-t border-slate-50 dark:border-slate-800/80 pt-6 text-sm text-slate-600 dark:text-slate-400 font-semibold">
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>3 Validation Reports / month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Basic Market Score breakdown</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Save reports locally (History)</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 block text-center py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all text-sm"
              >
                Sign Up Free
              </Link>
            </div>

            {/* Premium Card */}
            <div className="bg-white dark:bg-slate-900 border-2 border-indigo-500 rounded-2xl p-8 shadow-md flex flex-col justify-between relative">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                Most Popular
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">Founder Pro</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1">For active builders and micro-SaaS creators.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$19</span>
                  <span className="text-xs text-slate-400 font-semibold ml-2">/ month</span>
                </div>
                <ul className="space-y-3 border-t border-slate-50 dark:border-slate-800/80 pt-6 text-sm text-slate-600 dark:text-slate-400 font-semibold">
                  <li className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-indigo-500 animate-pulse" />
                    <span className="text-slate-900 dark:text-slate-200">Unlimited Validation Reports</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Granular competitor positioning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>In-depth AI recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>PDF Export & sharing settings</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 block text-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 text-sm"
              >
                Start Pro Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white py-16 px-4 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl font-extrabold text-white">Stop Guessing. Start Validating.</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm font-medium leading-relaxed">
            Create your account in under 30 seconds and run your first concept scan immediately. Zero coding, full analytics.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-white text-slate-950 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg text-sm"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
