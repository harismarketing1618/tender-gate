import React from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  MapPin, 
  Building2, 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Sparkles, 
  Bot, 
  X 
} from 'lucide-react';
import TenderCard from './TenderCard';
import { PEC_CATEGORIES, PROVINCES_AND_REGIONS, MAJOR_PROCURING_AGENCIES } from '../data/pakistanMeta';
import { soundFX } from '../services/soundFx';

export default function TenderFeed({
  tenders,
  agents,
  selectedCategory,
  setSelectedCategory,
  selectedProvince,
  setSelectedProvince,
  selectedPec,
  setSelectedPec,
  selectedAgency,
  setSelectedAgency,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  onOpenDetail,
  savedTenderIds,
  onToggleSave,
  onShareWhatsApp,
  comparedTenderIds,
  onToggleCompare
}) {
  // Reset all filters
  const handleResetFilters = () => {
    soundFX.playPop();
    setSelectedCategory('all');
    setSelectedProvince('all');
    setSelectedPec('all');
    setSelectedAgency('all');
    setSearchQuery('');
    setSortBy('newest');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedProvince !== 'all' || 
    selectedPec !== 'all' || 
    selectedAgency !== 'all' || 
    searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#faf8f5] text-slate-900">
      {/* Category Tabs (The 8 Agents / Construction Categories) */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit']">
              Live Construction Tenders Directory
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            Showing <strong className="text-blue-700 font-black">{tenders.length}</strong> verified tenders
          </span>
        </div>

        {/* 8 Agent Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => {
              soundFX.playPop();
              setSelectedCategory('all');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white hover:bg-[#f5efe6] text-slate-700 border border-[#e6dacb]'
            }`}
          >
            <span>All 8 Categories</span>
          </button>

          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => {
                soundFX.playPop();
                setSelectedCategory(agent.category);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === agent.category
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-[#f5efe6] text-slate-700 border border-[#e6dacb]'
              }`}
            >
              <span>{agent.avatar}</span>
              <span>{agent.shortCategory}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toolbar */}
      <div className="mb-6 bg-white border border-[#e6dacb] rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword / agency / ID..."
              className="w-full bg-[#fbf9f5] border border-[#e2d5c3] text-slate-900 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Province Dropdown */}
          <div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full bg-[#fbf9f5] border border-[#e2d5c3] text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium transition"
            >
              {PROVINCES_AND_REGIONS.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.name}
                </option>
              ))}
            </select>
          </div>

          {/* PEC Category Dropdown */}
          <div>
            <select
              value={selectedPec}
              onChange={(e) => setSelectedPec(e.target.value)}
              className="w-full bg-[#fbf9f5] border border-[#e2d5c3] text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium transition"
            >
              <option value="all">All PEC Classes (C-A to C-6)</option>
              {PEC_CATEGORIES.map((pec) => (
                <option key={pec.code} value={pec.code}>
                  PEC {pec.code} ({pec.limit.split('(')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Procuring Agency Dropdown */}
          <div>
            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="w-full bg-[#fbf9f5] border border-[#e2d5c3] text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium transition"
            >
              {MAJOR_PROCURING_AGENCIES.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown & Reset */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 bg-[#fbf9f5] border border-[#e2d5c3] text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium transition"
            >
              <option value="newest">Newest First</option>
              <option value="closing-soon">Closing Soon (Urgent)</option>
              <option value="value-high">Highest Budget (PKR)</option>
              <option value="value-low">Lowest Budget (PKR)</option>
            </select>

            {/* Reset Filters button */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                title="Reset All Filters"
                className="p-2 rounded-xl bg-[#f5efe6] hover:bg-[#ede3d5] text-[#7a5632] hover:text-slate-900 transition cursor-pointer border border-[#e2d5c3]"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Active Search & Filter Status Ribbon */}
      {searchQuery.trim() !== '' && (
        <div className="mb-4 flex items-center justify-between p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
          <div className="flex items-center gap-2 font-semibold">
            <Search className="w-4 h-4 text-blue-600" />
            <span>Search results for: <strong className="font-bold">"{searchQuery}"</strong> ({tenders.length} found)</span>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Tenders Grid */}
      {tenders.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-[#e6dacb] p-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#f5efe6] text-slate-500 flex items-center justify-center mx-auto mb-4 text-3xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No Tenders Match "{searchQuery || 'Your Filters'}"
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5 font-medium">
            Try checking for spelling, broadening your PEC category, or searching for keywords like "highway", "hospital", "substation", "pipeline", or "dam".
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer"
          >
            Clear All Filters & Show All Tenders
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenders.map((tender) => (
            <TenderCard
              key={tender.id}
              tender={tender}
              onOpenDetail={onOpenDetail}
              isSaved={savedTenderIds.includes(tender.id)}
              onToggleSave={onToggleSave}
              onShareWhatsApp={onShareWhatsApp}
              isCompared={comparedTenderIds.includes(tender.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
