import React from 'react';

export function TenderGateIcon({ className = "w-11 h-11", animated = true }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Ambient glow behind icon */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/35 via-indigo-500/25 to-amber-400/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300"></div>
      
      <svg 
        viewBox="0 0 64 64" 
        className={`w-full h-full drop-shadow-md relative z-10 ${animated ? 'transition-all duration-300 group-hover:scale-105' : ''}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Navy Slate Gradient for Shield Base */}
          <linearGradient id="tg-plate-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1226" />
            <stop offset="50%" stopColor="#0f2147" />
            <stop offset="100%" stopColor="#040814" />
          </linearGradient>
          
          {/* Left Pylon (Azure Blue) */}
          <linearGradient id="tg-pylon-l" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Right Pylon (Indigo Royal) */}
          <linearGradient id="tg-pylon-r" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>

          {/* Arch Apex Crossbar (T & G Fusion) */}
          <linearGradient id="tg-arch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#60a5fa" />
            <stop offset="70%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Golden Intelligence Core */}
          <linearGradient id="tg-gold-core" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Border Glow */}
          <linearGradient id="tg-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="tg-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Modern Hex-Rounded Emblem Badge */}
        <rect 
          x="2.5" 
          y="2.5" 
          width="59" 
          height="59" 
          rx="17" 
          fill="url(#tg-plate-bg)" 
          stroke="url(#tg-border-grad)" 
          strokeWidth="1.5" 
        />

        {/* Blueprint Grid Watermark Background */}
        <line x1="12" y1="32" x2="52" y2="32" stroke="#38bdf8" strokeOpacity="0.18" strokeDasharray="2 3" />
        <line x1="32" y1="12" x2="32" y2="52" stroke="#38bdf8" strokeOpacity="0.18" strokeDasharray="2 3" />
        <circle cx="32" cy="32" r="18" stroke="#38bdf8" strokeOpacity="0.12" strokeDasharray="2 3" />

        {/* Left Architectural Gate Pillar */}
        <path 
          d="M15 48V21L23.5 16.5V48H15Z" 
          fill="url(#tg-pylon-l)" 
        />
        {/* Left Pillar 3D Facet */}
        <path 
          d="M23.5 16.5L27 18.5V48H23.5V16.5Z" 
          fill="#1d4ed8" 
        />

        {/* Right Architectural Gate Pillar */}
        <path 
          d="M49 48V21L40.5 16.5V48H49Z" 
          fill="url(#tg-pylon-r)" 
        />
        {/* Right Pillar 3D Facet */}
        <path 
          d="M40.5 16.5L37 18.5V48H40.5V16.5Z" 
          fill="#3730a3" 
        />

        {/* Monumental Over-Arch Lintel (Forming "T" & "G" Portal Roof) */}
        <path 
          d="M12 18.5L32 9L52 18.5L47.5 22.5L32 14.5L16.5 22.5L12 18.5Z" 
          fill="url(#tg-arch-grad)" 
        />

        {/* Inner Gate Passage Arch (Portal Aperture) */}
        <path 
          d="M26 48V28.5C26 25.1863 28.6863 22.5 32 22.5C35.3137 22.5 38 25.1863 38 28.5V48H26Z" 
          fill="#030712" 
          stroke="url(#tg-gold-core)" 
          strokeWidth="1.2" 
        />

        {/* Golden Intelligence Compass / Portal Star */}
        <polygon 
          points="32,24 35.5,29.5 32,35 28.5,29.5" 
          fill="url(#tg-gold-core)" 
          filter="url(#tg-glow-filter)"
        />
        <circle cx="32" cy="29.5" r="1.3" fill="#ffffff" />

        {/* Horizontal Laser Scanning Line (AI Intelligence) */}
        <line x1="22" y1="39" x2="42" y2="39" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
        <circle cx="32" cy="39" r="1" fill="#38bdf8" />

        {/* Foundation Plinth Base */}
        <rect x="12" y="47.5" width="40" height="3.5" rx="1.75" fill="url(#tg-arch-grad)" />
      </svg>
    </div>
  );
}

export default function Logo({ size = "default", withSubtitle = true, className = "" }) {
  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <TenderGateIcon 
        className={isSmall ? "w-9 h-9" : isLarge ? "w-13 h-13" : "w-11 h-11"} 
      />
      <div>
        <div className="flex items-center gap-1.5">
          <span className={`${isSmall ? 'text-lg' : isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-black tracking-tight text-slate-900 font-['Outfit'] flex items-center leading-none`}>
            TENDER
            <span className="ml-1.5 px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xs font-black tracking-wide text-[11px] sm:text-xs">
              GATE
            </span>
          </span>
        </div>
        {withSubtitle && (
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-tight leading-tight mt-1">
            Pakistan Construction Tenders & Procurement Intelligence
          </p>
        )}
      </div>
    </div>
  );
}
