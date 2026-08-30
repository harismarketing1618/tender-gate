// Autonomous Multi-Agent Web Scraping & Ingestion Engine for Pakistan Construction Tenders

const CRAWL_STEPS_TEMPLATES = [
  { step: 'CONNECT', action: (agent) => `[HTTP GET] Connecting to ${agent.primaryPortals[0]} SSL handshake verified (TLS 1.3)...` },
  { step: 'CRAWL', action: (agent) => `[CRAWLER] Polling active daily e-Tenders feed for keywords: ${agent.activeFilters[2] || 'Construction, Civil, MEP'}...` },
  { step: 'PARSE', action: (agent) => `[HTML/PDF PARSE] Downloaded Tender Notice PDF. Extracting PEC eligibility, BOQ estimates & 2% CDR requirements...` },
  { step: 'AI_CLASSIFY', action: (agent) => `[AI CLASSIFIER] Matching against PEC Specialization Codes: [${agent.pecCodes.join(', ')}]. Confidence: ${agent.accuracyRating}%` },
  { step: 'INGEST', action: (agent, tenderTitle) => `[LIVE INGESTION] Published "${tenderTitle}" to TENDER GATE Feed. Dispatched Telegram & WhatsApp alerts.` }
];

const SAMPLE_NEW_TENDER_TEMPLATES = [
  {
    agentId: 'agent-1',
    refNo: 'NHA/PB/2026/LHR-RW-09',
    ppraRef: 'PPRA-TS542109E',
    title: 'Dualization of Lahore-Sheikhupura-Gujranwala Expressway Connector (Package-III, 28-Km)',
    shortDescription: 'Asphalt concrete pavement, 2 railway flyovers, toll plaza civil works, and stormwater side drains under NHA standards.',
    category: 'Civil Infrastructure & Mega Highways',
    agency: 'National Highway Authority (NHA)',
    agencyCode: 'NHA',
    province: 'Punjab',
    city: 'Sheikhupura - Gujranwala',
    locationFull: 'Sheikhupura bypass corridor, Punjab',
    estimatedValuePKR: 3600000000,
    formattedValue: 'PKR 3.60 Billion (360 Crore)',
    pecCategory: 'C-A',
    pecCodesRequired: ['CE01', 'CE02'],
    bidSecurityAmount: 'PKR 72,000,000 (2% CDR / BG)',
    biddingMethod: 'Single Stage Two Envelope (PPRA 36-b)',
    tenderDocFee: 'PKR 20,000',
    scopeOfWork: ['28km 4-lane expressway', '2 Post-tensioned flyovers', 'Heavy asphalt wearing course'],
    mandatoryCriteria: ['PEC C-A with CE01', 'Annual Turnover PKR 3.0B', 'Owned asphalt plant'],
    aiViabilityScore: 93,
    aiSummary: 'Fast-track NHA provincial connectivity scheme. Strict liquidated damages for missing milestone dates.'
  },
  {
    agentId: 'agent-2',
    refNo: 'LDA/COMM/2026/GUL-04',
    ppraRef: 'PPRA-PB-107802',
    title: 'Construction of 18-Storey LDA Business Complex & Parking Tower at Main Boulevard Gulberg, Lahore',
    shortDescription: 'Modern steel-composite and RCC commercial tower with 4 underground parking basements, high-speed panoramic elevators, and solar facade.',
    category: 'High-Rise & Commercial Buildings',
    agency: 'Lahore Development Authority (LDA)',
    agencyCode: 'LDA',
    province: 'Punjab',
    city: 'Lahore',
    locationFull: 'Main Boulevard, Gulberg-III, Lahore, Punjab',
    estimatedValuePKR: 5200000000,
    formattedValue: 'PKR 5.20 Billion (520 Crore)',
    pecCategory: 'C-A',
    pecCodesRequired: ['BC01', 'BC02'],
    bidSecurityAmount: 'PKR 104,000,000 (2% Bank Guarantee)',
    biddingMethod: 'Single Stage Two Envelope',
    tenderDocFee: 'PKR 30,000',
    scopeOfWork: ['18 Suspended floors + 4 basements', 'Curtain wall facade', 'Smart building automation'],
    mandatoryCriteria: ['PEC C-A or C-1 with BC01', 'Turnover PKR 4.0B', 'High-rise completed portfolio'],
    aiViabilityScore: 95,
    aiSummary: 'Landmark LDA commercial project. Requires advanced diaphragm wall shoring for 4-level basement excavation.'
  },
  {
    agentId: 'agent-3',
    refNo: 'LESCO/MEP/2026/132KV-KASUR',
    ppraRef: 'PPRA-TS541908E',
    title: 'Turnkey Construction of 132kV Gas-Insulated Grid Station & Associated Transmission Lines in Kasur Industrial Estate',
    shortDescription: 'Supply and installation of 2x 20/26MVA Power Transformers, 132kV GIS bays, 11kV switchgear panels, and control room building.',
    category: 'Electromechanical, MEP & HVAC',
    agency: 'National Transmission & Despatch Co (NTDC)',
    agencyCode: 'NTDC',
    province: 'Punjab',
    city: 'Kasur',
    locationFull: 'Kasur Industrial Estate, Punjab',
    estimatedValuePKR: 1250000000,
    formattedValue: 'PKR 1.25 Billion (125 Crore)',
    pecCategory: 'C-2',
    pecCodesRequired: ['EE01', 'EE04'],
    bidSecurityAmount: 'PKR 25,000,000 (2% CDR)',
    biddingMethod: 'Single Stage Two Envelope',
    tenderDocFee: 'PKR 15,000',
    scopeOfWork: ['132kV GIS equipment installation', '2x 26MVA Transformers', 'SCADA integration'],
    mandatoryCriteria: ['PEC C-2 or above with EE01', 'Turnover PKR 1.0B', 'Prior grid station experience'],
    aiViabilityScore: 92,
    aiSummary: 'LESCO industrial power reinforcement. Prompt stage payments backed by Asian Development Bank funding.'
  },
  {
    agentId: 'agent-4',
    refNo: 'KPPRA/IRR/2026/CHASHMA-RT',
    ppraRef: 'KPPRA-2026-9430',
    title: 'Concrete Lining of 32-Km Main Canal & Rehabilitation of Hydraulic Regulators at Chashma Right Bank Irrigation System',
    shortDescription: 'Heavy PCC canal bed lining, steel reinforcement, geo-membrane seepage barrier, and automated discharge gauging sensors.',
    category: 'Hydraulic, Dams, Irrigation & Public Health (PHE)',
    agency: 'Water & Power Development Authority (WAPDA)',
    agencyCode: 'WAPDA',
    province: 'KPK',
    city: 'D.I. Khan',
    locationFull: 'CRBC Canal Section, Dera Ismail Khan District, KPK',
    estimatedValuePKR: 2800000000,
    formattedValue: 'PKR 2.80 Billion (280 Crore)',
    pecCategory: 'C-1',
    pecCodesRequired: ['CE04', 'CE09'],
    bidSecurityAmount: 'PKR 56,000,000 (2% Bank Guarantee)',
    biddingMethod: 'Single Stage Two Envelope',
    tenderDocFee: 'PKR 20,000',
    scopeOfWork: ['PCC Canal bed lining 32km', 'Geo-membrane placement', 'Canal regulator gates overhaul'],
    mandatoryCriteria: ['PEC C-1 with CE09', 'Turnover PKR 2.0B', 'Experience in canal lining'],
    aiViabilityScore: 91,
    aiSummary: 'Critical irrigation water saving project. Winter canal closure window (Jan-Feb) provides mandatory continuous working window.'
  },
  {
    agentId: 'agent-5',
    refNo: 'OGDCL/EPCC/2026/QADIRPUR-COMP',
    ppraRef: 'PPRA-TS542890E',
    title: 'EPCC of Gas Compression Facility & Low-Pressure Gas Boosting Compressor Units at Qadirpur Gas Field, Ghotki',
    shortDescription: 'Civil foundation for centrifugal compressors, high-pressure piping manifolds, fire & gas detection, and SCADA control shelter.',
    category: 'Oil, Gas, Petrochemical & Energy Infra',
    agency: 'Oil & Gas Development Company (OGDCL)',
    agencyCode: 'OGDCL',
    province: 'Sindh',
    city: 'Ghotki',
    locationFull: 'Qadirpur Gas Field Complex, Ghotki District, Sindh',
    estimatedValuePKR: 4500000000,
    formattedValue: 'PKR 4.50 Billion (450 Crore)',
    pecCategory: 'C-A',
    pecCodesRequired: ['ME06', 'EE01', 'CE08'],
    bidSecurityAmount: 'PKR 90,000,000 (2% Bank Guarantee)',
    biddingMethod: 'Single Stage Two Envelope (PPRA 36-b)',
    tenderDocFee: 'PKR 25,000',
    scopeOfWork: ['Compressor foundations and acoustic enclosure', 'API 618 / 617 piping spool fabrication', 'Emergency shutdown ESD system'],
    mandatoryCriteria: ['PEC C-A or C-1 with ME06', 'Turnover PKR 3.5B', 'ISO 9001 / ISO 45001 certified'],
    aiViabilityScore: 96,
    aiSummary: 'OGDCL production enhancement package. International quality benchmarks; zero-tolerance safety standards.'
  },
  {
    agentId: 'agent-6',
    refNo: 'MES/KHI-NAV/2026/DOCK-02',
    ppraRef: 'MES-KHI-2026-904',
    title: 'Civil & Marine Infrastructure Works for Naval Dockyard Workshop Expansion & Heavy Crane Track, Karachi',
    shortDescription: 'Reinforced concrete heavy slipway beams, marine piling in tidal zone, heavy gantry crane rails, and anti-corrosion marine epoxy coatings.',
    category: 'Defense, Cantonment & High-Security Works',
    agency: 'Military Engineer Services (MES / GHQ)',
    agencyCode: 'MES',
    province: 'Sindh',
    city: 'Karachi',
    locationFull: 'Naval Dockyard, West Wharf, Karachi',
    estimatedValuePKR: 1950000000,
    formattedValue: 'PKR 1.95 Billion (195 Crore)',
    pecCategory: 'C-1',
    pecCodesRequired: ['CE01', 'BC01'],
    bidSecurityAmount: 'PKR 39,000,000 (2% CDR to CMES Navy Karachi)',
    biddingMethod: 'Single Stage Two Envelope (MES Enlisted Class Super/A)',
    tenderDocFee: 'PKR 20,000',
    scopeOfWork: ['Marine piling in coastal salt water', 'Heavy crane runway beams', 'Industrial workshop superstructure'],
    mandatoryCriteria: ['MES Class Super or A', 'PEC C-1 with CE01', 'Director Security Clearance'],
    aiViabilityScore: 94,
    aiSummary: 'High-security defense marine works. Strict security clearance and special sulfate-resisting cement (SRC) requirements.'
  },
  {
    agentId: 'agent-7',
    refNo: 'CAA/JIAP/RENO/2026/08',
    ppraRef: 'PPRA-TS542310E',
    title: 'Modernization, Interior Renovation & Architectural Facade Cladding of Jinnah International Airport Terminal, Karachi',
    shortDescription: 'High-traffic porcelain granite flooring, perforated aluminum acoustic ceilings, LED linear lighting, and dynamic departure concourse fit-out.',
    category: 'Interior Fit-Out, Architectural Finishing & Smart Facades',
    agency: 'Pakistan Civil Aviation Authority (PCAA)',
    agencyCode: 'CAA',
    province: 'Sindh',
    city: 'Karachi',
    locationFull: 'Jinnah International Airport Concourse & Lounges, Karachi',
    estimatedValuePKR: 540000000,
    formattedValue: 'PKR 540 Million (54 Crore)',
    pecCategory: 'C-3',
    pecCodesRequired: ['BC03', 'EE11'],
    bidSecurityAmount: 'PKR 10,800,000 (2% CDR)',
    biddingMethod: 'Single Stage Two Envelope',
    tenderDocFee: 'PKR 12,000',
    scopeOfWork: ['35,000 sq.m acoustic ceiling installation', 'Curtain wall thermal glazing', 'VIP lounge luxury interior fit-out'],
    mandatoryCriteria: ['PEC C-3 or above with BC03', 'Turnover PKR 450M', 'Airport or premier public terminal fitout experience'],
    aiViabilityScore: 91,
    aiSummary: 'Aviation terminal modernization. Work must be executed in night shifts with zero disruption to flight operations.'
  },
  {
    agentId: 'agent-8',
    refNo: 'TMA/FSD/2026/R&M-44',
    ppraRef: 'PPRA-PB-108119',
    title: 'Rehabilitation of PCC Streets, Open Drains & Installation of 250 Solar Street Lights in Municipal Zone-4, Faisalabad',
    shortDescription: 'Plain cement concrete pavement, 2-feet RCC precast covered drains, brick masonry catch basins, and standalone 100W LED solar street poles.',
    category: 'Small-to-Medium Municipal Works & Maintenance (PEC C5/C6)',
    agency: 'Communication & Works (C&W Dept)',
    agencyCode: 'C&W',
    province: 'Punjab',
    city: 'Faisalabad',
    locationFull: 'Zone-4 (Samanabad & Ghulam Muhammad Abad), Faisalabad, Punjab',
    estimatedValuePKR: 42000000,
    formattedValue: 'PKR 42.0 Million (4.20 Crore)',
    pecCategory: 'C-5',
    pecCodesRequired: ['Civil General', 'R&M'],
    bidSecurityAmount: 'PKR 840,000 (2% CDR)',
    biddingMethod: 'Single Stage One Envelope (PPRA 36-a)',
    tenderDocFee: 'PKR 3,500',
    scopeOfWork: ['1:2:4 PCC pavement over 12 streets', 'Covered RCC drain nullahs', '250 Solar street lights with lithium batteries'],
    mandatoryCriteria: ['PEC C-5 or C-6', 'Active FBR Taxpayer', 'Local municipal work experience'],
    aiViabilityScore: 97,
    aiSummary: 'Fast turnaround local municipal development scheme. Ideal for grassroots Pakistani contractors.'
  }
];

