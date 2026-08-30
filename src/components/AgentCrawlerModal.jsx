import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Play, 
  Pause, 
  Trash2, 
  Bot, 
  X, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sliders 
} from 'lucide-react';
import { soundFX } from '../services/soundFx';

export default function AgentCrawlerModal({
  isOpen,
  onClose,
  logs,
  onClearLogs,
  onTriggerAgentScrape,
  onTriggerAllAgents,
  agents,
  isCrawlerRunning,
  activeScrapingAgentId
}) {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [selectedAgentFilter, setSelectedAgentFilter] = useState('ALL');
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  if (!isOpen) return null;

  const filteredLogs = logs.filter(log => {
    if (filterLevel !== 'ALL' && log.level !== filterLevel) return false;
    if (selectedAgentFilter !== 'ALL' && log.agentId !== selectedAgentFilter) return false;
    return true;
  });

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'SUCCESS': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40';
      case 'PARSE': return 'text-amber-300 bg-amber-500/20 border-amber-500/40';
      case 'CRAWL': return 'text-blue-400 bg-blue-500/20 border-blue-500/40';
      case 'ERROR': return 'text-rose-400 bg-rose-500/20 border-rose-500/40';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#0b1329] border border-blue-900/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        
        {/* Terminal Header Bar */}
        <div className="bg-[#0f1b3b] border-b border-blue-900/40 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
            </div>
            <div className="flex items-center gap-2 pl-3 border-l border-blue-800">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm font-bold text-white font-mono">
                TENDER GATE 8-Agent Autonomous Web Scraping Console
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
                STREAM LIVE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playPop();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="bg-[#0f1b3b]/90 border-b border-blue-900/40 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Quick Triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playSuccess();
                onTriggerAllAgents();
              }}
              disabled={isCrawlerRunning}
              className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                isCrawlerRunning
                  ? 'bg-blue-800 text-white animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
              }`}
            >
              {isCrawlerRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Crawling...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch 8-Agent Crawl</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                onClearLogs();
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-slate-300 hover:text-rose-400 border border-blue-800/60 font-medium transition cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-[#080d1e] border border-blue-800/60 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-400"
            >
              <option value="ALL">All Levels</option>
              <option value="SUCCESS">Success Only</option>
              <option value="PARSE">OCR / Parsing</option>
              <option value="CRAWL">Crawl / HTTP</option>
              <option value="ERROR">Errors</option>
            </select>

            <select
              value={selectedAgentFilter}
              onChange={(e) => setSelectedAgentFilter(e.target.value)}
              className="bg-[#080d1e] border border-blue-800/60 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-400"
            >
              <option value="ALL">All 8 Agents</option>
              {agents.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>

            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition ${
                autoScroll 
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' 
                  : 'bg-blue-950 text-slate-400 border-blue-800/60'
              }`}
            >
              {autoScroll ? 'Auto-scroll ON' : 'Auto-scroll PAUSED'}
            </button>
          </div>
        </div>

        {/* Live Terminal Streaming Body */}
        <div 
          ref={logContainerRef}
          className="flex-1 bg-[#070c1b] p-4 font-mono text-xs overflow-y-auto space-y-1.5 select-text"
        >
          {filteredLogs.length === 0 ? (
            <div className="text-slate-600 text-center py-20">
              No logs matching criteria. Click "Launch 8-Agent Crawl" to start stream.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="flex items-start gap-2.5 py-0.5 hover:bg-blue-950/40 px-2 rounded transition"
              >
                <span className="text-slate-500 shrink-0 text-[11px]">{log.timestamp}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border shrink-0 ${getLevelBadgeClass(log.level)}`}>
                  {log.level}
                </span>
                <span className="text-blue-300 font-bold shrink-0">[{log.agentName}]:</span>
                <span className="text-slate-300 leading-relaxed break-all">{log.message}</span>
              </div>
            ))
          )}
        </div>

        {/* Terminal Footer */}
        <div className="bg-[#0f1b3b] border-t border-blue-900/40 px-5 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>Active Gateway: PPRA Pakistan 24/7 Socket Feed</span>
          </div>
          <span>Total Stream Events: {logs.length}</span>
        </div>

      </div>
    </div>
  );
}
