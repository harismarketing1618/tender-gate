import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Layers, 
  ExternalLink, 
  Eye 
} from 'lucide-react';
import { soundFX } from '../services/soundFx';
import { downloadTenderDossier } from '../services/tenderDownloader';

export default function TenderCard({
  tender,
  onOpenDetail,
  isSaved,
  onToggleSave,
  onShareWhatsApp,
  isCompared,
  onToggleCompare
}) {
  // Calculate remaining days
  const calculateDaysLeft = (closingDateStr) => {
    const closing = new Date(closingDateStr);
    const now = new Date();
    const diffTime = closing - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(tender.closingDate);

  const getDaysLeftBadge = (days) => {
    if (days <= 0) {
      return { text: 'Closing Today!', class: 'bg-rose-50 text-rose-700 border-rose-200 font-black' };
    } else if (days <= 3) {
      return { text: `${days} Days Left (Urgent)`, class: 'bg-rose-50 text-rose-700 border-rose-200 font-bold' };
    } else if (days <= 7) {
      return { text: `${days} Days Left`, class: 'bg-amber-50 text-amber-800 border-amber-200 font-bold' };
    } else {
      return { text: `${days} Days Left`, class: 'bg-blue-50 text-blue-800 border-blue-200 font-bold' };
    }
  };

  const daysBadge = getDaysLeftBadge(daysLeft);

  const handleCardClick = () => {
    soundFX.playPop();
    onOpenDetail(tender);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative rounded-3xl bg-white border border-[#e6dacb] hover:border-blue-500 hover:shadow-xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-0.5"
    >
      
      {/* Top Badges Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {/* Assigned Agent Badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#f5efe6] text-[#7a5632] border border-[#e2d5c3]">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>{tender.agentName}</span>
          </span>

          {/* PEC Category Badge */}
          <span className="px-2.5 py-1 rounded-md text-xs font-black bg-blue-50 text-blue-900 border border-blue-200">
            PEC: {tender.pecCategory}
          </span>
        </div>

        {/* Days Left Tag */}
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] border ${daysBadge.class}`}>
          {daysBadge.text}
        </span>
      </div>

      {/* Tender Title */}
      <div className="mb-3">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition font-['Outfit'] line-clamp-2 leading-snug">
          {tender.title}
        </h3>
        
        {/* Reference Number & PPRA ID */}
        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
          <span>Ref: <strong className="text-slate-700 font-bold">{tender.refNo}</strong></span>
          <span className="text-slate-300">•</span>
          <span>PPRA: <strong className="text-blue-700 font-bold">{tender.ppraRef}</strong></span>
        </div>
      </div>

      {/* Short Scope / Description */}
      <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-normal">
        {tender.shortDescription}
      </p>

      {/* Procuring Entity & Location */}
      <div className="bg-[#fbf9f5] p-3 rounded-2xl border border-[#ede5dc] mb-4 space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-1.5 truncate">
            <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-bold truncate">{tender.agency}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={tender.sourceUrl || 'https://ppra.org.pk'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playPop();
              }}
              title={`Visit Official ${tender.agency} Portal Link`}
              className="text-[10px] px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold border border-blue-200 flex items-center gap-1 transition"
            >
              <span>Portal</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 uppercase font-bold border border-[#e6dacb]">
              {tender.province}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span className="truncate">{tender.locationFull}</span>
        </div>
      </div>

      {/* Financial & Bid Details */}
      <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-2xl bg-[#f5efe6]/70 border border-[#e2d5c3] text-xs">
        <div>
          <span className="text-[10px] text-[#8a6742] block font-bold uppercase tracking-wider">Estimated Value</span>
          <span className="text-sm font-black text-blue-700 font-['Outfit']">
            {tender.formattedValue}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-[#8a6742] block font-bold uppercase tracking-wider">2% CDR / Security</span>
          <span className="text-xs font-bold text-slate-800 truncate block">
            {tender.bidSecurityAmount.split('(')[0]}
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {/* Download Tender Notice Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playSuccess();
              downloadTenderDossier(tender);
            }}
            title="Download Official Tender Notice & Dossier (.txt)"
            className="p-2.5 rounded-xl bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-[#e6dacb] transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600" />
          </button>

          {/* Official Website Link Button */}
          <a
            href={tender.sourceUrl || 'https://ppra.org.pk'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playPop();
            }}
            title={`Open Official Tender Website (${tender.agency})`}
            className="p-2.5 rounded-xl bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border border-[#e6dacb] transition cursor-pointer flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 text-indigo-600" />
          </a>

          {/* Save / Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playBookmark();
              onToggleSave(tender);
            }}
            title={isSaved ? "Remove from Watchlist" : "Save to Watchlist"}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              isSaved 
                ? 'bg-[#f5efe6] text-[#7a5632] border-[#e2d5c3]' 
                : 'bg-white hover:bg-[#f5efe6] text-slate-600 hover:text-slate-900 border-[#e6dacb]'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#8a6742]" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Compare Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playPop();
              onToggleCompare(tender);
            }}
            title={isCompared ? "Remove from Comparison" : "Add to Comparison Matrix"}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              isCompared 
                ? 'bg-blue-100 text-blue-700 border-blue-300' 
                : 'bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 border-[#e6dacb]'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* WhatsApp Share Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playPop();
              onShareWhatsApp(tender);
            }}
            title="Share Tender via WhatsApp"
            className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-[#e6dacb] transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* View Details Clickable Indicator */}
        <div className="flex-1 py-2 px-3 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition shadow-xs">
          <span>Live Dossier</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
