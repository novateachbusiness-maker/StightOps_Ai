# SightOps AI - Premium Industrial Vision Systems Platform

**See Better. Inspect Smarter. Think Ahead.**

A production-grade, full-stack web application for **SightOps AI**, an industrial machine vision and automated optical inspection engineering company delivering AI-driven defect classification, high-speed SMT PCB inspection, robotic guidance, OCR/barcode traceability, and metrology solutions.

---

## 1. Project Overview & Architecture

The application is structured as a full-stack TypeScript project with a decoupled client architecture, server-side Express API, and automated validation.

### Key Capabilities & Pages
- **Home (`/`)**: High-impact industrial hero section, interactive 4-mode vision controller simulator (SMT assembly, telecentric gear metrology, serialized pharma OCR), 8 core solution spotlights, 5-stage engineering workflow, target industries, application case previews, and technical resource highlights.
- **Solutions Hub (`/solutions`)**: Searchable and filterable solutions catalog with 6 dedicated technical deep-dive pages (`/solutions/:slug`):
  - *AI-Based Visual Inspection Systems*
  - *PCB Automated Optical Inspection (AOI)*
  - *OCR and Barcode Inspection Systems*
  - *Surface Defect Detection & Scratch Classification*
  - *Dimensional Inspection & Telecentric Metrology*
  - *Custom Machine Vision Automation Stations*
- **Industries Hub (`/industries`)**: Sector-specific engineering challenges, use cases, and factory integration considerations across:
  - *Electronics & PCB Assembly*
  - *Automotive & Machined Metal*
  - *Pharmaceutical & Medical Devices*
  - *Food & Beverage Packaging*
  - *Semiconductors & Components*
  - *Logistics, Packaging & Traceability*
- **Technology Architecture (`/technologies`)**: Deep breakdown of cameras, optics, lighting geometries, traditional rule-based OpenCV algorithms vs. deep learning trade-offs, edge GPUs (Jetson/IPC), and PLC/MES connectivity.
- **Applications & Case Studies (`/applications`)**: Searchable benchmark gallery with interactive before/after overlay inspector (bounding boxes, ISO print quality grades, GD&T runout, and defect tags).
- **Knowledge Centre (`/resources`)**: Technical engineering articles with reading times, tag filters, and dedicated indexable article pages (`/resources/:slug`).
- **About Us (`/about`)**: Optics-first engineering philosophy, 5-phase solution development lifecycle (Feasibility Study -> CAD Design -> Algorithm Prototyping -> FAT -> SAT), and corporate transparency policy.
- **Contact & Consultation (`/contact`)**: Validated B2B enquiry form connected to backend API (`POST /api/enquiries`), field error indicators, instant reference IDs, and part sample shipping protocols.
- **SEO & Compliance**: Dynamic JSON-LD structured schemas (`Organization`, `BreadcrumbList`, `Service`, `TechArticle`, `FAQPage`), XML sitemap generator (`/sitemap.xml`), and `robots.txt`.

---

## 2. Directory Structure

```text
/
├── .env.example                  # Environment configuration template
├── data/
│   └── enquiries.json            # Persisted B2B enquiry records
├── index.html                    # Single-page entry with preconnected Google fonts
├── metadata.json                 # AI Studio applet capabilities
├── package.json                  # Scripts and dependencies
├── server.ts                     # Full-stack Node.js Express server + Vite middleware
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build & Tailwind configuration
├── src/
│   ├── main.tsx                  # React DOM root entry
│   ├── App.tsx                   # React Router route registry
│   ├── index.css                 # Tailwind v4 theme tokens (Peacock color palette)
│   ├── assets/
│   │   └── images/               # High-resolution industrial vision photography
│   ├── config/
│   │   └── site.ts               # SINGLE CENTRAL BRAND CONFIGURATION FILE
│   ├── data/
│   │   ├── solutions.ts          # Detailed solutions data & FAQs
│   │   ├── industries.ts         # Industry sector profiles & challenges
│   │   ├── technologies.ts       # Optics, algorithms, edge computing specs
│   │   ├── applications.ts       # Benchmark applications with overlay coords
│   │   └── resources.ts          # Technical engineering articles
│   ├── components/
│   │   ├── Header.tsx            # Sticky 3-zone header with dropdowns & drawer
│   │   ├── Footer.tsx            # Technical footer with legal disclaimers
│   │   ├── Breadcrumbs.tsx       # Accessible breadcrumbs with JSON-LD
│   │   ├── SeoHead.tsx           # Dynamic <title>, meta, OpenGraph & schema injector
│   │   ├── ConsultationForm.tsx  # Reusable B2B enquiry form with validation
│   │   └── InteractiveInspectionDemo.tsx # Live vision controller simulator
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── SolutionsPage.tsx
│   │   ├── SolutionDetailPage.tsx
│   │   ├── IndustriesPage.tsx
│   │   ├── IndustryDetailPage.tsx
│   │   ├── TechnologiesPage.tsx
│   │   ├── ApplicationsPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   ├── ResourceDetailPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   └── utils/
│       ├── validation.ts         # Pure email, phone, and form validation
│       ├── validation.test.ts    # Unit tests for validation logic
│       ├── seo.ts                # JSON-LD Schema.org generators
│       └── seo.test.ts           # Unit tests for SEO schemas
```

