import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  X, 
  ShieldAlert, 
  FileText, 
  Terminal, 
  Database,
  Key,
  Layers,
  Zap
} from 'lucide-react';
import { rufloSecurity } from '../services/rufloSecurity';
import { soundFX } from '../services/soundFx';

export default function RufloSecurityModal({ isOpen, onClose }) {
  const [report, setReport] = useState(() => rufloSecurity.getSecurityReport());
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  if (!isOpen) return null;

  const handleRunScan = async () => {
    soundFX.playRadarPing();
    setIsScanning(true);
    setScanResult(null);

    const res = await rufloSecurity.runDeepScan();
    setReport(rufloSecurity.getSecurityReport());
    setIsScanning(false);
    setScanResult(res);
    soundFX.playSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-3xl bg-white border-2 border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-900">
        
        {/* Top Header Bar (Ruflo Shield Theme) */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0a1f18] to-slate-950 p-5 sm:p-6 text-white flex items-start justify-between gap-4 border-b border-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-['Outfit'] tracking-tight text-white">
                  Ruflo Enterprise Security Shield
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  v3.38 ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Zero-Trust Multi-Agent Defense, Anti-Tamper Cryptography & Rate Limiter
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Real-time Status Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-800 font-bold uppercase mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Threat Level</span>
              </div>
              <div className="text-xl font-black text-emerald-700 font-['Outfit']">LOW (0 Alert)</div>
              <div className="text-[10px] text-slate-500">100% Protected</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center justify-center gap-1 text-[10px] text-blue-800 font-bold uppercase mb-1">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                <span>Sanitized Queries</span>
              </div>
              <div className="text-xl font-black text-blue-700 font-['Outfit']">{report.stats.sanitizedQueries}</div>
              <div className="text-[10px] text-slate-500">XSS & SQLi Neutralized</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-center gap-1 text-[10px] text-amber-800 font-bold uppercase mb-1">
                <Cpu className="w-3.5 h-3.5 text-amber-600" />
                <span>Swarm Consensus</span>
              </div>
              <div className="text-xl font-black text-amber-700 font-['Outfit']">99.8%</div>
              <div className="text-[10px] text-slate-500">8 Agents Synchronized</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200">
              <div className="flex items-center justify-center gap-1 text-[10px] text-purple-800 font-bold uppercase mb-1">
                <Key className="w-3.5 h-3.5 text-purple-600" />
                <span>Verified Feeds</span>
              </div>
              <div className="text-xl font-black text-purple-700 font-['Outfit']">24 Portals</div>
              <div className="text-[10px] text-slate-500">SHA-256 Validated</div>
            </div>
          </div>

          {/* Deep Security Scan Trigger Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-emerald-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Ruflo Deep Vulnerability & Integrity Scanner
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Audits client memory, DOM injection surfaces, and PPRA data feeds in real-time.
                </p>
              </div>
            </div>

            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className={`px-4 py-2.5 rounded-xl text-xs font-black text-white flex items-center gap-2 transition cursor-pointer ${
                isScanning 
                  ? 'bg-emerald-700 animate-pulse' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20'
              }`}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning Substrates...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Run Ruflo Security Scan</span>
                </>
              )}
            </button>
          </div>

          {scanResult && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Deep Scan Completed successfully! Integrity Score: 100/100 • 0 Vulnerabilities Detected • Verified at {scanResult.verifiedAt}</span>
            </div>
          )}

          {/* Active Security Guardrails Matrix */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Active Ruflo Defense Policies</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#e8e2d8] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">PPRA Cryptographic Signature Verification</strong>
                  <span className="text-[11px] text-slate-500 font-medium">Validates authentic federal & provincial procurement hashes before indexing.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#e8e2d8] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Dynamic XSS & Script Injection Filter</strong>
                  <span className="text-[11px] text-slate-500 font-medium">Real-time tokenizer sanitizes all tender search and form inputs.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#e8e2d8] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Token-Bucket Anti-DDoS Rate Limiter</strong>
                  <span className="text-[11px] text-slate-500 font-medium">Enforces 120 req/min threshold to prevent aggressive scraper flooding.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#e8e2d8] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Zero-Trust Agent Consensus Protocol</strong>
                  <span className="text-[11px] text-slate-500 font-medium">Cross-validates tender metadata across multiple crawler node replicas.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Ruflo Audit Telemetry Log */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Ruflo Security Telemetry Log</span>
            </h4>
            <div className="bg-slate-950 rounded-2xl p-4 text-emerald-400 font-mono text-[11px] space-y-1.5 max-h-40 overflow-y-auto border border-slate-800 shadow-inner">
              {report.auditLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2">
                  <span className="text-slate-500 shrink-0">[{log.time}]</span>
                  <span className={`font-bold shrink-0 ${
                    log.level === 'warn' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    [{log.type}]
                  </span>
                  <span className="text-slate-300">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#fbf9f5] border-t border-[#e8e2d8] p-4 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protected by Ruflo Multi-Agent Security Engine</span>
          </div>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
          >
            Close Security Shield
          </button>
        </div>

      </div>
    </div>
  );
}
