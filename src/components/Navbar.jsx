import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Bot, 
  Search, 
  Bookmark, 
  Bell, 
  PlusCircle, 
  Calculator, 
  BarChart3, 
  Terminal, 
  Sparkles,
  Clock,
  Volume2,
  VolumeX,
  Layers,
  Megaphone,
  HelpCircle,
  FileText,
  Menu,
  X,
  Info,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { soundFX } from '../services/soundFx';

export default function Navbar({ 
  savedTendersCount, 
  compareTendersCount,
  onOpenSavedDrawer, 
  onOpenCompareModal,
  onOpenCrawlerModal, 
  onOpenPecCalculator, 
  onOpenSubmitModal,
  onOpenAlertsModal,
  onOpenSponsorship,
  onOpenRufloSecurity,
  activeView,
  setActiveView
}) {
  const [pkTime, setPkTime] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setPkTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const newState = soundFX.toggleSound();
    setIsSoundOn(newState);
    if (newState) soundFX.playPop();
  };

  const navItems = [
    { id: 'tenders', label: 'Tenders Directory', icon: Search },
    { id: 'agents', label: '8 AI Agents Hub', icon: Bot },
    { id: 'analytics', label: 'Market Analytics', icon: BarChart3 },
    { id: 'how-it-works', label: 'How It Works & PEC', icon: FileText },
    { id: 'about', label: 'About & FAQ', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8e2d8] shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0f224a] to-blue-950 text-white text-xs py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#f5efe6]/15 text-[#f5efe6] border border-[#f5efe6]/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              8 AI AGENTS ACTIVE
            </span>
            <span className="hidden sm:inline text-blue-100 text-[11px] font-medium">
              Federal PPRA, Punjab, Sindh, KPK, NHA, WAPDA & MES 24/7 Procurement Web Platform
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px]">
            {/* Ruflo Security Shield Trigger */}
            <button
              onClick={() => {
                soundFX.playRadarPing();
                if (onOpenRufloSecurity) onOpenRufloSecurity();
              }}
              title="Ruflo Enterprise Security Guard Active"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-black transition cursor-pointer bg-emerald-500/20 hover:bg-emerald-500/30 px-2.5 py-0.5 rounded-md border border-emerald-400/40"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Ruflo Guard: 100% Secure</span>
            </button>

            {/* Sponsorship Email Trigger */}
            <button
              onClick={() => {
                soundFX.playPop();
                if (onOpenSponsorship) onOpenSponsorship();
              }}
              className="flex items-center gap-1 text-[#f5efe6] hover:text-white font-bold transition cursor-pointer bg-[#f5efe6]/15 hover:bg-[#f5efe6]/25 px-2.5 py-0.5 rounded-md border border-[#f5efe6]/20"
            >
              <Megaphone className="w-3 h-3 text-amber-200" />
              <span>Sponsor / Advertise</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={isSoundOn ? "Sound Effects ON" : "Sound Effects MUTED"}
              className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition cursor-pointer flex items-center gap-1"
            >
              {isSoundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-blue-300" />}
            </button>

            <div className="flex items-center gap-1.5 text-blue-100 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-200" />
              <span>PKT: <strong className="text-white font-mono font-bold">{pkTime || '12:00:00 PM'}</strong></span>
            </div>

            <button 
              onClick={() => {
                soundFX.playPop();
                onOpenCrawlerModal();
              }}
              className="flex items-center gap-1 text-[#f5efe6] hover:text-white font-bold transition cursor-pointer bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md"
            >
              <Terminal className="w-3 h-3 text-blue-300" />
              <span>Live Agent Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => {
              soundFX.playPop();
              setActiveView('tenders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 flex items-center justify-center shadow-md shadow-blue-600/25 border border-blue-400/30 group-hover:scale-105 group-hover:shadow-blue-600/40 transition-all duration-300">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.5L20.5 7.5V16.5L12 21.5L3.5 16.5V7.5L12 2.5Z" />
                  <path d="M12 2.5V21.5" />
                  <path d="M3.5 7.5L12 12L20.5 7.5" />
                  <circle cx="12" cy="12" r="1.8" fill="#60a5fa" stroke="none" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-['Outfit']">
                  TENDER <span className="text-blue-600">GATE</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold leading-tight">
                Pakistan Construction Tenders & Procurement Intelligence
              </p>
            </div>
          </div>

          {/* Center Website Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#f5efe6]/70 p-1.5 rounded-2xl border border-[#e6dacb]">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFX.playPop();
                    setActiveView(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'text-slate-700 hover:text-blue-700 hover:bg-white'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                soundFX.playPop();
                onOpenPecCalculator();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-white transition flex items-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-[#8a6742]" />
              <span>PEC Checker</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Compare Tenders Button */}
            <button
              onClick={() => {
                soundFX.playPop();
                onOpenCompareModal();
              }}
              title="Compare Selected Tenders"
              className="relative p-2.5 rounded-xl bg-[#f5efe6]/70 hover:bg-[#ede3d5] border border-[#e6dacb] text-slate-700 hover:text-blue-600 transition cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              {compareTendersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white font-black text-[10px] rounded-full flex items-center justify-center">
                  {compareTendersCount}
                </span>
              )}
            </button>

            {/* Notifications / Alerts */}
            <button
              onClick={() => {
                soundFX.playPop();
                onOpenAlertsModal();
              }}
              title="Set WhatsApp / Email Tender Alerts"
              className="p-2.5 rounded-xl bg-[#f5efe6]/70 hover:bg-[#ede3d5] border border-[#e6dacb] text-slate-700 hover:text-[#8a6742] transition cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* Bookmarks Drawer Toggle */}
            <button
              onClick={() => {
                soundFX.playPop();
                onOpenSavedDrawer();
              }}
              className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f5efe6]/70 hover:bg-[#ede3d5] border border-[#e6dacb] text-slate-800 transition cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-[#8a6742]" />
              <span className="hidden sm:inline text-xs font-bold">Watchlist</span>
              {savedTendersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">
                  {savedTendersCount}
                </span>
              )}
            </button>

            {/* Post / Submit Tender */}
            <button
              onClick={() => {
                soundFX.playPop();
                onOpenSubmitModal();
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-700/20 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Tender</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#f5efe6] border border-[#e6dacb] text-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e8e2d8] bg-white px-4 py-3 space-y-2">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playPop();
                  setActiveView(item.id);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center gap-2.5 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-[#f5efe6]'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#e8e2d8] flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playPop();
                onOpenPecCalculator();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl bg-[#f5efe6] text-[#7a5632] text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>PEC Checker</span>
            </button>
            <button
              onClick={() => {
                soundFX.playPop();
                onOpenSubmitModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Tender</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
