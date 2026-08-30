import React, { useState } from 'react';
import { 
  Building2, 
  Bot, 
  ShieldCheck, 
  ExternalLink, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Megaphone, 
  Copy, 
  CheckCircle2, 
  Send,
  Sparkles,
  FileText,
  Search,
  BarChart3,
  Calculator,
  Info,
  HelpCircle
} from 'lucide-react';
import { soundFX } from '../services/soundFx';
import Logo from './Logo';

export default function Footer({ onSelectCategory, agents, onOpenSponsorship, onNavigateView, onOpenPecCalculator }) {
  const [copied, setCopied] = useState(false);
  const SPONSOR_EMAIL = 'harismarketing1618@gmail.com';

  const handleCopyEmail = () => {
    soundFX.playPop();
    navigator.clipboard.writeText(SPONSOR_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNav = (viewId) => {
    soundFX.playPop();
    if (onNavigateView) {
      onNavigateView(viewId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-[#e8e2d8] pt-12 pb-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Corporate Sponsorship & Strategic Partnership Banner */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-[#fbf9f5] via-[#f5efe6] to-[#fbf9f5] border border-[#e2d5c3] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-slate-900 font-['Outfit']">
                  Corporate Sponsorship & Strategic Partnerships
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#f5efe6] text-[#7a5632] border border-[#e2d5c3]">
                  OPPORTUNITY
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium max-w-xl mt-0.5">
                Reach Pakistan’s active construction constructors, engineering consultants, suppliers, and procurement managers across all 8 PEC categories.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#e2d5c3] text-slate-700 hover:text-slate-900 font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs text-xs"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Inquiries Email</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                if (onOpenSponsorship) onOpenSponsorship();
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm transition flex items-center gap-1.5 cursor-pointer text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Sponsor Platform</span>
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div onClick={() => handleNav('tenders')}>
              <Logo size="small" withSubtitle={true} />
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm font-medium">
              Pakistan’s premier multi-agent construction procurement marketplace. Powered by 8 specialized AI crawlers indexing daily tenders from Federal PPRA, Provincial PPRAs, NHA, WAPDA, and MES.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-[#f5efe6] text-[#7a5632] border border-[#e2d5c3] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Verified PPRA & PEC Compliant
              </span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
              Platform Directory
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => handleNav('tenders')}
                  className="hover:text-blue-700 transition cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Search className="w-3 h-3 text-blue-600" />
                  <span>Browse All Tenders</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('agents')}
                  className="hover:text-blue-700 transition cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Bot className="w-3 h-3 text-blue-600" />
                  <span>8 AI Autonomous Agents</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('analytics')}
                  className="hover:text-blue-700 transition cursor-pointer text-left flex items-center gap-1.5"
                >
                  <BarChart3 className="w-3 h-3 text-indigo-600" />
                  <span>Market Analytics</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-blue-700 transition cursor-pointer text-left flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-emerald-600" />
                  <span>How It Works & PEC Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-blue-700 transition cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Info className="w-3 h-3 text-amber-600" />
                  <span>About & FAQ</span>
                </button>
              </li>
              {onOpenPecCalculator && (
                <li>
                  <button
                    onClick={() => { soundFX.playPop(); onOpenPecCalculator(); }}
                    className="hover:text-blue-700 transition cursor-pointer text-left flex items-center gap-1.5 text-blue-700 font-bold"
                  >
                    <Calculator className="w-3 h-3 text-[#8a6742]" />
                    <span>PEC License Calculator</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* The 8 Agents Categories */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
              8 AI Tender Agents
            </h4>
            <ul className="space-y-2 font-medium">
              {agents.slice(0, 5).map(a => (
                <li key={a.id}>
                  <button
                    onClick={() => {
                      soundFX.playPop();
                      onSelectCategory(a.category);
                    }}
                    className="hover:text-blue-700 transition cursor-pointer text-left truncate block max-w-[200px]"
                  >
                    {a.avatar} {a.shortCategory}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Government Gateways */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li>
                <a href="https://ppra.org.pk" target="_blank" rel="noreferrer" className="hover:text-blue-700 flex items-center gap-1">
                  <span>Federal PPRA</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://ppra.punjab.gov.pk" target="_blank" rel="noreferrer" className="hover:text-blue-700 flex items-center gap-1">
                  <span>Punjab PPRA</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://ppms.pprasindh.gov.pk" target="_blank" rel="noreferrer" className="hover:text-blue-700 flex items-center gap-1">
                  <span>Sindh SPPRA</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://kppra.gov.pk" target="_blank" rel="noreferrer" className="hover:text-blue-700 flex items-center gap-1">
                  <span>KPK KPPRA</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://pec.org.pk" target="_blank" rel="noreferrer" className="hover:text-blue-700 flex items-center gap-1">
                  <span>PEC Pakistan</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Contact Email */}
        <div className="pt-8 border-t border-[#e8e2d8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 TENDER GATE. All rights reserved.</span>
            <span>•</span>
            <span>Procurement & Partnership: <a href={`mailto:${SPONSOR_EMAIL}`} className="text-blue-700 font-bold hover:underline">{SPONSOR_EMAIL}</a></span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('about')} className="hover:text-slate-700 cursor-pointer">Terms of Procurement</button>
            <button onClick={() => handleNav('how-it-works')} className="hover:text-slate-700 cursor-pointer">PPRA Bidding Rules 2004</button>
            <button onClick={() => handleNav('how-it-works')} className="hover:text-slate-700 cursor-pointer">PEC Guidelines</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
