import React, { useState } from 'react';
import { 
  PlusCircle, 
  Bot, 
  Sparkles, 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Upload 
} from 'lucide-react';
import { PEC_CATEGORIES, PROVINCES_AND_REGIONS, MAJOR_PROCURING_AGENCIES } from '../data/pakistanMeta';
import { soundFX } from '../services/soundFx';

export default function TenderSubmissionModal({
  isOpen,
  onClose,
  agents,
  onSubmitNewTender
}) {
  const [title, setTitle] = useState('');
  const [agency, setAgency] = useState('National Highway Authority (NHA)');
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Lahore');
  const [estimatedValuePKR, setEstimatedValuePKR] = useState(50000000);
  const [pecCategory, setPecCategory] = useState('C-3');
  const [closingDate, setClosingDate] = useState('2026-09-20T11:00');
  const [rawAdText, setRawAdText] = useState('');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [assignedAgent, setAssignedAgent] = useState(agents[0]);

  if (!isOpen) return null;

  // Handle AI Auto-Parsing from pasted text
  const handleAiAutoFill = () => {
    if (!rawAdText.trim()) return;
    soundFX.playPop();
    setIsAiAnalyzing(true);

    setTimeout(() => {
      const text = rawAdText.toLowerCase();
      
      // Auto classify agent
      let targetAgent = agents[0];
      if (text.includes('road') || text.includes('highway') || text.includes('bridge') || text.includes('asphalt') || text.includes('flyover')) {
        targetAgent = agents[0]; // Sheer-Khan
      } else if (text.includes('building') || text.includes('plaza') || text.includes('hospital') || text.includes('tower') || text.includes('floor')) {
        targetAgent = agents[1]; // Memar-AI
      } else if (text.includes('grid') || text.includes('substation') || text.includes('hvac') || text.includes('mep') || text.includes('electrical')) {
        targetAgent = agents[2]; // Barq-Engine
      } else if (text.includes('dam') || text.includes('water') || text.includes('canal') || text.includes('drainage') || text.includes('sewerage')) {
        targetAgent = agents[3]; // Aab-o-Zameen
      } else if (text.includes('pipeline') || text.includes('gas') || text.includes('solar') || text.includes('petroleum')) {
        targetAgent = agents[4]; // Tawanai-X
      } else if (text.includes('mes') || text.includes('defense') || text.includes('cantonment') || text.includes('dha')) {
        targetAgent = agents[5]; // Qila-Defense
      } else if (text.includes('fitout') || text.includes('interior') || text.includes('acoustic') || text.includes('glazing')) {
        targetAgent = agents[6]; // Funkaar-Design
      } else {
        targetAgent = agents[7]; // Baldia-Direct
      }

      setAssignedAgent(targetAgent);
      setTitle(rawAdText.slice(0, 85) + '...');
      soundFX.playSuccess();
      setIsAiAnalyzing(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const formattedBudget = estimatedValuePKR >= 1000000000
      ? `PKR ${(estimatedValuePKR / 1000000000).toFixed(2)} Billion (${(estimatedValuePKR / 10000000).toFixed(0)} Crore)`
      : `PKR ${(estimatedValuePKR / 1000000).toFixed(1)} Million (${(estimatedValuePKR / 10000000).toFixed(1)} Crore)`;

    const newTender = {
      id: `TND-USER-${Date.now()}`,
      refNo: `PUB/${province.slice(0,2).toUpperCase()}/2026/${Math.floor(Math.random() * 900) + 100}`,
      ppraRef: `PPRA-US-${Math.floor(Math.random() * 90000) + 10000}`,
      title,
      shortDescription: rawAdText || `Procurement of works for ${title} under standard PPRA rules.`,
      category: assignedAgent.category,
      agentId: assignedAgent.id,
      agentName: assignedAgent.name,
      agency,
      agencyCode: agency.split('(')[1]?.replace(')', '') || 'DEPT',
      province,
      city,
      locationFull: `${city}, ${province}`,
      estimatedValuePKR: Number(estimatedValuePKR),
      formattedValue: formattedBudget,
      pecCategory,
      pecCodesRequired: assignedAgent.pecCodes,
      bidSecurityAmount: `PKR ${(estimatedValuePKR * 0.02).toLocaleString()} (2% CDR)`,
      biddingMethod: 'Single Stage Two Envelope (PPRA Rule 36-b)',
      tenderFee: 'PKR 10,000',
      postedDate: new Date().toISOString().split('T')[0],
      closingDate: new Date(closingDate).toISOString(),
      preBidMeetingDate: 'To be notified by Procuring Agency',
      scopeOfWork: [
        'Complete execution according to approved engineering drawings and BOQ specs',
        'Provision of standard testing and quality control certifications',
        'Compliance with environmental and traffic management mitigation plans'
      ],
      mandatoryCriteria: [
        `Valid PEC Registration in Category ${pecCategory} with active code ${assignedAgent.pecCodes[0]}`,
        'Active Taxpayer List (ATL) verified with FBR and relevant Provincial Revenue Authority',
        '2% Call Deposit Receipt (CDR) Bank Guarantee from any Scheduled Bank of Pakistan',
        'Affidavit on Stamp Paper affirming no litigation, blacklisting or abandonment'
      ],
      aiViabilityScore: 94,
      aiViabilityReason: 'Direct user-verified tender. High clarity on PEC criteria and straightforward scope.',
      newspaperNotice: {
        paperName: 'Daily Jang / Dawn Express',
        publishDate: new Date().toISOString().split('T')[0],
        pidNumber: `PID(I) ${Math.floor(Math.random() * 5000) + 1000}/26`
      }
    };

    onSubmitNewTender(newTender);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#e6dacb] rounded-3xl shadow-2xl overflow-hidden my-auto animate-fadeIn text-slate-900">
        
        {/* Header */}
        <div className="bg-[#fbf9f5] border-b border-[#ece4d8] p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#f5efe6] text-blue-800 border border-[#e2d5c3] flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 font-['Outfit']">
                Post Construction Tender Notice
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Publish a government or private construction tender with AI auto-classification
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
          
          {/* AI Auto Fill Box */}
          <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c3] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#7a5632] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>AI Fast Ingestion (Paste Raw Newspaper Ad):</span>
              </span>
              <button
                type="button"
                onClick={handleAiAutoFill}
                disabled={isAiAnalyzing}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition cursor-pointer"
              >
                {isAiAnalyzing ? 'Analyzing...' : 'Auto-Classify'}
              </button>
            </div>
            <textarea
              rows="3"
              value={rawAdText}
              onChange={(e) => setRawAdText(e.target.value)}
              placeholder="Paste raw tender advertisement text from newspaper or PPRA notice here..."
              className="w-full bg-white border border-[#e6dacb] rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            ></textarea>
          </div>

          {/* Assigned Agent */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#fbf9f5] border border-[#ede5dc]">
            <span className="text-slate-600 font-medium">Assigned AI Agent:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f5efe6] text-[#7a5632] border border-[#e2d5c3] font-bold">
              {assignedAgent.avatar} {assignedAgent.name} ({assignedAgent.shortCategory})
            </span>
          </div>

          {/* Tender Title */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Tender Title / Subject of Work:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Construction of Dual Carriageway Interchange at M-2 Motorway..."
              className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          {/* Agency & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Procuring Agency:</label>
              <select
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                {MAJOR_PROCURING_AGENCIES.filter(a => a.id !== 'all').map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Province / Region:</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                {PROVINCES_AND_REGIONS.filter(p => p.id !== 'all').map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">City / District:</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Rawalpindi"
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Budget & PEC Class */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimated Value (PKR):</label>
              <input
                type="number"
                required
                min="100000"
                value={estimatedValuePKR}
                onChange={(e) => setEstimatedValuePKR(Number(e.target.value))}
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">PEC Minimum Class:</label>
              <select
                value={pecCategory}
                onChange={(e) => setPecCategory(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                {PEC_CATEGORIES.map(pec => (
                  <option key={pec.code} value={pec.code}>PEC {pec.code}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Submission Deadline:</label>
              <input
                type="datetime-local"
                required
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                soundFX.playPop();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl bg-[#f5efe6] hover:bg-[#ede3d5] text-[#7a5632] font-bold transition cursor-pointer border border-[#e2d5c3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black transition cursor-pointer shadow-md shadow-blue-700/20"
            >
              Publish Tender Live
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
