import React, { useState } from 'react';
import { 
  Bot, 
  ShieldCheck, 
  Calculator, 
  Bell, 
  FileText, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  HelpCircle, 
  Search, 
  ExternalLink,
  Sparkles,
  Layers,
  Scale,
  DollarSign
} from 'lucide-react';
import { soundFX } from '../services/soundFx';

export default function HowItWorksGuide({ onOpenPecCalculator, onOpenAlertsModal, onOpenSubmitModal, onExploreTenders }) {
  const [activeTab, setActiveTab] = useState('workflow'); // 'workflow' | 'pec' | 'cdr' | 'ppra'

  const workflowSteps = [
    {
      step: '01',
      title: '8 Autonomous AI Crawlers Scrape 24+ Portals Daily',
      desc: 'Every morning at 08:00 PKT, our 8 specialized agents index government procurement portals (Federal PPRA, Punjab, Sindh, KPK, NHA, WAPDA, IDAP, MES) extracting PDF tenders, BOQ summaries, and eligibility criteria.',
      icon: Bot,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Autonomous AI'
    },
    {
      step: '02',
      title: 'Smart Categorization & PEC License Mapping',
      desc: 'Each tender is processed by NLP pipelines to automatically extract required PEC Construction Categories (C-A, C-1, C-2, C-3, C-4, C-5, C-6), specialization codes (CE-01, EE-04, ME-01, etc.), and financial limits.',
      icon: ShieldCheck,
      color: 'from-emerald-600 to-teal-700',
      badge: 'PEC Precision'
    },
    {
      step: '03',
      title: 'Instant 2% CDR & Bid Security Calculation',
      desc: 'The platform instantly calculates the estimated Call Deposit Receipt (CDR) amount, estimated contract value in PKR Millions/Billions, and highlights mandatory pre-qualification criteria.',
      icon: Calculator,
      color: 'from-amber-600 to-orange-700',
      badge: 'Financial Audit'
    },
    {
      step: '04',
      title: 'Real-time WhatsApp & Email Intelligence Dispatch',
      desc: 'Subscribed contractors and PEC firms receive tailored morning digests and instant WhatsApp alerts matching their licensed category and provincial operations without missing deadlines.',
      icon: Bell,
      color: 'from-blue-600 to-cyan-700',
      badge: 'Instant Alerts'
    }
  ];

  const pecMatrix = [
    { category: 'C-A', limit: 'No Limit (Unlimited)', fee: 'Mega Projects', projects: 'Motorways, Mega Dams, International Terminals, Nuclear & Hydel Power', requirement: '500+ Million PKR Capital, 15+ Professional Engineers' },
    { category: 'C-B', limit: 'Up to PKR 4,000 Million (4 Billion)', fee: 'High-Value Infrastructure', projects: 'Flyovers, Expressways, 500-Bed Teaching Hospitals, Multi-Storey Commercial Hubs', requirement: '200+ Million PKR Capital, 10+ Professional Engineers' },
    { category: 'C-1', limit: 'Up to PKR 2,500 Million (2.5 Billion)', fee: 'Major Works', projects: 'Dual Carriageways, District Complexes, 132kV Grid Stations, Large Bridges', requirement: '100+ Million PKR Capital, 6+ Professional Engineers' },
    { category: 'C-2', limit: 'Up to PKR 1,000 Million (1.0 Billion)', fee: 'Medium-Large Works', projects: 'Secondary Highways, Academic Campuses, Water Treatment Facilities, Industrial Warehouses', requirement: '50+ Million PKR Capital, 4+ Professional Engineers' },
    { category: 'C-3', limit: 'Up to PKR 500 Million (50 Crore)', fee: 'Medium Works', projects: 'Feeder Roads, Commercial Plazas, Sewerage Networks, Substation Electricals', requirement: '25+ Million PKR Capital, 2+ Professional Engineers' },
    { category: 'C-4', limit: 'Up to PKR 200 Million (20 Crore)', fee: 'Standard Works', projects: 'School Buildings, Rural Roads, Drainage Channels, Clinic Renovations', requirement: '10+ Million PKR Capital, 1+ Professional Engineer' },
    { category: 'C-5', limit: 'Up to PKR 65 Million (6.5 Crore)', fee: 'Small-Medium Works', projects: 'Pavement Maintenance, Boundary Walls, Street Lighting, Small Culverts', requirement: '5+ Million PKR Capital, Certified Diploma Engineers' },
    { category: 'C-6', limit: 'Up to PKR 25 Million (2.5 Crore)', fee: 'Municipal Works', projects: 'Patch Works, Building Repairs, Minor Masonry, Local Maintenance', requirement: '2+ Million PKR Capital, Supervised Technical Staff' }
  ];

  return (
    <div className="bg-[#faf8f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5efe6] border border-[#e2d5c3] text-[#7a5632] text-xs font-extrabold mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Pakistan Construction Procurement Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Outfit']">
            How TENDER GATE Works & Contractor Bidding Guide
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything Pakistani civil contractors, MEP firms, and engineering consultants need to know about autonomous tender tracking, PEC eligibility thresholds, and PPRA compliance.
          </p>

          {/* Guide Sub-Nav Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 bg-white p-1.5 rounded-2xl border border-[#e6dacb] shadow-xs">
            <button
              onClick={() => { soundFX.playPop(); setActiveTab('workflow'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'workflow'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-[#f5efe6]'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Platform Workflow</span>
            </button>

            <button
              onClick={() => { soundFX.playPop(); setActiveTab('pec'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'pec'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-[#f5efe6]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>PEC License Matrix (C-A to C-6)</span>
            </button>

            <button
              onClick={() => { soundFX.playPop(); setActiveTab('cdr'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'cdr'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-[#f5efe6]'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>2% CDR & Bid Security Rules</span>
            </button>

            <button
              onClick={() => { soundFX.playPop(); setActiveTab('ppra'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'ppra'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-[#f5efe6]'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>PPRA 2026 Procurement Rules</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Workflow Grid */}
        {activeTab === 'workflow' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={step.step}
                    className="bg-white rounded-2xl p-6 border border-[#e8e2d8] shadow-sm hover:shadow-md transition relative flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-slate-300 group-hover:text-blue-600 transition font-['Outfit']">
                          {step.step}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#f5efe6] text-[#7a5632] border border-[#e2d5c3]">
                          {step.badge}
                        </span>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-105 transition`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action CTA Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight font-['Outfit']">
                  Ready to check your firm's eligibility for live tenders?
                </h3>
                <p className="text-blue-100 text-sm mt-1 max-w-xl">
                  Run your PEC category and specialization codes against all currently open active government bids across Pakistan.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { soundFX.playPop(); onOpenPecCalculator(); }}
                  className="px-5 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-black shadow-lg transition cursor-pointer flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span>Launch PEC Calculator</span>
                </button>
                <button
                  onClick={() => { soundFX.playPop(); onExploreTenders(); }}
                  className="px-5 py-3 rounded-xl bg-blue-700/80 hover:bg-blue-700 text-white text-xs font-bold border border-blue-400/30 transition cursor-pointer"
                >
                  Browse Tenders Feed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PEC License Matrix */}
        {activeTab === 'pec' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e2d8] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#e8e2d8] pb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
                  Pakistan Engineering Council (PEC) Licensing Categories
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Official financial limits and technical criteria prescribed under PEC Constructor / Operator Bylaws.
                </p>
              </div>
              <button
                onClick={() => { soundFX.playPop(); onOpenPecCalculator(); }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                Check My Firm's Fit
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f5efe6] text-slate-800 font-extrabold border-b border-[#e6dacb]">
                    <th className="py-3 px-4 rounded-l-xl">PEC Category</th>
                    <th className="py-3 px-4">Financial Limit (PKR)</th>
                    <th className="py-3 px-4">Work Scope & Project Scale</th>
                    <th className="py-3 px-4 rounded-r-xl">Technical Staff & Capital Reqs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e2d8]">
                  {pecMatrix.map((item) => (
                    <tr key={item.category} className="hover:bg-[#faf8f5] transition">
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {item.limit}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="font-semibold text-slate-900 block">{item.fee}:</span>
                        {item.projects}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {item.requirement}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: CDR & Bid Security Rules */}
        {activeTab === 'cdr' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e2d8] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-['Outfit']">
                What is a Call Deposit Receipt (CDR)?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Under Pakistan Public Procurement Rules, every bidder must submit <strong>Earnest Money / Bid Security</strong> (typically <strong>2% to 3%</strong> of estimated project cost) in the form of a CDR, Pay Order, or Bank Guarantee from a scheduled bank of Pakistan.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Must be drawn in favor of the designated Procuring Agency Officer (e.g. "Executive Engineer C&W").</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>CDR is 100% refundable to non-winning bidders after technical and financial evaluation is declared.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Winning contractor's CDR is converted to Performance Security (10%) upon contract agreement signing.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e2d8] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-['Outfit']">
                TENDER GATE Automatic CDR Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Our platform automatically computes the exact CDR deposit required for every indexed tender notice so contractor estimators can instantly plan working capital before preparing tender files.
              </p>
              <div className="p-4 rounded-2xl bg-[#f5efe6] border border-[#e2d5c3] text-xs space-y-2">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Standard 2% CDR Rule:</span>
                  <span className="text-blue-700 font-mono font-black">Estimated Cost × 0.02</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Example for PKR 100 Million Highway:</span>
                  <span className="font-bold text-slate-900 font-mono">PKR 2,000,000 (20 Lakh)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: PPRA 2026 Procurement Rules */}
        {activeTab === 'ppra' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e2d8] shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
              Federal PPRA & Provincial Procurement Rules Breakdown
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              All tenders published across TENDER GATE comply with Public Procurement Regulatory Authority (PPRA) standards:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e8e2d8] space-y-3">
                <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-[11px] font-black">
                  Rule 36(a)
                </span>
                <h4 className="text-sm font-bold text-slate-900">Single Stage - One Envelope</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Used for standardized items or low-complexity maintenance works. Both technical proposal and financial bid are submitted together in one sealed envelope.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e8e2d8] space-y-3">
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-black">
                  Rule 36(b)
                </span>
                <h4 className="text-sm font-bold text-slate-900">Single Stage - Two Envelope</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Most common for construction tenders. Technical and Financial bids are sealed in separate envelopes. Financial envelope is only opened for firms that pass technical criteria (min 70% score).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e8e2d8] space-y-3">
                <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 text-[11px] font-black">
                  Rule 36(c)
                </span>
                <h4 className="text-sm font-bold text-slate-900">Two Stage Bidding</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Used for complex EPC and mega-infrastructure projects where specifications are refined interactively with pre-qualified contractors during Stage 1.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
