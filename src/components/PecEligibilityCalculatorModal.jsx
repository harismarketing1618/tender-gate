import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Coins, 
  Users, 
  Compass, 
  FileSpreadsheet 
} from 'lucide-react';
import { PEC_CATEGORIES, PEC_SPECIALIZATION_CODES } from '../data/pakistanMeta';
import { soundFX } from '../services/soundFx';

export default function PecEligibilityCalculatorModal({
  isOpen,
  onClose,
  tenders,
  onOpenTenderDetail
}) {
  const [activeTab, setActiveTab] = useState('match'); // 'match' | 'roadmap'
  const [selectedPec, setSelectedPec] = useState('C-2');
  const [annualTurnoverMln, setAnnualTurnoverMln] = useState(800);
  const [selectedCodes, setSelectedCodes] = useState(['CE01', 'BC01']);
  const [hasCalculated, setHasCalculated] = useState(false);

  if (!isOpen) return null;

  const currentPecObj = PEC_CATEGORIES.find(c => c.code === selectedPec) || PEC_CATEGORIES[3];

  // Calculation Logic
  const directEligibleTenders = tenders.filter(t => {
    const isWithinLimit = currentPecObj.limitValue >= t.estimatedValuePKR;
    const hasMatchingCode = t.pecCodesRequired.some(code => selectedCodes.includes(code));
    return isWithinLimit && hasMatchingCode;
  });

  const jvEligibleTenders = tenders.filter(t => {
    const exceedsLimit = currentPecObj.limitValue < t.estimatedValuePKR;
    const hasMatchingCode = t.pecCodesRequired.some(code => selectedCodes.includes(code));
    return exceedsLimit && hasMatchingCode;
  });

  const handleToggleCode = (code) => {
    soundFX.playPop();
    if (selectedCodes.includes(code)) {
      setSelectedCodes(selectedCodes.filter(c => c !== code));
    } else {
      setSelectedCodes([...selectedCodes, code]);
    }
  };

  const handleRunCheck = (e) => {
    e.preventDefault();
    soundFX.playSuccess();
    setHasCalculated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-[#e6dacb] rounded-3xl shadow-2xl overflow-hidden my-auto animate-fadeIn text-slate-900">
        
        {/* Header */}
        <div className="bg-[#fbf9f5] border-b border-[#ece4d8] p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#f5efe6] text-blue-800 border border-[#e2d5c3] flex items-center justify-center">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 font-['Outfit']">
                PEC Contractor Bid Eligibility & Upgrade Engine
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Check open tender eligibility and view the official PEC upgrade roadmap
              </p>
            </div>
          </div>
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

        {/* Tab Toggle */}
        <div className="bg-white border-b border-[#ece4d8] px-6 flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.playPop();
              setActiveTab('match');
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'match'
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Tender Match Calculator</span>
          </button>

          <button
            onClick={() => {
              soundFX.playPop();
              setActiveTab('roadmap');
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'roadmap'
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>PEC Category Upgrade Roadmap</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {activeTab === 'match' && (
            <>
              <form onSubmit={handleRunCheck} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* PEC Category Select */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Your PEC License Category:
                    </label>
                    <select
                      value={selectedPec}
                      onChange={(e) => setSelectedPec(e.target.value)}
                      className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                    >
                      {PEC_CATEGORIES.map(pec => (
                        <option key={pec.code} value={pec.code}>
                          {pec.code} — Max Limit: {pec.limit}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Annual Turnover Input */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Average Annual Turnover (PKR Millions):
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={annualTurnoverMln}
                        onChange={(e) => setAnnualTurnoverMln(Number(e.target.value))}
                        min="1"
                        className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                        placeholder="e.g. 500"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">M PKR</span>
                    </div>
                  </div>

                </div>

                {/* Specialization Codes Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Your PEC Specialization Codes (Select all that apply):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(PEC_SPECIALIZATION_CODES).map(([code, desc]) => {
                      const isSelected = selectedCodes.includes(code);
                      return (
                        <button
                          type="button"
                          key={code}
                          onClick={() => handleToggleCode(code)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                              : 'bg-[#fbf9f5] text-slate-700 border-[#e6dacb] hover:border-slate-300'
                          }`}
                        >
                          <strong className="font-mono">{code}</strong> - {desc.split(',')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition shadow-md shadow-blue-700/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Calculate Tender Match & Eligibility</span>
                </button>
              </form>

              {/* Results Display */}
              {hasCalculated && (
                <div className="space-y-5 pt-4 border-t border-slate-200 animate-fadeIn">
                  
                  {/* Summary Score Card */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                      <span className="text-xs text-blue-800 block font-bold">100% Direct Match</span>
                      <div className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
                        {directEligibleTenders.length} <span className="text-xs font-bold text-blue-700">Tenders</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium mt-1">You meet both financial limit and PEC code criteria.</p>
                    </div>

                    <div className="bg-[#f5efe6] border border-[#e2d5c3] p-4 rounded-2xl">
                      <span className="text-xs text-[#7a5632] block font-bold">Joint Venture (JV) Match</span>
                      <div className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
                        {jvEligibleTenders.length} <span className="text-xs font-bold text-[#8a6742]">Mega Tenders</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium mt-1">Eligible to participate as JV Partner.</p>
                    </div>
                  </div>

                  {/* Direct Matches List */}
                  {directEligibleTenders.length > 0 && (
                    <div>
                      <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>Tenders You Can Bid Directly:</span>
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {directEligibleTenders.map(tender => (
                          <div 
                            key={tender.id}
                            onClick={() => {
                              onClose();
                              onOpenTenderDetail(tender);
                            }}
                            className="p-3 rounded-xl bg-[#fbf9f5] border border-[#e6dacb] hover:border-blue-500 transition cursor-pointer flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="truncate">
                              <div className="font-extrabold text-slate-900 truncate">{tender.title}</div>
                              <div className="text-slate-500 text-[11px] font-medium">{tender.agency} • {tender.locationFull}</div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-black text-blue-700 block">{tender.formattedValue}</span>
                              <span className="text-[10px] text-blue-700 font-bold">100% Eligible</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4 text-xs animate-fadeIn">
              <div className="bg-[#fbf9f5] p-4 rounded-2xl border border-[#ede5dc]">
                <h4 className="text-sm font-black text-slate-900 mb-1">
                  Pakistan Engineering Council (PEC) Construction Constructor Classes & Criteria
                </h4>
                <p className="text-slate-600">
                  Requirements to upgrade your construction license under the latest PEC Bye-Laws:
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { class: 'C-A', limit: 'No Limit', turnover: 'PKR 6.0+ Billion', engineers: '8 PEs + 15 REs', capital: 'PKR 500 Million Net Worth' },
                  { class: 'C-B', limit: 'PKR 3.0 Billion', turnover: 'PKR 3.0+ Billion', engineers: '5 PEs + 10 REs', capital: 'PKR 250 Million Net Worth' },
                  { class: 'C-1', limit: 'PKR 2.5 Billion', turnover: 'PKR 1.8+ Billion', engineers: '3 PEs + 6 REs', capital: 'PKR 100 Million Net Worth' },
                  { class: 'C-2', limit: 'PKR 1.0 Billion', turnover: 'PKR 800 Million', engineers: '2 PEs + 4 REs', capital: 'PKR 50 Million Net Worth' },
                  { class: 'C-3', limit: 'PKR 500 Million', turnover: 'PKR 350 Million', engineers: '1 PE + 3 REs', capital: 'PKR 25 Million Net Worth' },
                  { class: 'C-4', limit: 'PKR 200 Million', turnover: 'PKR 150 Million', engineers: '1 PE + 2 REs', capital: 'PKR 10 Million Net Worth' },
                  { class: 'C-5', limit: 'PKR 65 Million', turnover: 'PKR 40 Million', engineers: '1 Professional Engineer (PE)', capital: 'PKR 5.0 Million Net Worth' },
                  { class: 'C-6', limit: 'PKR 25 Million', turnover: 'PKR 15 Million', engineers: '1 Registered Engineer (RE)', capital: 'PKR 2.5 Million Net Worth' },
                ].map((item) => (
                  <div key={item.class} className="p-3.5 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-[#f5efe6] text-blue-900 border border-[#e2d5c3] font-black flex items-center justify-center font-['Outfit']">
                        {item.class}
                      </span>
                      <div>
                        <div className="font-extrabold text-slate-900">Bidding Limit: {item.limit}</div>
                        <div className="text-slate-500 text-[11px] font-medium">Turnover: {item.turnover}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded bg-white border border-[#e6dacb] text-[#7a5632] font-bold block mb-0.5">
                        {item.engineers}
                      </span>
                      <span className="text-[10px] text-slate-500">{item.capital}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