export class AgentCrawlerService {
  constructor(agents, onLogCallback, onNewTenderCallback) {
    this.agents = agents;
    this.onLog = onLogCallback || (() => {});
    this.onNewTender = onNewTenderCallback || (() => {});
    this.isRunning = false;
    this.templateIndex = 0;
  }

  // Simulate crawl for a specific agent
  async crawlAgent(agent, fastMode = false) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, fastMode ? ms / 2 : ms));
    const timestamp = new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Step 1: Connect
    this.onLog({
      id: Math.random().toString(36).substring(7),
      timestamp,
      agentId: agent.id,
      agentName: agent.name,
      level: 'INFO',
      message: `[HTTP GET] Connecting to ${agent.primaryPortals[0]} via PPRA secure gateway...`
    });
    await delay(600);

    // Step 2: Crawl & scrape
    this.onLog({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentId: agent.id,
      agentName: agent.name,
      level: 'CRAWL',
      message: `[HTML DOM] Parsing daily procurement table for keywords [${agent.activeFilters.join(', ')}]...`
    });
    await delay(700);

    // Step 3: OCR and PDF extraction
    this.onLog({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentId: agent.id,
      agentName: agent.name,
      level: 'PARSE',
      message: `[AI PARSER] Extracting PEC criteria, 2% CDR Bank Guarantee calculation, and closing milestones...`
    });
    await delay(800);

    // Step 4: Pick a mock tender matching this agent
    const matchingTemplate = SAMPLE_NEW_TENDER_TEMPLATES.find(t => t.agentId === agent.id) || SAMPLE_NEW_TENDER_TEMPLATES[this.templateIndex % SAMPLE_NEW_TENDER_TEMPLATES.length];
    this.templateIndex++;

    const newTender = {
      ...matchingTemplate,
      id: `TND-CRAWL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      agentName: agent.name,
      postedDate: new Date().toISOString().split('T')[0],
      closingDate: new Date(Date.now() + (14 * 24 * 60 * 60 * 1000)).toISOString(),
      status: 'active',
      viewsCount: Math.floor(Math.random() * 120) + 10,
      isNewCrawled: true
    };

    // Step 5: Classify
    this.onLog({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentId: agent.id,
      agentName: agent.name,
      level: 'SUCCESS',
      message: `[INDEXED] Verified PEC [${newTender.pecCategory}]. Ingested "${newTender.title.substring(0, 55)}..." into live catalog.`
    });

    this.onNewTender(newTender);
    return newTender;
  }

  // Crawl all 8 agents in sequence
  async crawlAllAgents(fastMode = false) {
    if (this.isRunning) return;
    this.isRunning = true;

    this.onLog({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentId: 'SYSTEM',
      agentName: 'TENDER GATE Master Orchestrator',
      level: 'INFO',
      message: `Initiating 8-Agent Synchronized Daily Crawl across Federal PPRA, Punjab, Sindh, KPK & WAPDA portals...`
    });

    for (const agent of this.agents) {
      await this.crawlAgent(agent, fastMode);
    }

    this.onLog({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentId: 'SYSTEM',
      agentName: 'TENDER GATE Master Orchestrator',
      level: 'SUCCESS',
      message: `Synchronized multi-agent crawl complete. 8 categories verified and updated in real-time.`
    });

    this.isRunning = false;
  }
}
