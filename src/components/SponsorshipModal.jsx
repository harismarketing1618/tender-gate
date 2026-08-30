import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Mail, 
  CheckCircle2, 
  X, 
  Copy, 
  Send, 
  TrendingUp, 
  ShieldCheck, 
  Megaphone,
  Briefcase
} from 'lucide-react';
import { soundFX } from '../services/soundFx';

export default function SponsorshipModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [sponsorType, setSponsorType] = useState('agent-category');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const SPONSOR_EMAIL = 'harismarketing1618@gmail.com';

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    soundFX.playPop();
    navigator.clipboard.writeText(SPONSOR_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    soundFX.playSuccess();
    
    // Launch mailto
    const subject = encodeURIComponent(`TENDER GATE - Sponsorship Inquiry from ${companyName || 'Partner'}`);
    const body = encodeURIComponent(`Company Name: ${companyName}\nSponsorship Package: ${sponsorType}\n\nMessage / Inquiry Details:\n${message}`);
    window.open(`mailto:${SPONSOR_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#e6dacb] rounded-3xl shadow-2xl overflow-hidden my-auto animate-fadeIn text-slate-900">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0f224a] to-blue-950 text-white p-5 sm:p-6 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#f5efe6]/20 text-[#f5efe6] border border-[#f5efe6]/30 flex items-center justify-center text-xl">
              <Megaphone className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-black text-white font-['Outfit']">
                  Sponsorship & Corporate Partnerships
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#f5efe6] text-[#7a5632]">
                  OFFICIAL
                </span>
              </div>
              <p className="text-xs text-blue-200 font-medium">
                Connect with 10,000+ PEC Registered Contractors & Construction Firms
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Direct Contact Callout Box */}
        <div className="bg-[#fbf9f5] border-b border-[#ece4d8] p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700">Official Sponsorship Desk:</span>
            <span className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Direct Marketing & Advertising
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#e2d5c3] shadow-xs gap-3">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Official Email</span>
                <a 
                  href={`mailto:${SPONSOR_EMAIL}`}
                  className="font-mono font-black text-sm text-blue-700 hover:underline truncate block"
                >
                  {SPONSOR_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyEmail}
                title="Copy Email Address"
                className="px-3 py-1.5 rounded-xl bg-[#f5efe6] hover:bg-[#ede3d5] text-[#7a5632] text-xs font-bold flex items-center gap-1 transition cursor-pointer border border-[#e2d5c3]"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <a
                href={`mailto:${SPONSOR_EMAIL}?subject=TENDER%20GATE%20Sponsorship%20Inquiry`}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          
          {/* Opportunities Highlights */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc]">
              <span className="font-extrabold text-blue-700 block">Agent Category</span>
              <span className="text-[10px] text-slate-500">Feature brand on 8 Agent feeds</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc]">
              <span className="font-extrabold text-[#7a5632] block">Banner Placement</span>
              <span className="text-[10px] text-slate-500">Top Header & Daily Alerts</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#fbf9f5] border border-[#ede5dc]">
              <span className="font-extrabold text-blue-700 block">Verified Vendor</span>
              <span className="text-[10px] text-slate-500">Materials, Cement, Steel, Heavy Gear</span>
            </div>
          </div>

          <form onSubmit={handleSendInquiry} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Company / Brand Name:
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Mughal Steel / DG Cement / Caterpillar Rentals"
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Sponsorship Package of Interest:
              </label>
              <select
                value={sponsorType}
                onChange={(e) => setSponsorType(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
              >
                <option value="Exclusive Agent Sponsorship (e.g. Sheer-Khan Highways)">Exclusive 8-Agent Category Sponsorship</option>
                <option value="Header & Live Ticker Advertising">Header & Live Ticker Advertising</option>
                <option value="WhatsApp & Email Alerts Digest Sponsor">WhatsApp & Email Alerts Digest Sponsor</option>
                <option value="PEC Contractor Verified Supplier Spotlight">PEC Contractor Verified Supplier Spotlight</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Brief Proposal / Contact Details:
              </label>
              <textarea
                rows="3"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your advertising goals, target contractor category, or phone contact..."
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition shadow-md shadow-blue-700/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Submit Sponsorship Inquiry to harismarketing1618@gmail.com</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
