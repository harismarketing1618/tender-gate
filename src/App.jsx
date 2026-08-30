import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AgentHub from './components/AgentHub';
import TenderFeed from './components/TenderFeed';
import TenderDetailModal from './components/TenderDetailModal';
import AgentCrawlerModal from './components/AgentCrawlerModal';
import PecEligibilityCalculatorModal from './components/PecEligibilityCalculatorModal';
import TenderSubmissionModal from './components/TenderSubmissionModal';
import TenderAlertsModal from './components/TenderAlertsModal';
import SavedTendersDrawer from './components/SavedTendersDrawer';
import TenderCompareModal from './components/TenderCompareModal';
import SponsorshipModal from './components/SponsorshipModal';
import RufloSecurityModal from './components/RufloSecurityModal';
import MarketAnalytics from './components/MarketAnalytics';
import HowItWorksGuide from './components/HowItWorksGuide';
import AboutAndFaq from './components/AboutAndFaq';
import Footer from './components/Footer';

import { INITIAL_TENDERS } from './data/tenders';
import { CONSTRUCTION_AGENTS } from './data/agents';
import { soundFX } from './services/soundFx';
import { AgentCrawlerService } from './services/agentCrawlerEngine';
import { rufloSecurity } from './services/rufloSecurity';
import { apiClient } from './services/api';

