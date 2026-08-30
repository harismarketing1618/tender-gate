import express from 'express';
import cors from 'cors';
import { rufloSecurityHeaders, rufloRateLimiter, rufloInputSanitizer } from './middleware/rufloGuard.js';
import tendersRouter from './routes/tenders.js';
import agentsRouter from './routes/agents.js';
import analyticsRouter from './routes/analytics.js';
import securityRouter from './routes/security.js';
import alertsRouter from './routes/alerts.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body Parsers
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Ruflo Zero-Trust Security Middleware
app.use(rufloSecurityHeaders);
app.use(rufloRateLimiter);
app.use(rufloInputSanitizer);

// Root Landing: Interactive Backend API Explorer & Status Dashboard
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TENDER GATE | Backend API Explorer & Control Center</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans min-h-screen antialiased p-4 sm:p-8 selection:bg-emerald-600 selection:text-white">
  
  <div class="max-w-5xl mx-auto space-y-6">
    
    <!-- Top Header -->
    <header class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a1f18] to-slate-900 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
      <div class="space-y-1.5">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🏢</span>
          <h1 class="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-white">TENDER GATE Enterprise Backend</h1>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">v1.0.0 ONLINE</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-400 font-medium">
          Express REST API with Zero-Trust RuFlo v3.38 Defense, 8 Autonomous Crawler Bots & Real-Time PPRA Intelligence
        </p>
      </div>

      <div class="flex items-center gap-3">
        <a href="http://localhost:5173" target="_blank" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition flex items-center gap-1.5 shadow-lg shadow-blue-600/30">
          <span>Open Frontend App (5173)</span>
          <span>↗</span>
        </a>
      </div>
    </header>

    <!-- Metrics Ribbon -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
      <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div class="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">Server Status</div>
        <div class="text-xl font-black text-emerald-400 font-mono flex items-center justify-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>HEALTHY</span>
        </div>
        <div class="text-[10px] text-slate-500 mt-1">Port 5000 • CORS Enabled</div>
      </div>

      <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div class="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">RuFlo Security</div>
        <div class="text-xl font-black text-emerald-400 font-mono">ACTIVE</div>
        <div class="text-[10px] text-slate-500 mt-1">120 req/min Rate Limiter</div>
      </div>

      <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div class="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">AI Crawler Bots</div>
        <div class="text-xl font-black text-blue-400 font-mono">8 Agents</div>
        <div class="text-[10px] text-slate-500 mt-1">24 Portals Monitored</div>
      </div>

      <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div class="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">Pipeline Tracked</div>
        <div class="text-xl font-black text-amber-400 font-mono">PKR 54.2B</div>
        <div class="text-[10px] text-slate-500 mt-1">19 Live Tenders</div>
      </div>
    </div>

    <!-- API Endpoints Interactive Directory -->
    <div class="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base sm:text-lg font-black font-['Outfit'] text-white uppercase tracking-tight">
          Interactive REST API Endpoints
        </h2>
        <span class="text-xs text-slate-400 font-mono">Click any endpoint to inspect live JSON</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
        
        <!-- Health -->
        <a href="/api/health" target="_blank" class="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition flex items-center justify-between group">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-black text-[10px]">GET</span>
            <span class="text-slate-200 group-hover:text-emerald-300 font-bold">/api/health</span>
          </div>
          <span class="text-slate-500 group-hover:text-slate-300 text-[11px]">Server Health & Uptime ↗</span>
        </a>

        <!-- Tenders List -->
        <a href="/api/tenders" target="_blank" class="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition flex items-center justify-between group">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-black text-[10px]">GET</span>
            <span class="text-slate-200 group-hover:text-blue-300 font-bold">/api/tenders</span>
          </div>
          <span class="text-slate-500 group-hover:text-slate-300 text-[11px]">All Live Tenders Feed ↗</span>
        </a>

        <!-- Filtered Tenders (PEC C-A) -->
        <a href="/api/tenders?pecCategory=C-A" target="_blank" class="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 transition flex items-center justify-between group">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-black text-[10px]">GET</span>
            <span class="text-slate-200 group-hover:text-amber-300 font-bold">/api/tenders?pecCategory=C-A</span>
          </div>
          <span class="text-slate-500 group-hover:text-slate-300 text-[11px]">Mega Tenders (>1B) ↗</span>
        </a>

        <!-- Agents -->
        <a href="/api/agents" target="_blank" class="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/50 transition flex items-center justify-between group">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-black text-[10px]">GET</span>
            <span class="text-slate-200 group-hover:text-purple-300 font-bold">/api/agents</span>
          </div>
          <span class="text-slate-500 group-hover:text-slate-300 text-[11px]">8 AI Crawler Bot Status ↗</span>
        </a>

        <!-- Analytics -->
        <a href="/api/analytics" target="_blank" class="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/50 transition flex items-center justify-between group">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-black text-[10px]">GET</span>
            <span class="text-slate-200 group-hover:text-orange-300 font-bold">/api/analytics</span>
          </div>
          <span class="text-slate-500 group-hover:text-slate-300 text-[11px]">Market Pipeline Metrics ↗</span>
        </a>

        <!-- Security Status -->
        <a href="/api/security/status" target="_blank" class="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition flex items-center justify-between group">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-black text-[10px]">GET</span>
            <span class="text-slate-200 group-hover:text-emerald-300 font-bold">/api/security/status</span>
          </div>
          <span class="text-slate-500 group-hover:text-slate-300 text-[11px]">RuFlo Defense Guard ↗</span>
        </a>

      </div>
    </div>

    <footer class="text-center text-xs text-slate-500">
      TENDER GATE Enterprise Backend Server • Node.js ${process.version} • Running on Port ${PORT}
    </footer>

  </div>

</body>
</html>`);
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'TENDER GATE Enterprise Backend',
    version: '1.0.0',
    securityEngine: 'RuFlo-ZeroTrust-v3.38',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// API Routes Mounting
app.use('/api/tenders', tendersRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/security', securityRouter);
app.use('/api/alerts', alertsRouter);

// 404 Route Handler
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `API Route [${req.method} ${req.originalUrl}] does not exist.`
    });
  }
  next();
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[TENDER GATE Server Error]:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 TENDER GATE Backend Server running on http://localhost:${PORT}`);
  console.log(`🛡️  RuFlo Zero-Trust Guard: ACTIVE`);
  console.log(`📡 Endpoints: /api/tenders, /api/agents, /api/analytics, /api/security`);
  console.log(`====================================================`);
});

export default app;
