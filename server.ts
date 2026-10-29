import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { validateEnquiryForm } from './src/utils/validation.ts';
import { SOLUTIONS } from './src/data/solutions.ts';
import { INDUSTRIES } from './src/data/industries.ts';
import { RESOURCE_ARTICLES } from './src/data/resources.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '5mb' }));

// Ensure data storage directory exists for persistence
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.warn('Could not create data directory, using memory-only store:', err);
  }
}

// In-memory store + file backup
interface StoredEnquiry {
  id: string;
  referenceId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  application: string;
  requirements?: string;
  description: string;
  createdAt: string;
  deliveryStatus: string;
}

let enquiriesStore: StoredEnquiry[] = [];

if (fs.existsSync(ENQUIRIES_FILE)) {
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    enquiriesStore = JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read existing enquiries file:', err);
  }
}

// Simple IP-based rate limiting map
const ipRateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimitMap.get(ip);
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    ipRateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  record.count += 1;
  return true;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SightOps AI Industrial Vision Platform',
    timestamp: new Date().toISOString(),
    environment: isProd ? 'production' : 'development',
    version: '1.0.0',
  });
});

// Consultation Enquiry Submission endpoint
app.post('/api/enquiries', (req: Request, res: Response): void => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please wait a moment before submitting another enquiry.',
    });
    return;
  }

  const { name, company, email, phone, industry, application, requirements, description, consent } = req.body;

  const validation = validateEnquiryForm({
    name,
    company,
    email,
    phone,
    industry,
    application,
    requirements,
    description,
    consent,
  });

  if (!validation.isValid) {
    res.status(400).json({
      success: false,
      error: 'Validation failed. Please correct the highlighted fields.',
      errors: validation.errors,
    });
    return;
  }

  const referenceId = `ST-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const newEnquiry: StoredEnquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    referenceId,
    name: name.trim(),
    company: company.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    industry: industry.trim(),
    application: application.trim(),
    requirements: requirements ? requirements.trim() : undefined,
    description: description.trim(),
    createdAt: new Date().toISOString(),
    deliveryStatus: 'LOGGED_TO_STORAGE_SMTP_PENDING',
  };

  enquiriesStore.unshift(newEnquiry);

  // Persist asynchronously
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiriesStore, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to write enquiry to disk:', err);
  }

  res.status(201).json({
    success: true,
    referenceId,
    message: 'Your application details have been received and logged to our technical queue.',
    deliveryNote:
      'Enquiry saved securely in system storage. Direct automated SMTP/CRM relay is pending production mail server configuration.',
    enquiry: {
      referenceId: newEnquiry.referenceId,
      name: newEnquiry.name,
      company: newEnquiry.company,
      application: newEnquiry.application,
      createdAt: newEnquiry.createdAt,
    },
  });
});

// Consultation Enquiry Query endpoint (for inspection verification)
app.get('/api/enquiries', (req: Request, res: Response) => {
  res.json({
    total: enquiriesStore.length,
    enquiries: enquiriesStore.map((e) => ({
      referenceId: e.referenceId,
      company: e.company,
      industry: e.industry,
      application: e.application,
      createdAt: e.createdAt,
      deliveryStatus: e.deliveryStatus,
    })),
  });
});

// Dynamic robots.txt
app.get('/robots.txt', (req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://sightops.ai/sitemap.xml
`);
});

// Dynamic sitemap.xml
app.get('/sitemap.xml', (req: Request, res: Response) => {
  const baseUrl = 'https://sightops.ai';
  const staticRoutes = [
    '',
    '/solutions',
    '/industries',
    '/technologies',
    '/applications',
    '/resources',
    '/about',
    '/contact',
  ];

  const solutionRoutes = SOLUTIONS.map((s) => `/solutions/${s.slug}`);
  const industryRoutes = INDUSTRIES.map((i) => `/industries/${i.slug}`);
  const resourceRoutes = RESOURCE_ARTICLES.map((r) => `/resources/${r.slug}`);

  const allRoutes = [...staticRoutes, ...solutionRoutes, ...industryRoutes, ...resourceRoutes];

  const xmlUrls = allRoutes
    .map((route) => {
      const priority = route === '' ? '1.0' : route.includes('/solutions') ? '0.9' : '0.8';
      return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`);
});

// Vite or Static file serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Server] SightOps AI server running on port ${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