---

## 3. Brand & Company Customization

All company variables, contact coordinates, domain endpoints, and branding tokens are isolated in a single configuration file:

**File location:** `src/config/site.ts`

```typescript
export const SITE_CONFIG = {
  name: "SightOps AI",                                   // Change company name
  tagline: "See Better. Inspect Smarter. Think Ahead.",
  domain: "[DOMAIN PENDING]",                            // Update to your production domain (e.g. https://sightops.ai)
  contactEmail: "[CONTACT EMAIL]",                       // Update to your corporate email
  phone: "+91 (0) 80 4920 1800",                         // Update telephone
  address: {
    line1: "Industrial Automation & Vision Systems Hub",
    line2: "Electronic City Phase 1",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560100",
    country: "India",
  },
  operatingHours: "Monday – Friday: 09:00 – 18:00 IST",
  // ...
};
```

Updating `src/config/site.ts` updates the header, footer, SEO schemas, contact pages, and metadata automatically.

---

## 4. Local Setup & Running (Windows Command Prompt)

Open **Command Prompt (`cmd.exe`)** and navigate to your project directory.

### Step 1: Install Dependencies
```cmd
cd \path\to\sightops-ai
npm install
```

### Step 2: Environment Configuration
Copy `.env.example` to `.env`:
```cmd
copy .env.example .env
```

### Step 3: Run the Application
The full-stack application runs with Express and Vite integrated:
```cmd
npm run dev
```
Open your browser to: **`http://localhost:3000`**

### Running in Separate Terminals (Optional Option)
If you prefer running the backend API and frontend Vite server independently:

**Terminal 1 (Backend Server):**
```cmd
cd \path\to\sightops-ai
npx tsx server.ts
```

**Terminal 2 (Frontend Client):**
```cmd
cd \path\to\sightops-ai
npx vite --port 3001
```

---

## 5. Running Automated Unit Tests & Build Verification

The project includes unit tests for deterministic validation and schema generation using Node's test runner:

```cmd
npm test
```
Or manually:
```cmd
npx tsx --test src/utils/*.test.ts
```

To compile and verify production build bundles:
```cmd
npm run build
```

---

## 6. Backend API Endpoints

- `GET /api/health`: System health check and runtime environment.
- `POST /api/enquiries`: Validates and records B2B consultation requests. Enforces RFC 5322 email validation, telephone formatting, minimum description lengths, rate limiting, and returns an enquiry reference number (`ST-2026-XXXXX`).
- `GET /api/enquiries`: Lists submitted technical enquiries (saved to `data/enquiries.json`).
- `GET /sitemap.xml`: Generates an XML sitemap of all public routes for search engine indexing.
- `GET /robots.txt`: Search crawler directives allowing full indexing.

---

## 7. Pre-Launch SEO Checklist

Before deploying to your public production domain:

1. **Domain Update:** Replace `[DOMAIN PENDING]` in `src/config/site.ts` and `server.ts` with your live domain (e.g., `https://sightops.ai`).
2. **Email & Phone Configuration:** Replace `[CONTACT EMAIL]` in `src/config/site.ts` with your monitored inbox.
3. **Google Search Console:** Submit `https://your-domain.com/sitemap.xml` in Search Console.
4. **Canonical & OpenGraph Verification:** Inspect `head` metadata to verify absolute canonical URLs match your registered domain.
5. **SMTP / CRM Relay:** In `server.ts`, connect your outbound email service (SendGrid, AWS SES, or Resend) to forward the logged enquiry payload to your sales engineering team.
6. **SSL / HTTPS:** Ensure TLS 1.3 certificate is provisioned on your cloud host.

---

## 8. Deployment Instructions

### Option A: Node.js / Docker / Cloud Run (Recommended for Full-Stack)
Build the frontend and run `server.ts` directly:
```bash
npm run build
NODE_ENV=production node --loader tsx server.ts
```

### Option B: Cloudflare Pages / Vercel / Netlify
1. Build command: `npm run build`
2. Output directory: `dist`
3. Add serverless functions or proxy for `/api/enquiries`.

---

## 9. Production Prerequisites & Integrations

- **Transactional Email Service**: Production SMTP credentials (API key) for dispatching consultation confirmation emails.
- **CRM Integration**: Webhook connector to Salesforce, HubSpot, or Zoho CRM for automated lead routing.
- **Analytics**: Privacy-friendly telemetry (e.g. Plausible or Google Analytics 4) with cookie consent if tracking user sessions.
