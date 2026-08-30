import React, { useState } from 'react';
import { 
  Bot, 
  Play, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  Info 
} from 'lucide-react';
import AgentCard from './AgentCard';
import { soundFX } from '../services/soundFx';

export default function AgentHub({
  agents,
  onTriggerAgentScrape,
  onTriggerAllAgents,
  onSelectCategory,
  selectedCategory,
  activeScrapingAgentId,
  isAllScraping,
  onOpenTerminalModal
}) {
  const [showArchModal, setShowArchModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#f5efe6] text-blue-700 border border-[#e2d5c3] flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-xs font-black text-[#8a6742] tracking-wider uppercase">
              8 Autonomous Construction Intelligence Agents
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
            Specialized Pakistan Construction Category Agents
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl font-medium">
            Each agent represents a distinct Pakistani construction discipline, crawling relevant government and private portals 24/7 to index, classify, and extract tender notices.
          </p>
        </div>

        {/* Master Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              soundFX.playPop();
              setShowArchModal(!showArchModal);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#f5efe6] text-slate-700 border border-[#e6dacb] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>How Agents Work</span>
          </button>

          <button
            onClick={() => {
              soundFX.playPop();
              onOpenTerminalModal();
            }}
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#f5efe6] text-slate-700 border border-[#e6dacb] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <Terminal className="w-3.5 h-3.5 text-[#8a6742]" />
            <span>Live Terminal Stream</span>
          </button>

          <button
            onClick={() => {
              soundFX.playSuccess();
              onTriggerAllAgents();
            }}
            disabled={isAllScraping}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer ${
              isAllScraping 
                ? 'bg-blue-800 text-white animate-pulse' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-700/20'
            }`}
          >
            {isAllScraping ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running 8 Agents...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Crawl All 8 Agents</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Architecture Box (Expandable) */}
      {showArchModal && (
        <div className="mb-8 p-5 rounded-3xl bg-[#fbf9f5] border border-[#ece4d8] shadow-md animate-fadeIn">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                How TENDER GATE's 8 Autonomous Agents Crawl & Parse Daily Tenders:
              </h3>
            </div>
            <button 
              onClick={() => setShowArchModal(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-slate-700">
            <div className="bg-white p-3.5 rounded-2xl border border-[#e6dacb] shadow-2xs">
              <div className="font-bold text-blue-600 mb-1">1. Portal Scraping</div>
              <p className="text-slate-600">Bots poll Federal PPRA, Punjab, Sindh, KPK, NHA, MES, WAPDA, and SNGPL every 2-4 hours.</p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#e6dacb] shadow-2xs">
              <div className="font-bold text-[#8a6742] mb-1">2. OCR & PDF Parsing</div>
              <p className="text-slate-600">Extracts tender advertisements, BOQ summaries, 2% CDR Bank Guarantee amounts, and closing deadlines.</p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#e6dacb] shadow-2xs">
              <div className="font-bold text-blue-600 mb-1">3. PEC Classification</div>
              <p className="text-slate-600">Matches requirements to official PEC codes (CE01, BC01, EE01, ME06, etc.) and contractor limits (C-A to C-6).</p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#e6dacb] shadow-2xs">
              <div className="font-bold text-[#8a6742] mb-1">4. Live Feed & Alerts</div>
              <p className="text-slate-600">Publishes validated tenders directly to this marketplace and dispatches WhatsApp alerts to subscribers.</p>
            </div>
          </div>
        </div>
      )}

      {/* 8 Agent Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onTriggerScrape={onTriggerAgentScrape}
            onFilterByCategory={onSelectCategory}
            isScraping={activeScrapingAgentId === agent.id || isAllScraping}
            isSelected={selectedCategory === agent.category}
          />
        ))}
      </div>
    </div>
  );
}
