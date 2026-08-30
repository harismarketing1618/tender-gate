import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  Compass, 
  Radio, 
  Database,
  Calculator,
  ArrowUpRight,
  Maximize2,
  Clock,
  Sparkles,
  Flame
} from 'lucide-react';
import { soundFX } from '../services/soundFx';
import { INITIAL_TENDERS } from '../data/tenders';

export default function Hero3DStage({ 
  tenders = [],
  onSelectTender,
  onOpenPecCalculator, 
  onRunAllAgents, 
  isCrawlerRunning 
}) {
  const [activeTab, setActiveTab] = useState('blueprint'); // 'blueprint' | 'radar' | 'vault'
  const [selectedNode, setSelectedNode] = useState(0);
  const [is3DParallaxEnabled, setIs3DParallaxEnabled] = useState(true);
  const [tilt, setTilt] = useState({ x: 8, y: -12 });
  const [simulatedValue, setSimulatedValue] = useState(2500); // in Millions
  
  const stageRef = useRef(null);

  // Smooth mouse tilt handler
  const handleMouseMove = (e) => {
    if (!is3DParallaxEnabled || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 12;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 6, y: -10 });
  };

  // Get actual latest tenders from database
  const liveTendersList = (tenders && tenders.length > 0) ? tenders : INITIAL_TENDERS;
  
  // Pick top 4 latest high-priority tenders for 3D Blueprint nodes
  const blueprintProjects = liveTendersList.slice(0, 4).map((t, idx) => ({
    id: t.id,
    rawTender: t,
    name: t.title,
    agency: t.agency,
    pec: `Category ${t.pecCategory || 'C-1'}`,
    cdr: t.bidSecurityAmount || '2% CDR Required',
    location: t.locationFull || t.city || 'Pakistan',
    deadline: t.closingDate ? new Date(t.closingDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : '15 Sep 2026',
    status: t.status === 'active' ? 'Active Bidding' : 'Open Notice',
    badge: idx === 0 ? '🏗️ Mega Highway' : idx === 1 ? '🏥 Healthcare Complex' : idx === 2 ? '💧 Hydro Power' : '⚡ Grid Station'
  }));

  const activeProject = blueprintProjects[selectedNode % blueprintProjects.length] || blueprintProjects[0];
  const latestTopTender = liveTendersList[0];

  // 8 Autonomous Agent telemetry
  const agentsTelemetry = [
    { name: 'NHA Highway Hunter', portal: 'NHA EPADS', status: 'Crawling', ping: '24ms', items: '142 found' },
    { name: 'Punjab PPRA Sentinel', portal: 'PPRA Punjab', status: 'Active', ping: '18ms', items: '389 found' },
    { name: 'Sindh SPPRA Scout', portal: 'SPPRA Karachi', status: 'Active', ping: '31ms', items: '210 found' },
    { name: 'KPK KPPRA Crawler', portal: 'KPPRA Peshawar', status: 'Active', ping: '22ms', items: '164 found' },
    { name: 'WAPDA Mega Scanner', portal: 'WAPDA Official', status: 'Active', ping: '45ms', items: '78 found' },
    { name: 'MES Defense Watcher', portal: 'MES GHQ', status: 'Encrypted', ping: '15ms', items: '95 found' },
    { name: 'IDAP High-Rise Bot', portal: 'IDAP Portal', status: 'Active', ping: '29ms', items: '118 found' },
    { name: 'PEC & CDR Verifier', portal: 'PEC Registry', status: 'Syncing', ping: '12ms', items: '100% Valid' },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 select-none">
      
      {/* Top 3D Control Ribbon (Orange Accent Theme) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 sm:px-4 mb-4">
        <div className="flex items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-2xl border border-orange-200/80 shadow-xs">
          <button
            onClick={() => {
              soundFX.playPop();
              setActiveTab('blueprint');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === 'blueprint'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-700 hover:text-orange-800 hover:bg-orange-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>3D CAD Blueprint (Latest Tenders)</span>
          </button>

          <button
            onClick={() => {
              soundFX.playRadarPing();
              setActiveTab('radar');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-700 hover:text-orange-800 hover:bg-orange-50'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>3D Agent Radar</span>
          </button>

          <button
            onClick={() => {
              soundFX.playPop();
              setActiveTab('vault');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === 'vault'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-700 hover:text-orange-800 hover:bg-orange-50'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>3D PEC Vault</span>
          </button>
        </div>

        {/* 3D Depth Toggle & Live FPS counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.playPop();
              setIs3DParallaxEnabled(!is3DParallaxEnabled);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-orange-200 text-slate-700 text-xs font-bold hover:border-orange-400 transition cursor-pointer shadow-2xs"
            title="Toggle interactive 3D gyroscope tilt"
          >
            <Compass className={`w-3.5 h-3.5 ${is3DParallaxEnabled ? 'text-orange-600 animate-spin' : 'text-slate-400'}`} style={{ animationDuration: '8s' }} />
            <span>{is3DParallaxEnabled ? '3D Parallax Active' : 'Static View'}</span>
          </button>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-900 text-xs font-black">
            <Activity className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
            <span>60 FPS Spatial Engine</span>
          </div>
        </div>
      </div>

      {/* 3D Perspective Viewport */}
      <div 
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-1500 w-full min-h-[460px] sm:min-h-[500px] flex items-center justify-center p-2 sm:p-6"
      >
        
        {/* Main 3D Card Stage with Preserve-3D (Orange Glass Theme) */}
        <div 
          className="relative w-full max-w-4xl preserve-3d rounded-3xl transition-transform duration-300 ease-out bg-white/95 backdrop-blur-md border-2 border-orange-300/80 shadow-[0_20px_50px_rgba(234,88,12,0.15)] p-4 sm:p-8"
          style={{
            transform: is3DParallaxEnabled 
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`
              : 'rotateX(0deg) rotateY(0deg)',
          }}
        >
          
          {/* Laser Scanning Line Animation (Vibrant Orange Laser) */}
          <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent pointer-events-none z-30 animate-laser-scan shadow-[0_0_15px_#ea580c]"></div>

          {/* 3D Wireframe Grid Base Plate */}
          <div className="absolute inset-0 rounded-3xl isometric-grid-bg opacity-40 pointer-events-none"></div>

          {/* ================= MODE 1: 3D BLUEPRINT ================= */}
          {activeTab === 'blueprint' && (
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: 3D Holographic Model Visualizer */}
              <div className="lg:col-span-7 preserve-3d">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-orange-950">
                      Live Pakistan Construction Pipeline (CAD Model)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-900 border border-orange-300">
                    PPRA 2026 Verified
                  </span>
                </div>

                {/* 3D Isometric Multi-Floor CAD Layer Stage (Orange/Amber Neon Wireframe) */}
                <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-slate-950 via-[#1c0f05] to-slate-950 rounded-2xl p-4 overflow-hidden border border-orange-900/40 shadow-inner flex flex-col justify-between">
                  
                  {/* Blueprint Grid Lines & Glowing Radar Circles */}
                  <div className="absolute inset-0 blueprint-grid-dark opacity-25"></div>
                  <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full border border-orange-500/20 animate-rotate-slow"></div>
                  <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-orange-500/10 animate-rotate-slow-reverse"></div>

                  {/* 3D Project Selector Nodes */}
                  <div className="relative z-10 grid grid-cols-2 gap-2">
                    {blueprintProjects.map((proj, idx) => (
                      <button
                        key={proj.id}
                        onClick={() => {
                          soundFX.playPop();
                          setSelectedNode(idx);
                        }}
                        className={`text-left p-2.5 rounded-xl border transition cursor-pointer ${
                          selectedNode === idx
                            ? 'bg-orange-600/30 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                            : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800 hover:border-orange-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-orange-400 font-bold mb-1">
                          <span>{proj.badge}</span>
                          <span className="font-mono text-slate-400">Node #{idx + 1}</span>
                        </div>
                        <div className="text-xs font-bold text-white truncate">{proj.name}</div>
                        <div className="text-[11px] text-slate-300 font-medium truncate">{proj.agency}</div>
                      </button>
                    ))}
                  </div>

                  {/* 3D Active Node Holographic Display */}
                  <div 
                    onClick={() => {
                      soundFX.playPop();
                      if (onSelectTender && activeProject.rawTender) {
                        onSelectTender(activeProject.rawTender);
                      }
                    }}
                    className="relative z-10 mt-3 p-3 rounded-xl bg-orange-950/80 border border-orange-500/50 backdrop-blur-md cursor-pointer hover:border-orange-300 transition"
                    title="Click to view complete tender dossier"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0 mr-2">
                        <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse shrink-0" />
                        <span className="text-xs font-bold text-white truncate">
                          {activeProject.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                        {activeProject.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-300 pt-1 border-t border-orange-900/60">
                      <div>
                        <span className="text-slate-400 block">Required PEC</span>
                        <span className="font-bold text-orange-300">{activeProject.pec}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">2% CDR Estimate</span>
                        <span className="font-bold text-amber-300 truncate block">{activeProject.cdr.split(' ')[1] || '2%'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Bid Deadline</span>
                        <span className="font-bold text-white">{activeProject.deadline}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3D Coordinate Ticker */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-orange-400/80 pt-1">
                    <span>CAD LAYER: STRUCTURAL-ORANGE</span>
                    <span>SCALE: 1:500 ISOMETRIC</span>
                    <span>STATUS: LIVE STREAM</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive 3D Depth Spec Card */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                <div className="p-4 rounded-2xl bg-white/95 border border-orange-200 shadow-md">
                  <div className="text-xs font-black uppercase tracking-wider text-orange-800 mb-1">
                    Active Tender Inspection
                  </div>
                  <h3 
                    onClick={() => {
                      soundFX.playPop();
                      if (onSelectTender && activeProject.rawTender) {
                        onSelectTender(activeProject.rawTender);
                      }
                    }}
                    className="text-base font-black text-slate-900 leading-tight hover:text-orange-600 transition cursor-pointer"
                  >
                    {activeProject.name}
                  </h3>
                  
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-orange-50/50 border border-orange-100">
                      <span className="text-slate-600 font-medium">Procuring Agency:</span>
                      <span className="font-bold text-slate-900">{activeProject.agency}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-orange-50/50 border border-orange-100">
                      <span className="text-slate-600 font-medium">PEC Mandatory Limit:</span>
                      <span className="font-bold text-orange-700">{activeProject.pec}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-orange-50/50 border border-orange-100">
                      <span className="text-slate-600 font-medium">Earnest Money (2% CDR):</span>
                      <span className="font-bold text-amber-800 truncate max-w-[180px]">{activeProject.cdr}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundFX.playPop();
                        if (onSelectTender && activeProject.rawTender) {
                          onSelectTender(activeProject.rawTender);
                        } else if (onOpenPecCalculator) {
                          onOpenPecCalculator();
                        }
                      }}
                      className="flex-1 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/25 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Inspect 3D Dossier</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        soundFX.playSuccess();
                        const feed = document.getElementById('tenders-feed');
                        if (feed) feed.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold transition cursor-pointer"
                      title="View all live tenders in feed"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 3D Mini Stats Strip (Orange Accents) */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 text-center">
                    <div className="text-lg font-black text-orange-950 font-['Outfit']">PKR 184.5B</div>
                    <div className="text-[10px] font-bold text-orange-700">Total Live Pipeline</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-center">
                    <div className="text-lg font-black text-amber-950 font-['Outfit']">100% PPRA</div>
                    <div className="text-[10px] font-bold text-amber-800">Rule 2026 Audit Passed</div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= MODE 2: 3D MULTI-AGENT RADAR ================= */}
          {activeTab === 'radar' && (
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: 3D Orbital Radar Chamber (Orange Glow) */}
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                      8-Agent Neural Mesh Orbit (24+ Portals)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-900 border border-orange-300">
                    2,450 docs/sec
                  </span>
                </div>

                <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-slate-950 via-[#1c0f05] to-slate-950 rounded-2xl p-4 overflow-hidden border border-orange-900/40 shadow-inner flex items-center justify-center">
                  
                  {/* Concentric 3D Radar Rings (Orange/Amber) */}
                  <div className="absolute w-56 h-56 rounded-full border border-orange-500/30 animate-radar-pulse pointer-events-none"></div>
                  <div className="absolute w-44 h-44 rounded-full border border-orange-500/40 animate-rotate-slow pointer-events-none"></div>
                  <div className="absolute w-28 h-28 rounded-full border border-amber-500/40 animate-rotate-slow-reverse pointer-events-none"></div>

                  {/* Central AI Core */}
                  <div className="relative z-20 w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-600 border-2 border-orange-300 flex flex-col items-center justify-center text-white shadow-[0_0_30px_#ea580c] animate-pulse">
                    <Cpu className="w-6 h-6" />
                    <span className="text-[9px] font-black tracking-tighter">AGY CORE</span>
                  </div>

                  {/* 8 Orbiting Agent Satellites */}
                  {agentsTelemetry.map((agent, i) => {
                    const angle = (i / agentsTelemetry.length) * (Math.PI * 2);
                    const radius = 95;
                    const left = `calc(50% + ${Math.cos(angle) * radius}px - 18px)`;
                    const top = `calc(50% + ${Math.sin(angle) * radius}px - 18px)`;

                    return (
                      <div
                        key={i}
                        className="absolute z-30 group cursor-pointer"
                        style={{ left, top }}
                        onClick={() => {
                          soundFX.playPop();
                        }}
                      >
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-orange-400/80 flex items-center justify-center text-white shadow-lg hover:scale-125 transition-transform hover:border-amber-400">
                          <span className="text-[11px] font-black">A{i + 1}</span>
                        </div>
                        
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-40 whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-950 border border-orange-400 text-white text-[10px] font-bold shadow-xl">
                          <div>{agent.name}</div>
                          <div className="text-orange-400 font-mono">{agent.portal} • {agent.ping}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Live Telemetry Feed */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                <div className="p-4 rounded-2xl bg-white/95 border border-orange-200 shadow-md">
                  <div className="text-xs font-black uppercase tracking-wider text-orange-900 mb-2">
                    Live Portal Crawl Matrix
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {agentsTelemetry.slice(0, 4).map((ag, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-orange-50/40 border border-orange-100 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></div>
                          <div>
                            <span className="font-bold text-slate-900 block">{ag.name}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{ag.portal}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-orange-700 font-mono text-[11px]">{ag.items}</span>
                          <span className="text-[9px] text-emerald-700 block font-bold">{ag.ping}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      soundFX.playSuccess();
                      onRunAllAgents();
                    }}
                    disabled={isCrawlerRunning}
                    className="mt-3 w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black transition flex items-center justify-center gap-2 shadow-md shadow-orange-600/25 cursor-pointer"
                  >
                    {isCrawlerRunning ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>8 Agents Synchronizing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Force Synchronized Crawl</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200 text-[11px] text-orange-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Real-time crawler scans PPRA EPADS, SPPRA, KPPRA, WAPDA, and MES every 2 hours.</span>
                </div>

              </div>

            </div>
          )}

          {/* ================= MODE 3: 3D PEC VAULT & CDR CALCULATOR ================= */}
          {activeTab === 'vault' && (
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: 3D Interactive 2% CDR Simulator */}
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                      3D Interactive 2% CDR & Bank Guarantee Vault
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-900 border border-orange-300">
                    PPRA Rule 25 Compliant
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 via-[#1c0f05] to-slate-950 border border-orange-900/40 text-white shadow-inner">
                  
                  <div className="text-xs text-slate-400 font-medium mb-1">
                    Simulate Tender Cost:
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-amber-400 font-['Outfit']">
                      PKR {simulatedValue.toLocaleString()} Million
                    </span>
                    <span className="text-xs text-slate-400">
                      ({(simulatedValue / 1000).toFixed(2)} Billion)
                    </span>
                  </div>

                  {/* Interactive Slider with Orange Accent */}
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    step="50"
                    value={simulatedValue}
                    onChange={(e) => {
                      soundFX.playPop();
                      setSimulatedValue(Number(e.target.value));
                    }}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-6"
                  />

                  {/* 3D Calculated Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-orange-500/30">
                      <span className="text-[10px] text-slate-400 block font-medium">2% CDR Required</span>
                      <span className="text-base font-black text-orange-400 font-['Outfit']">
                        PKR {(simulatedValue * 0.02).toFixed(1)}M
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30">
                      <span className="text-[10px] text-slate-400 block font-medium">10% Performance Bond</span>
                      <span className="text-base font-black text-amber-400 font-['Outfit']">
                        PKR {(simulatedValue * 0.10).toFixed(1)}M
                      </span>
                    </div>

                    <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30">
                      <span className="text-[10px] text-slate-400 block font-medium">Min PEC Category</span>
                      <span className="text-base font-black text-emerald-400 font-['Outfit']">
                        {simulatedValue > 3000 ? 'Category C-A' : simulatedValue > 2500 ? 'Category C-B' : simulatedValue > 1000 ? 'Category C-1' : 'Category C-2'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: PEC Tier Spectrum */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                <div className="p-4 rounded-2xl bg-white/95 border border-orange-200 shadow-md">
                  <div className="text-xs font-black uppercase tracking-wider text-orange-900 mb-2">
                    Official PEC License Tiers
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      { tier: 'C-A', lim: 'Unlimited Mega' },
                      { tier: 'C-B', lim: 'Up to 3.0 Billion' },
                      { tier: 'C-1', lim: 'Up to 2.5 Billion' },
                      { tier: 'C-2', lim: 'Up to 1.0 Billion' },
                      { tier: 'C-3', lim: 'Up to 500 Million' },
                      { tier: 'C-4', lim: 'Up to 200 Million' },
                      { tier: 'C-5', lim: 'Up to 65 Million' },
                      { tier: 'C-6', lim: 'Up to 25 Million' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-orange-50/40 border border-orange-100 flex items-center justify-between">
                        <span className="font-extrabold text-orange-800">{item.tier}</span>
                        <span className="text-[10px] font-bold text-slate-600">{item.lim}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      soundFX.playPop();
                      onOpenPecCalculator();
                    }}
                    className="mt-3 w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/25 cursor-pointer"
                  >
                    <span>Full PEC 2026 Calculator</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Floating 3D Satellite Badges in Parallax Space (Orange Theme) */}
        {latestTopTender && (
          <div 
            onClick={() => {
              soundFX.playPop();
              if (onSelectTender) onSelectTender(latestTopTender);
            }}
            className="hidden lg:block absolute -top-4 -right-2 z-30 animate-float-slow cursor-pointer"
            title="Click to view latest live tender"
          >
            <div className="px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-orange-300 shadow-xl shadow-orange-500/15 flex items-center gap-2.5 hover:border-orange-500 transition">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
              </span>
              <div>
                <div className="text-[11px] font-black text-slate-900 flex items-center gap-1">
                  <span>⚡ LIVE {latestTopTender.agencyCode || 'NHA'} TENDER ALERT</span>
                </div>
                <div className="text-[10px] text-orange-700 font-bold max-w-[200px] truncate">
                  {latestTopTender.title} • {latestTopTender.formattedValue}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="hidden lg:block absolute -bottom-4 -left-2 z-30 animate-float-fast pointer-events-none">
          <div className="px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-orange-200 shadow-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[11px] font-black text-slate-900">8 AGENTS ONLINE (100%)</div>
              <div className="text-[10px] text-orange-800 font-semibold">PPRA & PEC 2026 Synchronized</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
