import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Sparkles,
  Award,
  Globe,
  Database,
  Users
} from 'lucide-react';
import { soundFX } from '../services/soundFx';

export default function AboutAndFaq({ onOpenSponsorship, onOpenSubmitModal }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: 'How does TENDER GATE discover tenders in real-time?',
      a: 'We operate 8 autonomous AI scraping & NLP agents that query over 24 official federal and provincial e-procurement portals (Federal PPRA, Punjab PPRA, Sindh PPRA, KPK KPPRA, NHA, WAPDA, IDAP, CDA, FWO, MES) on an automated schedule. Each tender is parsed for PEC category, CDR amount, BOQ scopes, and closing deadlines.'
    },
    {
      q: 'Is TENDER GATE affiliated with government agencies or PEC?',
      a: 'TENDER GATE is an independent construction intelligence platform. All public procurement notices indexed on our platform are strictly aggregated from publicly available, official PPRA and gazette notices in accordance with Pakistan Right of Access to Information Act 2017. We do not alter any government bidding conditions.'
    },
    {
      q: 'How does the PEC Eligibility matching work?',
      a: 'The Pakistan Engineering Council assigns Constructor/Operator licenses from C-A (Unlimited) down to C-6 (up to 25 Million PKR), along with specialized engineering codes (CE-01 for Roads, CE-02 for Bridges, EE-04 for Grid Stations, ME-01 for HVAC, etc.). Our AI parses tender requirements and compares them with your firm’s licensed limits to ensure 100% compliance before you invest time in bid preparation.'
    },
    {
      q: 'How do I set up daily WhatsApp or Email alerts for new tenders?',
      a: 'Click on the "Alerts" button in the top navigation or on any tender card. Select your preferred communication channel (WhatsApp or Email), pick the specific provinces and PEC categories you operate in, and you will automatically receive curated daily summaries when matching tenders are published.'
    },
    {
      q: 'Can government procuring agencies or private developers post tenders here?',
      a: 'Yes! Authorized procuring officers and private construction clients can use the "Post Tender" button in the navigation bar to submit verified tenders directly to our directory, reaching tens of thousands of registered Pakistani contractors and engineering firms.'
    },
    {
      q: 'How are Call Deposit Receipts (CDR) and Bid Security amounts computed?',
      a: 'According to PPRA Rule 25, bid security is typically 2% (up to 5% in specialized cases) of the estimated engineering cost. Our system calculates this automatically based on the estimated value provided in the tender notice.'
    }
  ];

  const toggleFaq = (index) => {
    soundFX.playPop();
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const gateways = [
    { name: 'Federal PPRA', domain: 'ppra.org.pk', badge: 'National' },
    { name: 'Punjab PPRA (EPADS)', domain: 'ppra.punjab.gov.pk', badge: 'Provincial' },
    { name: 'Sindh SPPRA', domain: 'ppms.pprasindh.gov.pk', badge: 'Provincial' },
    { name: 'KPK KPPRA', domain: 'kppra.gov.pk', badge: 'Provincial' },
    { name: 'National Highway Authority (NHA)', domain: 'nha.gov.pk', badge: 'Highways' },
    { name: 'WAPDA Water & Power', domain: 'wapda.gov.pk', badge: 'Dams & Energy' },
    { name: 'IDAP Punjab Infrastructure', domain: 'idap.pk', badge: 'Healthcare & High-Rise' },
    { name: 'Military Engineer Services (MES)', domain: 'mes.gov.pk', badge: 'Defense Works' },
    { name: 'Capital Development Authority (CDA)', domain: 'cda.gov.pk', badge: 'Islamabad' },
    { name: 'K-Electric Limited', domain: 'ke.com.pk', badge: 'Power Grid' },
  ];

  return (
    <div className="bg-[#faf8f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5efe6] border border-[#e2d5c3] text-[#7a5632] text-xs font-extrabold mb-4">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Official Platform Overview & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Outfit']">
            About TENDER GATE Web Platform
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Empowering Pakistani constructors, engineering firms, suppliers, and procurement officials with transparent, AI-driven public procurement intelligence.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e2d8] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-700 flex items-center justify-center font-bold">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Complete Procurement Transparency
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              We eliminate information asymmetry by indexing 100% of publicly announced civil and MEP tenders across Pakistan's 4 provinces and federal agencies in one unified directory.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e2d8] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              PEC & PPRA Compliance First
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Every tender undergoes automated verification to detect mandatory PEC categories (C-A to C-6), 2% CDR values, JV regulations, and closing deadlines down to the exact minute.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e2d8] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Contractor & Vendor Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Connecting general contractors, sub-contractors, heavy machinery rentals, cement/steel manufacturers, and testing laboratories across Pakistan.
            </p>
          </div>
        </div>

        {/* Connected Government Gateways */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e2d8] shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
              Connected Official Procurement Gateways
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Official e-procurement portals tracked by our 8 autonomous bots daily:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            {gateways.map((g) => (
              <div 
                key={g.name} 
                className="p-3.5 rounded-2xl bg-[#faf8f5] border border-[#e8e2d8] text-center hover:border-blue-300 hover:bg-blue-50/50 transition group"
              >
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 inline-block mb-1.5">
                  {g.badge}
                </span>
                <p className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-700">
                  {g.name}
                </p>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                  {g.domain}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5efe6] text-[#7a5632] text-xs font-bold mb-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Contractor Questions & Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Find fast answers regarding public procurement rules, tender submissions, and alerts.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-[#e8e2d8] overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:bg-[#faf8f5] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-[#f0eae1] bg-[#faf8f5]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Support Channels */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-lg">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              Procurement & Partner Inquiries
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] text-white">
              Need custom enterprise tender feeds or have questions?
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Our engineering team supports automated API feeds, WhatsApp bulk notifications for contractor associations, and category sponsorships.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { soundFX.playPop(); onOpenSponsorship(); }}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sponsor / Partner Inquiries</span>
            </button>
            <button
              onClick={() => { soundFX.playPop(); onOpenSubmitModal(); }}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition cursor-pointer"
            >
              Post a Tender Notice
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
