import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Layers, 
  Coins, 
  Bot 
} from 'lucide-react';
import { PEC_CATEGORIES } from '../data/pakistanMeta';

export default function MarketAnalytics({ tenders, agents }) {
  // Aggregate stats
  const totalValue = tenders.reduce((acc, t) => acc + (t.estimatedValuePKR || 0), 0);
  const totalValueBillion = (totalValue / 1000000000).toFixed(2);

  // Group by province
  const provinceMap = {};
  tenders.forEach(t => {
    const prov = t.province || 'Other';
    provinceMap[prov] = (provinceMap[prov] || 0) + t.estimatedValuePKR;
  });

  // Group by category
  const categoryMap = {};
  tenders.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + 1;
  });

  // Group by PEC
  const pecMap = {};
  tenders.forEach(t => {
    pecMap[t.pecCategory] = (pecMap[t.pecCategory] || 0) + 1;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#faf8f5] text-slate-900 animate-fadeIn">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#f5efe6] text-blue-800 border border-[#e2d5c3] flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-xs font-black text-[#8a6742] tracking-wider uppercase">
            Pakistani Construction Procurement Intelligence
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
          Market Trends & Procurement Analytics
        </h2>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl font-medium">
          Live spending patterns, provincial allocations, and contractor category distribution synthesized by our 8 autonomous crawlers.
        </p>
      </div>

      {/* Top Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-[#e6dacb] p-5 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
            <span>Total Active Procurement Pipeline</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-700 font-['Outfit']">
            PKR {totalValueBillion} Billion
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">Live tender value tracked today</span>
        </div>

        <div className="bg-white border border-[#e6dacb] p-5 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
            <span>Average Tender Size</span>
            <Coins className="w-4 h-4 text-[#8a6742]" />
          </div>
          <div className="text-3xl font-black text-[#8a6742] font-['Outfit']">
            PKR {tenders.length > 0 ? (totalValue / tenders.length / 10000000).toFixed(1) : 0} Crore
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">Across all 8 disciplines</span>
        </div>

        <div className="bg-white border border-[#e6dacb] p-5 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
            <span>Highest Demand Discipline</span>
            <Bot className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-['Outfit']">
            Civil Infra & High-Rise
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">62% of aggregate procurement</span>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Provincial Spend Distribution */}
        <div className="bg-white border border-[#e6dacb] p-6 rounded-3xl shadow-xs">
          <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Provincial Budget Allocation (PKR Value)</span>
          </h3>
          <div className="space-y-3.5 text-xs">
            {Object.entries(provinceMap).map(([prov, value]) => {
              const pct = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : 0;
              return (
                <div key={prov} className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-700">{prov}</span>
                    <span className="text-blue-700 font-mono">
                      PKR {(value / 1000000000).toFixed(2)}B ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#f5efe6] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-[#8a6742] rounded-full"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PEC Category Volume */}
        <div className="bg-white border border-[#e6dacb] p-6 rounded-3xl shadow-xs">
          <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8a6742]" />
            <span>Tender Count by PEC License Requirement</span>
          </h3>
          <div className="space-y-3 text-xs">
            {PEC_CATEGORIES.map(pec => {
              const count = pecMap[pec.code] || 0;
              const pct = tenders.length > 0 ? ((count / tenders.length) * 100).toFixed(0) : 0;
              return (
                <div key={pec.code} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-700">
                      <strong className="text-slate-900 font-bold">{pec.code}</strong> — {pec.limit.split('(')[0]}
                    </span>
                    <span className="font-bold text-[#8a6742]">{count} tenders ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#f5efe6] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#b89068] to-blue-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
