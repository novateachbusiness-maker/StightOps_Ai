import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck, FileCheck2, Cpu, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ConsultationForm } from '../components/ConsultationForm.tsx';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const prefilledApp = searchParams.get('application') || '';
  const prefilledIndustry = searchParams.get('industry') || '';

  return (
    <div className="py-12 bg-transparent min-h-screen">
      <SeoHead
        title="Request an Industrial Vision Consultation & Optical Feasibility Trial"
        description="Connect with SightOpsAi machine vision engineers to evaluate automated optical inspection, PCB inspection, or surface defect classification for your plant."
        canonicalPath="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Contact & Consultation', path: '/contact' }]} />

        {/* Header */}
        <div className="space-y-4 mb-12 max-w-3xl">
          <div className="text-xs font-semibold text-[#00D2FF] font-mono uppercase tracking-wider bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
            Direct Engineering Inquiry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Consult With Our Vision Specialists
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Discuss your manufacturing quality challenges, part geometries, cycle time constraints, and factory automation requirements with experienced machine vision engineers.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <ConsultationForm
              defaultApplication={prefilledApp}
              defaultIndustry={prefilledIndustry}
            />
          </div>

          {/* Right Column: Office Location & Feasibility Protocol (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-6 sm:p-8 shadow-xl space-y-5">
              <h2 className="text-base font-bold text-[#064E52] border-b border-slate-100 pb-3">
                Laboratory & Registered Office
              </h2>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      Registered Office:
                    </div>
                    <div className="mt-0.5 text-slate-700 leading-relaxed">
                      Flat No. L248, Second Floor, KB Ecocity, Phase 1, Kammasandra, Electronic City, Hebbagodi, Bengaluru, Karnataka - 560100
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#087F8C] shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Technical Inquiries:</div>
                    <div className="font-mono font-medium text-slate-800">
                      {SITE_CONFIG.contactEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#087F8C] shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Engineering Desk:</div>
                    <a
                      href="tel:+917259171733"
                      className="font-mono font-medium text-slate-800 hover:text-[#0066FF] transition-colors"
                    >
                      +91 72591 71733
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">WhatsApp Direct:</div>
                    <a
                      href={SITE_CONFIG.whatsapp.chatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-medium text-slate-800 hover:text-[#25D366] transition-colors"
                    >
                      {SITE_CONFIG.whatsapp.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#087F8C] shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Working Hours:</div>
                    <div className="font-medium text-slate-800">
                      {SITE_CONFIG.operatingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Part Sample Shipment Protocol */}
            <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-[#064E52] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#087F8C]" />
                <span>Sample Part Evaluation Protocol</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optical evaluation cannot be guessed from photos alone. To determine repeatabilities down to microns or verify deep-learning scratch detection:
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#087F8C]">1.</span>
                  <span>Ship 10–20 golden (defect-free) parts and representative defect samples.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#087F8C]">2.</span>
                  <span>We evaluate telecentric vs standard optics, dome vs coaxial strobe illumination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#087F8C]">3.</span>
                  <span>Receive an Optical Feasibility Report with sample images, cycle time, and budget.</span>
                </li>
              </ul>
            </div>

            {/* NDA & IP Assurance */}
            <div className="hover-card-panel bg-white/95 backdrop-blur-md border border-white/30 rounded-xl p-5 text-xs text-slate-700 flex items-start gap-3 shadow-md">
              <ShieldCheck className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#064E52]">Confidentiality Guaranteed: </span>
                All customer drawings, CAD step files, and sample workpieces are handled under mutual non-disclosure agreements (NDAs) to protect your proprietary manufacturing processes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
