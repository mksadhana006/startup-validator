import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Feature Tour', href: '#features' },
        { label: 'Pricing Tiers', href: '#pricing' },
        { label: 'Validation API', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Startup Guides', href: '#' },
        { label: 'Success Stories', href: '#' },
        { label: 'Knowledge Base', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Use', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Data Security', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          {/* Logo & Pitch */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="p-2 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-950 dark:text-white">
                Startup<span className="text-indigo-600 dark:text-indigo-400">Validator</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Analyze, validate, and optimize your business ideas with our premium evaluation algorithms. Mitigate risks before writing a single line of code.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 rounded-xl transition-all">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 rounded-xl transition-all">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 rounded-xl transition-all">
                <Github className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 dark:border-slate-900 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            &copy; {currentYear} Startup Validator. All rights reserved. Built with precision.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Designed to empower founders worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
