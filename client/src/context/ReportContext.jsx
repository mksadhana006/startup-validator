import React, { createContext, useContext, useState, useEffect } from 'react';

const ReportContext = createContext();

const initialReports = [
  {
    id: 'rep_1',
    name: 'EcoPack Logistics',
    description: 'Biodegradable packaging solutions for local e-commerce stores using bamboo fiber.',
    industry: 'Logistics / Sustainability',
    targetMarket: 'E-commerce Brands',
    revenueModel: 'B2B Sales & Contracts',
    fundingStage: 'Pre-seed',
    score: 78,
    scores: {
      marketDemand: 85,
      financialFeasibility: 72,
      executionRisk: 65,
      competitorDensity: 80,
      regulatoryBarrier: 88,
    },
    positives: [
      'High consumer demand for eco-friendly products creates strong push for B2B brands to adopt.',
      'Bamboo-based raw material supply chains are stable and scalable.',
      'Excellent regulatory compliance profile with green initiatives/grants eligibility.'
    ],
    negatives: [
      'Production margins are tight compared to traditional plastic polymers.',
      'Logistical costs are initially high due to batch delivery limits.'
    ],
    recommendations: [
      'Target medium-sized artisan shop brands first to command a higher price premium.',
      'Invest in optimized compression machinery to lower unit production costs by 15%.',
      'Leverage local green government subsidies to offset setup logistics fees.'
    ],
    competitors: [
      { name: 'EcoWrap Inc.', strength: 'High', differentiation: 'Focuses on paper wraps; bamboo offers higher durability.' },
      { name: 'PolyBio Packaging', strength: 'Medium', differentiation: 'Uses cornstarch which breaks down faster under heat.' }
    ],
    createdAt: '2026-06-15T14:30:00.000Z'
  },
  {
    id: 'rep_2',
    name: 'HealthQuery AI',
    description: 'AI-powered chatbot providing instant clinical summary notes for busy general practitioners.',
    industry: 'Healthcare / AI SaaS',
    targetMarket: 'General Physicians',
    revenueModel: 'SaaS Subscription',
    fundingStage: 'Seed',
    score: 64,
    scores: {
      marketDemand: 90,
      financialFeasibility: 85,
      executionRisk: 35,
      competitorDensity: 40,
      regulatoryBarrier: 70,
    },
    positives: [
      'Massive pain point identified: doctors spend up to 3 hours daily on medical note-taking.',
      'High gross margins (80%+) typical of software-only cloud platforms.',
      'Product integrates natively with standard Epic / Cerner EHR APIs.'
    ],
    negatives: [
      'Extremely high liability and compliance risk (HIPAA, GDPR) regarding patient data storage.',
      'Crowded space with numerous tech giants (Microsoft Nuance, Google Health AI) competing.'
    ],
    recommendations: [
      'Pivoting to zero-retention API setups where health data is never stored locally on your servers.',
      'Seek SOC 2 Type II and HIPAA certification immediately to build trust.',
      'Differentiate by training models specifically on specialized pediatric clinical vocabularies.'
    ],
    competitors: [
      { name: 'Nuance DAX', strength: 'Dominant', differentiation: 'DAX is enterprise-focused; HealthQuery targets smaller private clinics.' },
      { name: 'ScribeLink AI', strength: 'High', differentiation: 'Requires manual human audit; HealthQuery is 100% automated & instant.' }
    ],
    createdAt: '2026-06-22T09:15:00.000Z'
  },
  {
    id: 'rep_3',
    name: 'PeerLearn',
    description: 'Peer-to-peer tutoring network for high schoolers with gamified study groups and token rewards.',
    industry: 'EdTech / Web3',
    targetMarket: 'Students & Parents',
    revenueModel: 'Freemium with micro-transactions',
    fundingStage: 'Idea Stage',
    score: 52,
    scores: {
      marketDemand: 60,
      financialFeasibility: 45,
      executionRisk: 60,
      competitorDensity: 30,
      regulatoryBarrier: 65,
    },
    positives: [
      'Highly engaging mechanics; students learn better from peers.',
      'Zero content creation overhead since users teach each other.'
    ],
    negatives: [
      'Extremely low willingness to pay directly from high schoolers; parents are skeptical of tokenized incentives.',
      'High moderation and safety complexity to ensure child safety online.'
    ],
    recommendations: [
      'Re-anchor the marketing message towards parents focusing on verified grade improvements.',
      'Ditch public blockchain mechanisms in favor of private in-app reward points redeemable for gift cards.',
      'Implement mandatory COPPA-compliant background checks for student mentors.'
    ],
    competitors: [
      { name: 'Brainly', strength: 'Dominant', differentiation: 'Brainly is Q&A based; PeerLearn is video-centric and live study groups.' },
      { name: 'Outschool', strength: 'High', differentiation: 'Outschool utilizes professional adults; PeerLearn is peer-led.' }
    ],
    createdAt: '2026-06-28T18:45:00.000Z'
  }
];

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('sv_reports');
    return saved ? JSON.parse(saved) : initialReports;
  });

  useEffect(() => {
    localStorage.setItem('sv_reports', JSON.stringify(reports));
  }, [reports]);

  const deleteReport = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const getReportById = (id) => {
    return reports.find((r) => r.id === id);
  };

  // Simulates AI validation calculations based on submission inputs
  const analyzeStartup = async (startupData) => {
    const steps = [
      'Ingesting company data structures...',
      'Mapping industry competitor landscape...',
      'Scoping target market size & growth trajectory...',
      'Analyzing financial unit economics & margins...',
      'Evaluating regulatory hurdles & data privacy compliance...',
      'Compiling final diagnostic scores & AI advisor feedback...'
    ];

    // This callback allows pages to subscribe to multi-stage loading messages
    return {
      steps,
      run: async (onStepChange) => {
        for (let i = 0; i < steps.length; i++) {
          if (onStepChange) onStepChange(steps[i], i);
          await new Promise((resolve) => setTimeout(resolve, 800));
        }

        // Calculate somewhat dynamic scores using inputs
        const nameLen = startupData.name.length;
        const descLen = startupData.description.length;
        
        // Generate pseudo-random, predictable scores
        const marketDemand = Math.min(Math.max(50 + (nameLen % 5) * 8 + (descLen % 3) * 4, 40), 98);
        const financialFeasibility = Math.min(Math.max(45 + (descLen % 5) * 9 + (startupData.revenueModel.length % 3) * 6, 35), 95);
        const executionRisk = Math.min(Math.max(30 + (startupData.industry.length % 7) * 8 + (nameLen % 2) * 15, 25), 90);
        const competitorDensity = Math.min(Math.max(40 + (startupData.targetMarket.length % 6) * 9 + (descLen % 2) * 10, 30), 92);
        const regulatoryBarrier = Math.min(Math.max(50 + (startupData.fundingStage.length % 3) * 12 + (nameLen % 4) * 5, 45), 96);

        const overallScore = Math.round((marketDemand + financialFeasibility + executionRisk + competitorDensity + regulatoryBarrier) / 5);

        const newReport = {
          id: 'rep_' + Date.now(),
          name: startupData.name,
          description: startupData.description,
          industry: startupData.industry,
          targetMarket: startupData.targetMarket,
          revenueModel: startupData.revenueModel,
          fundingStage: startupData.fundingStage,
          score: overallScore,
          scores: {
            marketDemand,
            financialFeasibility,
            executionRisk,
            competitorDensity,
            regulatoryBarrier
          },
          positives: [
            `Strong baseline concept for ${startupData.name} targeting the ${startupData.industry} industry.`,
            `Clear focus on addressable target audience: ${startupData.targetMarket}.`,
            `Scalable monetization potential through their ${startupData.revenueModel} framework.`
          ],
          negatives: [
            `Entering as a ${startupData.fundingStage} entrant requires heavy initial customer acquisition cost (CAC).`,
            `Potential execution risk metrics of ${executionRisk}% highlight product implementation hurdles.`,
            'Market saturation could restrict fast adoption if competitive barriers are not explicitly patrolled.'
          ],
          recommendations: [
            `Adopt a narrow customer profile within ${startupData.targetMarket} to build an initial proof of concept.`,
            `Optimize cost parameters associated with ${startupData.revenueModel} to secure positive unit margins early.`,
            `Run low-cost customer discovery interviews to validate features before scaling code development.`
          ],
          competitors: [
            { name: 'Incumbent Alpha', strength: 'High', differentiation: 'Broad feature set; your product can win by doing one thing perfectly.' },
            { name: 'Local Players', strength: 'Low', differentiation: 'Fragmented operations; opportunity to bundle value under a modern user interface.' }
          ],
          createdAt: new Date().toISOString()
        };

        setReports((prev) => [newReport, ...prev]);
        return newReport;
      }
    };
  };

  return (
    <ReportContext.Provider value={{ reports, getReportById, analyzeStartup, deleteReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
};
