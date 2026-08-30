import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Coins, 
  Calendar, 
  Layers, 
  ArrowRight, 
  Trash2 
} from 'lucide-react';
import { soundFX } from '../services/soundFx';

export default function TenderCompareModal({
  isOpen,
  onClose,
  comparedTenders,
  onRemoveFromCompare,
  onOpenDetail,
  onClearAllCompare
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white border border-[#e6dacb] rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto animate-fadeIn text-slate-900">
        
        {/* Header */}
        <div className="bg-[#fbf9f5] border-b border-[#ece4d8] p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#f5efe6] text-blue-800 border border-[#e2d5c3] flex items-center justify-center">
              <Layers className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 font-['Outfit']">
                Side-by-Side Tender Comparison ({comparedTenders.length})
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Compare bidding terms, 2% CDR values, PEC criteria & deadlines across selected tenders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedTenders.length > 0 && (
              <button
                onClick={() => {
                  soundFX.playPop();
                  onClearAllCompare();
                }}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-rose-600 text-xs font-bold border border-[#e6dacb] cursor-pointer"
              >
                Clear Comparison
              </button>
            )}
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

        {/* Comparison Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {comparedTenders.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-30 text-blue-500" />
              <p className="font-bold text-slate-700">No tenders selected for comparison.</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Check the "Compare" box on any tender cards in the feed to compare up to 3 tenders side-by-side.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {comparedTenders.map((tender) => (
                <div 
                  key={tender.id}
                  className="bg-[#fbf9f5] border border-[#ede5dc] rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-2xs"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-blue-100 text-blue-900 border border-blue-300">
                        PEC: {tender.pecCategory}
                      </span>
                      <button
                        onClick={() => {
                          soundFX.playPop();
                          onRemoveFromCompare(tender.id);
                        }}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm mb-1 leading-snug line-clamp-2">
                      {tender.title}
                    </h3>
                    <div className="text-slate-500 text-[11px] font-medium mb-3">
                      {tender.agency} • {tender.locationFull}
                    </div>

                    {/* Matrix Fields */}
                    <div className="space-y-2 border-t border-[#e8e0d5] pt-3">
                      <div className="flex justify-between py-1 border-b border-[#e8e0d5]/60">
                        <span className="text-slate-500">Estimated Budget:</span>
                        <span className="font-black text-blue-700">{tender.formattedValue.split('(')[0]}</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-[#e8e0d5]/60">
                        <span className="text-slate-500">2% CDR Amount:</span>
                        <span className="font-bold text-slate-800">{tender.bidSecurityAmount.split('(')[0]}</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-[#e8e0d5]/60">
                        <span className="text-slate-500">Procuring Entity:</span>
                        <span className="font-semibold text-slate-700">{tender.agencyCode}</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-[#e8e0d5]/60">
                        <span className="text-slate-500">Closing Date:</span>
                        <span className="font-bold text-rose-700">{new Date(tender.closingDate).toLocaleDateString('en-PK')}</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-[#e8e0d5]/60">
                        <span className="text-slate-500">AI Match Score:</span>
                        <span className="font-black text-blue-700">{tender.aiViabilityScore}%</span>
                      </div>

                      <div className="py-1">
                        <span className="text-slate-500 block mb-1">PEC Specialization:</span>
                        <div className="flex flex-wrap gap-1">
                          {tender.pecCodesRequired.map(code => (
                            <span key={code} className="px-1.5 py-0.5 rounded bg-white text-blue-800 font-mono font-bold border border-[#e6dacb] text-[10px]">
                              {code}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenDetail(tender);
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>View Full Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
