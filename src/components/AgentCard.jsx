import React from 'react';
import { 
  Bot, 
  Play, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import { soundFX } from '../services/soundFx';

export default function AgentCard({ 
  agent, 
  onTriggerScrape, 
  onFilterByCategory, 
  isScraping,
  isSelected
}) {
  return (
    <div className={`relative rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md ${
      isSelected 
        ? 'border-blue-600 ring-2 ring-blue-500/20' 
        : 'border-[#e6dacb] hover:border-blue-400'
    }`}>
      {/* Top Accent Bar with Agent Specific Color */}
      <div 
        className="h-1.5 w-full"
        style={{ backgroundColor: agent.accentColor || '#2563eb' }}
      ></div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Avatar, Name, Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#f5efe6] border border-[#e2d5c3] flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition">
              {agent.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">
                  {agent.name}
                </h3>
              </div>
              <p className="text-[11px] text-blue-600 font-bold leading-tight">
                {agent.subTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              {agent.status}
            </span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">{agent.lastScrapeTime}</span>
          </div>
        </div>

        {/* Category & Description */}
        <div className="mb-3">
          <span className="inline-block text-xs font-bold text-slate-800 mb-1">
            {agent.category}
          </span>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
            {agent.description}
          </p>
        </div>

        {/* PEC Code Badges */}
        <div className="mb-3.5 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            PEC Target:
          </span>
          {agent.pecFocus.map((pec, idx) => (
            <span 
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#f5efe6] text-[#7a5632] border border-[#e2d5c3]"
            >
              {pec}
            </span>
          ))}
          {agent.pecCodes.map((code, idx) => (
            <span 
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200 font-mono"
            >
              {code}
            </span>
          ))}
        </div>

        {/* Primary Portals Scraped */}
        <div className="mb-4 bg-[#fbf9f5] p-2.5 rounded-2xl border border-[#ede5dc] text-[11px]">
          <div className="text-[10px] font-bold text-[#8a6742] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#8a6742]" />
            <span>Target Portals:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {agent.primaryPortals.map((portal, idx) => (
              <span key={idx} className="text-slate-700 bg-white px-2 py-0.5 rounded text-[10px] font-medium border border-[#e6dacb] shadow-2xs">
                {portal}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-slate-100 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Tenders Today</span>
            <span className="text-sm font-black text-slate-900">{agent.indexedToday} items</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">AI Accuracy</span>
            <span className="text-sm font-black text-blue-600">{agent.accuracyRating}%</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-[#fbf9f5] p-3 border-t border-[#ede5dc] flex items-center justify-between gap-2">
        <button
          onClick={() => {
            soundFX.playPop();
            onFilterByCategory(agent.category);
          }}
          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-[#f5efe6] text-slate-800 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer border border-[#e6dacb] shadow-2xs"
        >
          <Search className="w-3.5 h-3.5 text-blue-600" />
          <span>View Tenders</span>
        </button>

        <button
          onClick={() => {
            soundFX.playRadarPing();
            onTriggerScrape(agent);
          }}
          disabled={isScraping}
          title="Run web crawl for this specific agent now"
          className="py-2 px-3.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer border border-blue-200"
        >
          {isScraping ? (
            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Play className="w-3 h-3 fill-current" />
          )}
          <span>Scrape</span>
        </button>
      </div>
    </div>
  );
}
