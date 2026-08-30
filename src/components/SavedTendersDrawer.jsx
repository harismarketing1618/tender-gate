import React from 'react';
import { 
  Bookmark, 
  X, 
  Trash2, 
  Download, 
  Printer, 
  ArrowRight, 
  Building2, 
  FileSpreadsheet, 
  Share2,
  ExternalLink,
  Globe
} from 'lucide-react';
import { soundFX } from '../services/soundFx';
import { downloadTenderPDF } from '../services/tenderDownloader';

export default function SavedTendersDrawer({
  isOpen,
  onClose,
  savedTenders,
  onRemoveTender,
  onClearAll,
  onOpenDetail,
  onShareWhatsApp
}) {
  if (!isOpen) return null;

  // Export to CSV
  const handleExportCSV = () => {
    if (savedTenders.length === 0) return;

    soundFX.playPop();
    const headers = ['Ref No', 'PPRA ID', 'Title', 'Category', 'Agency', 'Province', 'City', 'Estimated Value PKR', 'PEC Category', 'Closing Date'];
    const rows = savedTenders.map(t => [
      `"${t.refNo}"`,
      `"${t.ppraRef}"`,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.category}"`,
      `"${t.agency}"`,
      `"${t.province}"`,
      `"${t.city}"`,
      `"${t.estimatedValuePKR}"`,
      `"${t.pecCategory}"`,
      `"${t.closingDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TenderGate_Saved_Watchlist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-fadeIn text-slate-900">
      <div className="relative w-full max-w-md bg-white border-l border-[#e6dacb] h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#fbf9f5] border-b border-[#ece4d8] p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-[#8a6742]" />
            <h3 className="text-sm font-black text-slate-900 font-['Outfit']">
              Saved Tenders Watchlist ({savedTenders.length})
            </h3>
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

        {/* Toolbar */}
        {savedTenders.length > 0 && (
          <div className="bg-[#f5efe6]/70 border-b border-[#e2d5c3] px-4 py-2.5 flex items-center justify-between text-xs">
            <button
              onClick={handleExportCSV}
              className="text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export to Excel/CSV</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                onClearAll();
              }}
              className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* List of Saved Items */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {savedTenders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
              <Bookmark className="w-12 h-12 opacity-30 text-[#8a6742] mb-3" />
              <p className="font-bold text-slate-700">No saved tenders yet.</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs font-medium">
                Click the bookmark icon on any tender card to add it to your bidding watchlist.
              </p>
            </div>
          ) : (
            savedTenders.map((tender) => (
              <div 
                key={tender.id}
                className="p-3.5 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc] hover:border-blue-400 transition space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-900 border border-blue-300">
                    PEC: {tender.pecCategory}
                  </span>
                  <button
                    onClick={() => {
                      soundFX.playPop();
                      onRemoveTender(tender.id);
                    }}
                    title="Remove"
                    className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 
                  onClick={() => {
                    onClose();
                    onOpenDetail(tender);
                  }}
                  className="font-extrabold text-slate-900 hover:text-blue-700 transition cursor-pointer line-clamp-2"
                >
                  {tender.title}
                </h4>

                <div className="text-[11px] text-slate-600 flex items-center justify-between font-medium">
                  <span className="truncate">{tender.agency}</span>
                  <span className="font-black text-blue-700 shrink-0">{tender.formattedValue.split('(')[0]}</span>
                </div>

                <div className="pt-2 border-t border-[#ede5dc] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundFX.playSuccess();
                        downloadTenderPDF(tender);
                      }}
                      title="Download Tender Notice (PDF)"
                      className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-700 border border-[#e6dacb] transition cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                    >
                      <Download className="w-3 h-3 text-rose-600" />
                      <span>PDF</span>
                    </button>

                    <a
                      href={tender.sourceUrl || 'https://ppra.org.pk'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFX.playPop()}
                      title={`Visit Official ${tender.agency} Portal`}
                      className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition text-[10px] font-bold flex items-center gap-0.5"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenDetail(tender);
                    }}
                    className="text-blue-700 hover:underline text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
