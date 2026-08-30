import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Printer, 
  X, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Coins 
} from 'lucide-react';
import { PEC_SPECIALIZATION_CODES } from '../data/pakistanMeta';
import { soundFX } from '../services/soundFx';

export default function TenderDetailModal({
  tender,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onShareWhatsApp
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'criteria' | 'financial' | 'ai' | 'notice'

  if (!isOpen || !tender) return null;

  const handlePrint = () => {
    soundFX.playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white border border-[#e6dacb] rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto animate-fadeIn text-slate-900">
        
        {/* Header Bar */}
        <div className="bg-[#fbf9f5] border-b border-[#ece4d8] p-4 sm:p-6 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#f5efe6] text-[#7a5632] border border-[#e2d5c3] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{tender.agentName}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded text-xs font-black bg-blue-50 text-blue-900 border border-blue-200">
                PEC: {tender.pecCategory} Required
              </span>

              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-white text-slate-700 border border-[#e6dacb]">
                PPRA: {tender.ppraRef}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit'] leading-snug">
              {tender.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-800 font-medium">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <strong>{tender.agency}</strong>
              </span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {tender.locationFull}
              </span>
              <span className="flex items-center gap-1 text-slate-500 font-mono">
                Ref: {tender.refNo}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              title="Print Dossier / Save as PDF"
              className="p-2 rounded-xl bg-white hover:bg-[#f5efe6] text-slate-600 hover:text-slate-900 border border-[#e6dacb] transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                onClose();
              }}
              className="p-2 rounded-xl bg-white hover:bg-[#f5efe6] text-slate-500 hover:text-slate-900 border border-[#e6dacb] transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-[#ece4d8] px-4 sm:px-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Tender Overview' },
            { id: 'criteria', label: 'PEC & Mandatory Criteria' },
            { id: 'financial', label: 'Financial & 2% CDR' },
            { id: 'ai', label: 'AI Viability & Risk Analysis' },
            { id: 'notice', label: 'Official Paper Notice' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playPop();
                setActiveTab(tab.id);
              }}
              className={`py-3 px-3 sm:px-4 text-xs font-bold shrink-0 border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs space-y-6">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top Financial Highlights Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc]">
                <div>
                  <span className="text-[10px] text-[#8a6742] font-bold uppercase tracking-wider block">Estimated Project Value</span>
                  <span className="text-base font-black text-blue-700 font-['Outfit']">{tender.formattedValue}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8a6742] font-bold uppercase tracking-wider block">2% CDR / Bid Security</span>
                  <span className="text-sm font-bold text-slate-800">{tender.bidSecurityAmount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8a6742] font-bold uppercase tracking-wider block">Submission Deadline</span>
                  <span className="text-sm font-black text-rose-700 font-mono">{new Date(tender.closingDate).toLocaleDateString('en-PK')}</span>
                </div>
              </div>

              {/* Scope of Work */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Scope of Work & Technical Bill of Quantities (BOQ)</span>
                </h4>
                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc] space-y-2">
                  <p className="text-slate-700 leading-relaxed font-normal mb-3">
                    {tender.shortDescription}
                  </p>
                  <ul className="space-y-2 text-slate-700 font-medium">
                    {tender.scopeOfWork.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bidding Method & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc] space-y-1.5">
                  <span className="text-[10px] text-[#8a6742] font-bold uppercase tracking-wider">Procurement Method</span>
                  <p className="text-xs font-bold text-slate-900">{tender.biddingMethod}</p>
                  <p className="text-[11px] text-slate-500">Under Public Procurement Rules 2004 (PPRA)</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc] space-y-1.5">
                  <span className="text-[10px] text-[#8a6742] font-bold uppercase tracking-wider">Tender Document Fee</span>
                  <p className="text-xs font-bold text-slate-900">{tender.tenderFee}</p>
                  <p className="text-[11px] text-slate-500">Payable via Non-Refundable Pay Order / Treasury Challan</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CRITERIA */}
          {activeTab === 'criteria' && (
            <div className="space-y-6">
              {/* Mandatory Checklist */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Mandatory Eligibility & Compliance Checklist</span>
                </h4>
                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc] space-y-2.5">
                  {tender.mandatoryCriteria.map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required PEC Specialization Codes */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8a6742]" />
                  <span>Mandatory PEC Specialization Codes</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tender.pecCodesRequired.map(code => (
                    <div key={code} className="p-3 rounded-xl bg-[#fbf9f5] border border-[#ede5dc]">
                      <div className="font-mono font-black text-blue-700 text-xs mb-0.5">{code}</div>
                      <div className="text-slate-600 text-[11px] font-medium">
                        {PEC_SPECIALIZATION_CODES[code] || 'PEC Specialized Construction Discipline'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: FINANCIAL */}
          {activeTab === 'financial' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc] space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-blue-600" />
                  <span>2% CDR & Bid Guarantee Guidelines</span>
                </h4>
                <p className="text-slate-700">
                  Total Bid Security required: <strong className="text-blue-700 font-bold">{tender.bidSecurityAmount}</strong>.
                </p>
                <div className="p-3 rounded-xl bg-[#f5efe6] border border-[#e2d5c3] text-[11px] text-[#7a5632]">
                  ⚠️ Note: Bids without original 2% Call Deposit Receipt (CDR) in the technical envelope will be declared immediately non-responsive under PPRA rules.
                </div>
              </div>
            </div>
          )}

          {/* TAB: AI ANALYSIS */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/40 via-white to-[#f5efe6]/40 border border-[#e2d5c3] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-black text-slate-900">AI Viability Match Score</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-black bg-blue-100 text-blue-800 border border-blue-300">
                    {tender.aiViabilityScore}% VIABILITY
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {tender.aiViabilityReason}
                </p>
              </div>
            </div>
          )}

          {/* TAB: PAPER NOTICE */}
          {activeTab === 'notice' && (
            <div className="p-6 bg-white text-black font-serif rounded-xl border border-[#d8cdbf] shadow-inner">
              <div className="text-center border-b-2 border-black pb-3 mb-4">
                <h3 className="text-base font-bold uppercase tracking-wider">{tender.agency}</h3>
                <h4 className="text-xs font-bold">INVITATION FOR BIDS (IFB)</h4>
                <p className="text-[10px] font-sans">Tender Notice Ref: {tender.refNo} | PPRA ID: {tender.ppraRef}</p>
              </div>
              <p className="text-xs leading-relaxed mb-4 font-sans">
                Sealed bids based on PPRA Rule 36(b) (Single Stage Two Envelope) are hereby invited from PEC registered constructors having valid PEC License in Category <strong>{tender.pecCategory}</strong> or above with relevant codes: <strong>{tender.pecCodesRequired.join(', ')}</strong> for the execution of the following work:
              </p>
              <div className="border border-black p-3 my-3 text-xs font-sans">
                <div className="font-bold">{tender.title}</div>
                <div>Location: {tender.locationFull}</div>
                <div>Estimated Cost: {tender.formattedValue}</div>
                <div>Bid Security (2% CDR): {tender.bidSecurityAmount}</div>
                <div>Closing Date: {new Date(tender.closingDate).toLocaleString('en-PK')}</div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#fbf9f5] border-t border-[#ece4d8] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playBookmark();
                onToggleSave(tender);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-[#f5efe6] text-[#7a5632] border-[#e2d5c3]'
                  : 'bg-white text-slate-700 hover:text-slate-900 border-[#e6dacb]'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#8a6742]" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'In Watchlist' : 'Save Tender'}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                onShareWhatsApp(tender);
              }}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-[#e6dacb] text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share WhatsApp</span>
            </button>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition cursor-pointer shadow-xs"
          >
            Done & Close
          </button>
        </div>

      </div>
    </div>
  );
}