export default function App() {
  // Main Data States
  const [tenders, setTenders] = useState(() => {
    const local = localStorage.getItem('tendergate_tenders') || localStorage.getItem('pakconstruct_tenders');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        return INITIAL_TENDERS;
      }
    }
    return INITIAL_TENDERS;
  });

  const [agents, setAgents] = useState(CONSTRUCTION_AGENTS);
  const [savedTenderIds, setSavedTenderIds] = useState(() => {
    const local = localStorage.getItem('tendergate_saved_ids') || localStorage.getItem('pakconstruct_saved_ids');
    return local ? JSON.parse(local) : ['TND-PK-2026-001', 'TND-PK-2026-004'];
  });

  const [comparedTenderIds, setComparedTenderIds] = useState([]);

  // Navigation & View: 'tenders' | 'agents' | 'analytics' | 'how-it-works' | 'about'
  const [activeView, setActiveView] = useState('tenders');

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedPec, setSelectedPec] = useState('all');
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modal States
  const [selectedTenderForDetail, setSelectedTenderForDetail] = useState(null);
  const [isCrawlerModalOpen, setIsCrawlerModalOpen] = useState(false);
  const [isPecCalculatorOpen, setIsPecCalculatorOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isSponsorshipModalOpen, setIsSponsorshipModalOpen] = useState(false);
  const [isRufloModalOpen, setIsRufloModalOpen] = useState(false);

  // Crawler State & Logs
  const [logs, setLogs] = useState([
    {
      id: 'init-1',
      timestamp: '09:00:15 AM',
      agentId: 'SYSTEM',
      agentName: 'Master Orchestrator',
      level: 'INFO',
      message: 'TENDER GATE 8-Agent Autonomous Grid online. 24 government gateways connected.'
    },
    {
      id: 'init-2',
      timestamp: '11:15:32 AM',
      agentId: 'agent-1',
      agentName: 'Sheer-Khan AI',
      level: 'SUCCESS',
      message: 'Indexed 12 new highway & road packages from Federal PPRA & NHA.'
    },
    {
      id: 'init-3',
      timestamp: '12:45:00 PM',
      agentId: 'agent-2',
      agentName: 'Memar-AI',
      level: 'SUCCESS',
      message: 'Processed IDAP 500-Bed Tertiary Teaching Hospital Complex Gujranwala.'
    }
  ]);
  const [isCrawlerRunning, setIsCrawlerRunning] = useState(false);
  const [activeScrapingAgentId, setActiveScrapingAgentId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Initial load from Express Backend API
  useEffect(() => {
    async function loadBackendData() {
      const backendTenders = await apiClient.fetchTenders();
      if (backendTenders && backendTenders.length > 0) {
        setTenders(backendTenders);
      }
      const backendAgents = await apiClient.fetchAgents();
      if (backendAgents && backendAgents.length > 0) {
        setAgents(backendAgents);
      }
    }
    loadBackendData();
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('tendergate_tenders', JSON.stringify(tenders));
  }, [tenders]);

  useEffect(() => {
    localStorage.setItem('tendergate_saved_ids', JSON.stringify(savedTenderIds));
  }, [savedTenderIds]);

  // Keyboard shortcut for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]');
        if (input) {
          input.focus();
          input.select();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Setup Crawler Service
  const crawlerServiceRef = useRef(null);

  useEffect(() => {
    crawlerServiceRef.current = new AgentCrawlerService(
      agents,
      (newLog) => {
        setLogs(prev => [...prev.slice(-150), newLog]);
      },
      (newTender) => {
        setTenders(prev => {
          if (prev.some(t => t.refNo === newTender.refNo)) return prev;
          return [newTender, ...prev];
        });
        soundFX.playSuccess();
        showToast(`⚡ ${newTender.agentName} discovered: "${newTender.title.substring(0, 45)}..."`);
      }
    );
  }, [agents]);

  // Trigger Single Agent Scrape
  const handleTriggerAgentScrape = async (agent) => {
    if (activeScrapingAgentId) return;
    setActiveScrapingAgentId(agent.id);
    soundFX.playRadarPing();
    showToast(`🤖 ${agent.name} is now actively scanning ${agent.primaryPortals[0]}...`);

    if (crawlerServiceRef.current) {
      await crawlerServiceRef.current.crawlAgent(agent, true);
    }

    setAgents(prev => prev.map(a => a.id === agent.id ? {
      ...a,
      indexedToday: a.indexedToday + 1,
      lastScrapeTime: 'Just now'
    } : a));

    setActiveScrapingAgentId(null);
    soundFX.playSuccess();
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
  };

  // Trigger All 8 Agents Synchronized Crawl
  const handleRunAllAgents = async () => {
    if (isCrawlerRunning) return;
    setIsCrawlerRunning(true);
    soundFX.playRadarPing();
    showToast(`🚀 Synchronized multi-agent crawl launched for all 8 categories!`);

    if (crawlerServiceRef.current) {
      await crawlerServiceRef.current.crawlAllAgents(true);
    }

    setAgents(prev => prev.map(a => ({
      ...a,
      indexedToday: a.indexedToday + 1,
      lastScrapeTime: 'Just now'
    })));

    setIsCrawlerRunning(false);
    soundFX.playSuccess();
    confetti({ particleCount: 90, spread: 100, origin: { y: 0.6 } });
    showToast(`✅ 8-Agent Synchronized Daily Crawl Finished! New tenders added.`);
  };

  // Clear Logs
  const handleClearLogs = () => {
    soundFX.playPop();
    setLogs([]);
  };

  // Bookmark / Save toggle
  const handleToggleSave = (tender) => {
    if (savedTenderIds.includes(tender.id)) {
      setSavedTenderIds(prev => prev.filter(id => id !== tender.id));
      showToast(`Removed from saved watchlist.`);
    } else {
      setSavedTenderIds(prev => [...prev, tender.id]);
      showToast(`⭐ Saved "${tender.title.substring(0, 35)}..." to Watchlist.`);
    }
  };

  // Compare Toggle
  const handleToggleCompare = (tender) => {
    if (comparedTenderIds.includes(tender.id)) {
      setComparedTenderIds(prev => prev.filter(id => id !== tender.id));
      showToast(`Removed from comparison.`);
    } else {
      if (comparedTenderIds.length >= 3) {
        showToast(`⚠️ You can compare up to 3 tenders at a time.`);
        return;
      }
      setComparedTenderIds(prev => [...prev, tender.id]);
      showToast(`⚖️ Added "${tender.title.substring(0, 30)}..." to Comparison.`);
    }
  };

  // Share via WhatsApp Helper
  const handleShareWhatsApp = (tender) => {
    const text = `*Pakistan Construction Tender Notice*\n\n*${tender.title}*\n\nAgency: ${tender.agency}\nLocation: ${tender.locationFull}\nValue: ${tender.formattedValue}\nPEC License: ${tender.pecCategory}\n2% CDR: ${tender.bidSecurityAmount}\nClosing Date: ${new Date(tender.closingDate).toLocaleDateString('en-PK')}\n\nFound via TENDER GATE Construction Web Platform`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Submit New Custom Tender
  const handleSubmitNewTender = async (newTender) => {
    setTenders(prev => [newTender, ...prev]);
    soundFX.playSuccess();
    showToast(`✅ New tender successfully published to TENDER GATE live directory!`);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    await apiClient.createTender(newTender);
  };

  // Multi-Token Full-Text Search and Filtering Engine
  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      // 1. Category filter
      if (selectedCategory !== 'all' && tender.category !== selectedCategory) {
        return false;
      }
      // 2. Province filter
      if (selectedProvince !== 'all' && tender.province !== selectedProvince) {
        return false;
      }
      // 3. PEC Category filter
      if (selectedPec !== 'all' && tender.pecCategory !== selectedPec) {
        return false;
      }
      // 4. Agency filter
      if (selectedAgency !== 'all' && tender.agencyCode !== selectedAgency) {
        return false;
      }

      // 5. Multi-Token Deep Search Filter
      if (searchQuery.trim() !== '') {
        const queryTerms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
        
        // Build comprehensive searchable text representation
        const searchableCorpus = [
          tender.title,
          tender.shortDescription,
          tender.refNo,
          tender.ppraRef,
          tender.agency,
          tender.agencyCode,
          tender.province,
          tender.city,
          tender.locationFull,
          tender.category,
          tender.agentName,
          tender.pecCategory,
          tender.pecCategory.replace('-', ''), // e.g. "C1", "CA", "C2"
          ...(tender.pecCodesRequired || []),
          ...(tender.scopeOfWork || []),
          ...(tender.mandatoryCriteria || []),
          tender.formattedValue,
          tender.biddingMethod || ''
        ].join(' ').toLowerCase();

        // Check that EVERY token in the search query matches somewhere in the tender's corpus
        const matchesAllTerms = queryTerms.every(term => searchableCorpus.includes(term));
        if (!matchesAllTerms) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.postedDate) - new Date(a.postedDate);
      } else if (sortBy === 'closing-soon') {
        return new Date(a.closingDate) - new Date(b.closingDate);
      } else if (sortBy === 'value-high') {
        return (b.estimatedValuePKR || 0) - (a.estimatedValuePKR || 0);
      } else if (sortBy === 'value-low') {
        return (a.estimatedValuePKR || 0) - (b.estimatedValuePKR || 0);
      }
      return 0;
    });
  }, [tenders, selectedCategory, selectedProvince, selectedPec, selectedAgency, searchQuery, sortBy]);

  // Aggregate Metrics
  const totalValue = tenders.reduce((acc, t) => acc + (t.estimatedValuePKR || 0), 0);
  const totalValueBillion = (totalValue / 1000000000).toFixed(2);

  const savedTendersList = tenders.filter(t => savedTenderIds.includes(t.id));
  const comparedTendersList = tenders.filter(t => comparedTenderIds.includes(t.id));

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 flex flex-col font-sans">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-white border-2 border-blue-600 shadow-2xl text-slate-900 text-xs font-bold px-4 py-3 rounded-2xl flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        savedTendersCount={savedTenderIds.length}
        compareTendersCount={comparedTenderIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenCrawlerModal={() => setIsCrawlerModalOpen(true)}
        onOpenPecCalculator={() => setIsPecCalculatorOpen(true)}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenAlertsModal={() => setIsAlertsModalOpen(true)}
        onOpenSponsorship={() => setIsSponsorshipModalOpen(true)}
        onOpenRufloSecurity={() => setIsRufloModalOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Hero Section (Visible in 'tenders' view) */}
      {activeView === 'tenders' && (
        <HeroSection
          totalTendersCount={tenders.length}
          totalValueBillion={totalValueBillion}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onRunAllAgents={handleRunAllAgents}
          isCrawlerRunning={isCrawlerRunning}
          onOpenCrawlerModal={() => setIsCrawlerModalOpen(true)}
          onOpenPecCalculator={() => setIsPecCalculatorOpen(true)}
          matchingTendersCount={filteredTenders.length}
          tenders={tenders}
          onSelectTender={(tender) => setSelectedTenderForDetail(tender)}
          onSaveTender={handleToggleSave}
          savedTenderIds={savedTenderIds}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'tenders' && (
          <>
            {/* 8 Agent Quick Overview Grid */}
            <div className="bg-white border-b border-[#e8e2d8]">
              <AgentHub
                agents={agents}
                onTriggerAgentScrape={handleTriggerAgentScrape}
                onTriggerAllAgents={handleRunAllAgents}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  const feedElem = document.getElementById('tenders-feed');
                  if (feedElem) feedElem.scrollIntoView({ behavior: 'smooth' });
                }}
                selectedCategory={selectedCategory}
                activeScrapingAgentId={activeScrapingAgentId}
                isAllScraping={isCrawlerRunning}
                onOpenTerminalModal={() => setIsCrawlerModalOpen(true)}
              />
            </div>

            {/* Live Tenders Feed Anchor */}
            <div id="tenders-feed">
              <TenderFeed
                tenders={filteredTenders}
                agents={agents}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedProvince={selectedProvince}
                setSelectedProvince={setSelectedProvince}
                selectedPec={selectedPec}
                setSelectedPec={setSelectedPec}
                selectedAgency={selectedAgency}
                setSelectedAgency={setSelectedAgency}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onOpenDetail={(tender) => setSelectedTenderForDetail(tender)}
                savedTenderIds={savedTenderIds}
                onToggleSave={handleToggleSave}
                onShareWhatsApp={handleShareWhatsApp}
                comparedTenderIds={comparedTenderIds}
                onToggleCompare={handleToggleCompare}
              />
            </div>
          </>
        )}

        {activeView === 'agents' && (
          <div className="py-8 bg-[#faf8f5]">
            <AgentHub
              agents={agents}
              onTriggerAgentScrape={handleTriggerAgentScrape}
              onTriggerAllAgents={handleRunAllAgents}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveView('tenders');
              }}
              selectedCategory={selectedCategory}
              activeScrapingAgentId={activeScrapingAgentId}
              isAllScraping={isCrawlerRunning}
              onOpenTerminalModal={() => setIsCrawlerModalOpen(true)}
            />
          </div>
        )}

        {activeView === 'analytics' && (
          <div className="bg-[#faf8f5]">
            <MarketAnalytics
              tenders={tenders}
              agents={agents}
            />
          </div>
        )}

        {activeView === 'how-it-works' && (
          <HowItWorksGuide
            onOpenPecCalculator={() => setIsPecCalculatorOpen(true)}
            onOpenAlertsModal={() => setIsAlertsModalOpen(true)}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            onExploreTenders={() => {
              setActiveView('tenders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'about' && (
          <AboutAndFaq
            onOpenSponsorship={() => setIsSponsorshipModalOpen(true)}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          />
        )}
      </main>

      {/* Modals & Drawers */}
      
      {/* Tender Detail Dossier Modal */}
      <TenderDetailModal
        tender={selectedTenderForDetail}
        isOpen={!!selectedTenderForDetail}
        onClose={() => setSelectedTenderForDetail(null)}
        isSaved={selectedTenderForDetail ? savedTenderIds.includes(selectedTenderForDetail.id) : false}
        onToggleSave={handleToggleSave}
        onShareWhatsApp={handleShareWhatsApp}
      />

      {/* Side-by-Side Tender Compare Modal */}
      <TenderCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedTenders={comparedTendersList}
        onRemoveFromCompare={(id) => setComparedTenderIds(prev => prev.filter(i => i !== id))}
        onOpenDetail={(tender) => setSelectedTenderForDetail(tender)}
        onClearAllCompare={() => setComparedTenderIds([])}
      />

      {/* Live Agent Terminal Modal */}
      <AgentCrawlerModal
        isOpen={isCrawlerModalOpen}
        onClose={() => setIsCrawlerModalOpen(false)}
        logs={logs}
        onClearLogs={handleClearLogs}
        onTriggerAgentScrape={handleTriggerAgentScrape}
        onTriggerAllAgents={handleRunAllAgents}
        agents={agents}
        isCrawlerRunning={isCrawlerRunning}
        activeScrapingAgentId={activeScrapingAgentId}
      />

      {/* PEC Contractor Eligibility Calculator Modal */}
      <PecEligibilityCalculatorModal
        isOpen={isPecCalculatorOpen}
        onClose={() => setIsPecCalculatorOpen(false)}
        tenders={tenders}
        onOpenTenderDetail={(tender) => setSelectedTenderForDetail(tender)}
      />

      {/* Post / Submit Tender Modal */}
      <TenderSubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        agents={agents}
        onSubmitNewTender={handleSubmitNewTender}
      />

      {/* Tender Alerts Modal */}
      <TenderAlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        agents={agents}
      />

      {/* Sponsorship & Advertising Modal */}
      <SponsorshipModal
        isOpen={isSponsorshipModalOpen}
        onClose={() => setIsSponsorshipModalOpen(false)}
      />

      {/* Ruflo Enterprise Security Modal */}
      <RufloSecurityModal
        isOpen={isRufloModalOpen}
        onClose={() => setIsRufloModalOpen(false)}
      />

      {/* Saved Tenders Drawer */}
      <SavedTendersDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedTenders={savedTendersList}
        onRemoveTender={(id) => setSavedTenderIds(prev => prev.filter(i => i !== id))}
        onClearAll={() => setSavedTenderIds([])}
        onOpenDetail={(tender) => setSelectedTenderForDetail(tender)}
        onShareWhatsApp={handleShareWhatsApp}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveView('tenders');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        agents={agents}
        onOpenSponsorship={() => setIsSponsorshipModalOpen(true)}
        onNavigateView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPecCalculator={() => setIsPecCalculatorOpen(true)}
      />

    </div>
  );
}
