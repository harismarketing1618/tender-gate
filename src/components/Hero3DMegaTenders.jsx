import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Coins, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  TrendingUp, 
  Maximize2,
  Calendar,
  Layers,
  Flame,
  Award,
  Download,
  Globe
} from 'lucide-react';
import { soundFX } from '../services/soundFx';
import { downloadTenderPDF } from '../services/tenderDownloader';

export default function Hero3DMegaTenders({ 
  tenders = [], 
  onSelectTender, 
  onOpenPecCalculator,
  onSaveTender,
  savedTenderIds = []
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isPaused, setIsPaused] = useState(false);

  // Filter for mega projects (> PKR 1.0 Billion or featured)
  const megaTenders = (tenders && tenders.length > 0 ? tenders : [])
    .filter(t => (t.estimatedValuePKR && t.estimatedValuePKR >= 1000000000) || t.isFeatured || t.pecCategory === 'C-A' || t.pecCategory === 'C-1')
    .sort((a, b) => (b.estimatedValuePKR || 0) - (a.estimatedValuePKR || 0));

  const filteredMegaTenders = filterCategory === 'all' 
    ? megaTenders 
    : megaTenders.filter(t => t.category.toLowerCase().includes(filterCategory.toLowerCase()) || t.agencyCode?.toLowerCase() === filterCategory.toLowerCase());

  const activeTenders = filteredMegaTenders.length > 0 ? filteredMegaTenders : megaTenders;

  // Auto slide
  useEffect(() => {
    if (isPaused || activeTenders.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeTenders.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, activeTenders.length]);

  const handlePrev = () => {
    soundFX.playPop();
    setCurrentIndex(prev => (prev - 1 + activeTenders.length) % activeTenders.length);
  };

  const handleNext = () => {
    soundFX.playPop();
    setCurrentIndex(prev => (prev + 1) % activeTenders.length);
  };

  const calculateDaysLeft = (dateString) => {
    if (!dateString) return 'Closing Soon';
    const diff = new Date(dateString) - new Date();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days <= 0 && hours <= 0) return 'Bid Closing Today';
    if (days <= 0) return `${hours}h remaining`;
    return `${days}d ${hours}h remaining`;
  };

  if (activeTenders.length === 0) return null;

  const currentTender = activeTenders[currentIndex % activeTenders.length];
  const isCurrentSaved = currentTender && savedTenderIds?.includes(currentTender.id);

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto my-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Mega Header Bar (Maroon Theme) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 sm:px-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6b0f1a] to-[#991b2b] flex items-center justify-center text-white shadow-md shadow-rose-950/25">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-[#580b18] font-['Outfit'] uppercase tracking-tight">
                Latest 3D Mega Tenders Showcase
              </h3>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#fbf0f2] text-[#780016] border border-[#f0cdd4]">
                PKR 1.0B+ Pipeline
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              High-value Pakistan infrastructure & procurement tenders (PEC C-A & C-1)
            </p>
          </div>
        </div>

        {/* Category Pills (Maroon Theme) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Mega' },
            { id: 'highways', label: '🛣️ NHA Highways' },
            { id: 'buildings', label: '🏢 IDAP Hospitals' },
            { id: 'hydraulic', label: '💧 WAPDA Dams' },
            { id: 'mep', label: '⚡ NTDC Energy' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                soundFX.playPop();
                setFilterCategory(cat.id);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition cursor-pointer shrink-0 ${
                filterCategory === cat.id
                  ? 'bg-[#780016] text-white shadow-md shadow-[#780016]/25'
                  : 'bg-white/95 text-slate-700 hover:text-[#780016] hover:bg-[#fbf0f2] border border-[#ecd5d9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Stage Card Viewport (Maroon Accent Border & Depth) */}
      <div className="relative perspective-1000">
        
        {/* Main 3D Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#fffbfc] via-white to-[#fdf5f7] backdrop-blur-md border-2 border-[#ecd5d9] hover:border-[#780016] shadow-[0_20px_50px_rgba(120,0,22,0.12)] p-5 sm:p-7 transition-all duration-500 preserve-3d overflow-hidden">
          
          {/* Subtle Ambient Blueprint Grid */}
          <div className="absolute inset-0 isometric-grid-bg opacity-25 pointer-events-none"></div>

          {/* Top Banner inside Card (Maroon Header Elements) */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-[#ecd5d9]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#780016] via-[#8c001a] to-[#5a0012] text-white shadow-sm flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>PEC License: {currentTender.pecCategory} Required</span>
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fbf0f2] text-[#780016] border border-[#f0cdd4] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#780016]" />
                <span>{currentTender.agency}</span>
              </span>

              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white text-slate-700 border border-[#ecd5d9]">
                PPRA ID: {currentTender.ppraRef}
              </span>
            </div>

            {/* Live Countdown & Viability Score */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#fbf0f2] border border-[#f0cdd4] text-[#780016] text-xs font-bold font-mono">
                <Clock className="w-3.5 h-3.5 text-[#780016] animate-pulse" />
                <span>{calculateDaysLeft(currentTender.closingDate)}</span>
              </div>

              {currentTender.aiViabilityScore && (
                <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{currentTender.aiViabilityScore}% AI Viable</span>
                </div>
              )}
            </div>
          </div>

          {/* Middle Body: Title, Value, Location & Details */}
          <div className="relative z-10 my-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Project Info & Value Hero */}
            <div className="lg:col-span-8 space-y-3">
              <h2 
                onClick={() => {
                  soundFX.playPop();
                  if (onSelectTender) onSelectTender(currentTender);
                }}
                className="text-xl sm:text-2xl font-black text-slate-950 font-['Outfit'] leading-snug hover:text-[#780016] transition cursor-pointer"
              >
                {currentTender.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                {currentTender.shortDescription}
              </p>

              {/* Location & Bidding Method */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1 text-slate-800 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>{currentTender.locationFull}</span>
                </span>
                <span className="flex items-center gap-1 text-slate-500 font-mono">
                  Ref: {currentTender.refNo}
                </span>
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  Method: <strong>{currentTender.biddingMethod?.split('(')[0] || 'Single Stage Two Envelope'}</strong>
                </span>
              </div>
            </div>

            {/* Right: 3D Financial & CDR Matrix Block (Maroon Shading) */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-gradient-to-br from-[#fcf2f4] via-[#faf0f2] to-[#f7e6ea] border border-[#ecd5d9] shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#780016]/80 block">
                  Estimated Contract Value
                </span>
                <div className="text-2xl font-black text-[#780016] font-['Outfit']">
                  {currentTender.formattedValue}
                </div>
              </div>

              <div className="pt-2 border-t border-[#ecd5d9]">
                <span className="text-[10px] font-bold text-[#780016] block flex items-center gap-1">
                  <Coins className="w-3 h-3 text-[#780016]" />
                  <span>2% CDR Earnest Money</span>
                </span>
                <div className="text-xs font-extrabold text-slate-900 font-mono">
                  {currentTender.bidSecurityAmount}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Closing Date:</span>
                <strong className="text-slate-900 font-mono">
                  {new Date(currentTender.closingDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                </strong>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer (Maroon Buttons) */}
          <div className="relative z-10 pt-4 border-t border-[#ecd5d9] flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  soundFX.playPop();
                  if (onSelectTender) onSelectTender(currentTender);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#780016] hover:bg-[#600012] text-white text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-rose-950/20 cursor-pointer"
              >
                <span>Inspect 3D Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Direct Official Website Link */}
              <a
                href={currentTender.sourceUrl || 'https://ppra.org.pk'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playPop()}
                title={`Visit Official ${currentTender.agency} Portal`}
                className="px-3 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-bold border border-blue-200 text-xs flex items-center gap-1.5 transition shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {/* Direct Download PDF */}
              <button
                onClick={() => {
                  soundFX.playSuccess();
                  downloadTenderPDF(currentTender);
                }}
                title="Download Official Tender Notice (PDF Document)"
                className="px-3 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 font-bold border border-rose-200 text-xs transition cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <Download className="w-4 h-4 text-rose-600" />
                <span>PDF</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playPop();
                  if (onOpenPecCalculator) onOpenPecCalculator();
                }}
                className="px-3 py-2.5 rounded-xl bg-[#fbf0f2] hover:bg-[#f5e1e5] text-[#780016] border border-[#ecd5d9] text-xs font-bold transition cursor-pointer"
              >
                PEC Check
              </button>

              {onSaveTender && (
                <button
                  onClick={() => {
                    soundFX.playBookmark();
                    onSaveTender(currentTender);
                  }}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    isCurrentSaved
                      ? 'bg-[#fbf0f2] text-[#780016] border-[#f0cdd4]'
                      : 'bg-white text-slate-600 hover:text-slate-900 border-[#ecd5d9]'
                  }`}
                  title={isCurrentSaved ? 'In Watchlist' : 'Save to Watchlist'}
                >
                  {isCurrentSaved ? <BookmarkCheck className="w-4 h-4 text-[#780016]" /> : <Bookmark className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Carousel Navigation Arrows & Indicators */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#780016] font-mono">
                {currentIndex + 1} / {activeTenders.length}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white hover:bg-[#fbf0f2] border border-[#ecd5d9] text-slate-700 hover:text-[#780016] transition cursor-pointer shadow-2xs"
                  title="Previous Mega Tender"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white hover:bg-[#fbf0f2] border border-[#ecd5d9] text-slate-700 hover:text-[#780016] transition cursor-pointer shadow-2xs"
                  title="Next Mega Tender"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
