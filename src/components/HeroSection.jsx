import React, { useRef } from 'react';
import { 
  Search, 
  Bot, 
  Play, 
  Building, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  FileSpreadsheet,
  ArrowRight,
  SlidersHorizontal,
  ExternalLink,
  Zap,
  Box,
  Compass
} from 'lucide-react';
import { soundFX } from '../services/soundFx';
import Hero3DCanvas from './Hero3DCanvas';
import Hero3DStage from './Hero3DStage';
import Hero3DMegaTenders from './Hero3DMegaTenders';

export default function HeroSection({
  totalTendersCount,
  totalValueBillion,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onRunAllAgents,
  isCrawlerRunning,
  onOpenCrawlerModal,
  onOpenPecCalculator,
  matchingTendersCount = 0,
  tenders = [],
  onSelectTender,
  onSaveTender,
  savedTenderIds = []
}) {
  const searchInputRef = useRef(null);

  const quickCategories = [
    { label: 'All Disciplines', value: 'all' },
    { label: '🏗️ Mega Highways (NHA)', value: 'Civil Infrastructure & Mega Highways' },
    { label: '🏢 High-Rise Towers (IDAP/CDA)', value: 'High-Rise & Commercial Buildings' },
    { label: '⚡ MEP & Grid Stations', value: 'Electromechanical, MEP & HVAC' },
    { label: '💧 Dams & Water (WAPDA)', value: 'Hydraulic, Dams, Irrigation & Public Health (PHE)' },
    { label: '🛡️ Defense & MES Works', value: 'Defense, Cantonment & High-Security Works' },
    { label: '🛠️ Municipal C5/C6 Works', value: 'Small-to-Medium Municipal Works & Maintenance (PEC C5/C6)' },
  ];

  const suggestedKeywords = [
    'NHA Highway', 'IDAP Hospital', '132kV Grid Station', 'WAPDA Dam', 'SNGPL Pipeline', 'MES Defense', 'PEC C-1', 'Lahore', 'Karachi', 'Gwadar'
  ];

  const scrollToFeed = () => {
    soundFX.playPop();
    const feedElement = document.getElementById('tenders-feed');
    if (feedElement) {
      feedElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 750, behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    scrollToFeed();
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f8f4ed] via-white to-[#faf8f5] border-b border-[#e8e2d8] pt-8 pb-14 sm:pt-12 sm:pb-18 text-slate-900">
      
      {/* 3D Background Canvas (Interactive Constellation & 3D Topographic Blueprint) */}
      <Hero3DCanvas mode="blueprint" />

      {/* Atmospheric Ambient Glows (Orange Upper Glow & Maroon Lower Glow) */}
      <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-[#780016]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#e5ded4_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5efe6] border border-[#e2d5c3] text-[#7a5632] text-xs font-black shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Pakistan's 1st Autonomous 3D Construction Tenders Intelligence</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#e8e2d8] text-slate-800 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>PPRA EPADS & PEC 2026 Compliant</span>
          </div>
        </div>

        {/* Main 3D Title Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight font-['Outfit'] leading-tight">
            Every Pakistan Construction Tender.{' '}
            <span className="block mt-1 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Crawled, Classified & Projected in 3D.
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            8 autonomous AI agent bots continuously scan Federal PPRA, Punjab, Sindh, KPK, NHA, WAPDA, and MES. Filter instantly by PEC Category (C-A to C-6), 2% CDR earnest money calculations, and live bidding deadlines.
          </p>
        </div>

        {/* 3D Search & Exploration Command Box */}
        <div className="max-w-2xl mx-auto mb-6">
          <form 
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white/95 backdrop-blur-md border-2 border-blue-500/40 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/20 rounded-2xl p-1.5 shadow-2xl shadow-blue-900/10 transition"
          >
            <div className="pl-3.5 text-slate-400">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tender title, PPRA ID, agency (NHA, MES, CDA), city, or PEC code..."
              className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            
            {searchQuery && (
              <button 
                type="button"
                onClick={() => {
                  soundFX.playPop();
                  setSearchQuery('');
                  if (searchInputRef.current) searchInputRef.current.focus();
                }}
                className="px-2.5 text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition shadow-md cursor-pointer shrink-0"
            >
              <span>Search Tenders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Search Chips & Live Match Counter */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="font-bold text-slate-700">Popular:</span>
              <div className="flex flex-wrap gap-1">
                {suggestedKeywords.slice(0, 5).map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => {
                      soundFX.playPop();
                      setSearchQuery(kw);
                      scrollToFeed();
                    }}
                    className="px-2.5 py-0.5 rounded-lg bg-white/90 text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-[#e8e2d8] text-[11px] font-semibold transition cursor-pointer shadow-2xs"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {searchQuery.trim() !== '' && (
              <button
                type="button"
                onClick={scrollToFeed}
                className="text-[11px] font-black text-blue-700 hover:underline flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200"
              >
                <span>Found {matchingTendersCount} matching tenders</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Category Filter Bar */}
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1">
              Discipline:
            </span>
            {quickCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedCategory(cat.value);
                  scrollToFeed();
                }}
                className={`px-3 py-1 rounded-xl shrink-0 font-bold transition cursor-pointer text-[11px] ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white/90 text-slate-700 hover:text-blue-900 hover:bg-[#f5efe6] border border-[#e8e2d8] shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= 3D INTERACTIVE HERO STAGE ================= */}
        <Hero3DStage 
          tenders={tenders}
          onSelectTender={onSelectTender}
          onOpenPecCalculator={onOpenPecCalculator} 
          onRunAllAgents={onRunAllAgents} 
          isCrawlerRunning={isCrawlerRunning} 
        />

        {/* ================= 3D LATEST MEGA TENDERS SHOWCASE ================= */}
        <Hero3DMegaTenders
          tenders={tenders}
          onSelectTender={onSelectTender}
          onOpenPecCalculator={onOpenPecCalculator}
          onSaveTender={onSaveTender}
          savedTenderIds={savedTenderIds}
        />

        {/* 3D Elevated Metric Cubes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mt-6">
          
          <div className="group bg-white/90 backdrop-blur-md border border-[#e8e2d8] hover:border-blue-400 rounded-3xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
              <Bot className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
              <span>Autonomous Agents</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              8 <span className="text-xs font-bold text-blue-600">Online 24/7</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">Auto-scrapes all 4 provinces</div>
          </div>

          <div className="group bg-white/90 backdrop-blur-md border border-[#e8e2d8] hover:border-[#8a6742] rounded-3xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
              <FileSpreadsheet className="w-4 h-4 text-[#8a6742] group-hover:scale-110 transition-transform" />
              <span>Verified Tenders</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              {totalTendersCount} <span className="text-xs font-bold text-[#8a6742]">Available</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">Updated every 2 hours</div>
          </div>

          <div className="group bg-white/90 backdrop-blur-md border border-[#e8e2d8] hover:border-blue-400 rounded-3xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span>Pipeline Value</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 font-['Outfit']">
              PKR {totalValueBillion} <span className="text-xs font-bold text-blue-900">Billion</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">Across CPEC & National tenders</div>
          </div>

          <div className="group bg-white/90 backdrop-blur-md border border-[#e8e2d8] hover:border-[#8a6742] rounded-3xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
              <MapPin className="w-4 h-4 text-[#8a6742] group-hover:bounce transition-transform" />
              <span>Portals Monitored</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              24+ <span className="text-xs font-bold text-[#8a6742]">Govt Portals</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">Federal, NHA, WAPDA & MES</div>
          </div>

        </div>

        {/* 3D Action Command Deck */}
        <div className="mt-8 max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-[#e2d5c3] shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#f5efe6] border border-[#e2d5c3] flex items-center justify-center text-blue-600 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">
                Synchronized 8-Agent Crawl Command
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Trigger all 8 autonomous bots to simultaneously scrape and index live procurement docs across Pakistan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                soundFX.playSuccess();
                onRunAllAgents();
              }}
              disabled={isCrawlerRunning}
              className={`px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition cursor-pointer shadow-md ${
                isCrawlerRunning
                  ? 'bg-blue-700 text-white animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25 hover:shadow-lg'
              }`}
            >
              {isCrawlerRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>8 Agents Crawling...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run 8-Agent Crawl Now</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                onOpenPecCalculator();
              }}
              className="px-4 py-3 rounded-2xl bg-[#f5efe6] hover:bg-[#ede3d5] text-[#7a5632] border border-[#e2d5c3] text-xs font-black transition cursor-pointer shadow-2xs"
            >
              PEC Checker
            </button>
          </div>
        </div>

        {/* Connected Gateways */}
        <div className="mt-10 pt-8 border-t border-[#e8e2d8] text-center">
          <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3.5">
            Real-Time Automated Data Feed From Official Gateways:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
            {['Federal PPRA (EPADS)', 'National Highway Authority (NHA)', 'Punjab PPRA', 'Sindh SPPRA', 'KPK KPPRA', 'WAPDA Hydro', 'IDAP Punjab', 'Military Engineer Services (MES)', 'CDA Islamabad', 'K-Electric'].map((g, i) => (
              <span 
                key={i} 
                className="px-3.5 py-1.5 rounded-xl bg-white/90 border border-[#e2d5c3] text-[11px] font-bold text-slate-700 shadow-2xs hover:border-blue-400 hover:text-blue-900 transition"
              >
                🏛️ {g}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
