import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function AboutPage() {
  return (
    <div className="py-12 bg-transparent min-h-screen">
      <SeoHead
        title="About SightOpsAi | Industrial Machine Vision & Inspection Software"
        description="Learn about SightOpsAi, our journey in AI-powered industrial inspection, and our mission to build reliable, scalable vision technologies for modern manufacturing."
        canonicalPath="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'About Us', path: '/about' }]} />

        {/* Page Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 md:p-12 shadow-xl mb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
              <span>About SightOpsAi</span>
              <span aria-hidden="true">·</span>
              <span>Bengaluru, India</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              See Better. Inspect Smarter. Think Ahead.
            </h1>
          </div>
        </div>

        {/* About Content — exactly 2 paragraphs */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 md:p-12 shadow-xl mb-10">
          <div className="w-full space-y-6">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-left sm:text-justify">
              At SightOpsAi, our journey began with a passion for technology and a vision to make industrial
              inspection smarter. We saw how computer vision and artificial intelligence could transform
              traditional quality inspection by helping industries detect defects, improve accuracy, and
              automate complex processes.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-left sm:text-justify">
              What started as an interest in intelligent vision systems has grown into a mission to build
              practical AI-powered inspection solutions for modern industries. Today, we focus on developing
              innovative, reliable, and scalable vision technologies that help businesses improve quality,
              increase efficiency, and move toward smarter manufacturing.
            </p>
          </div>
        </div>

        {/* Registered Office & Corporate Details */}
        <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 sm:p-8 shadow-xl mb-10 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <MapPin className="w-4 h-4 text-[#0066FF]" />
            <span>Company &amp; Registered Office Details</span>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed space-y-1.5 pt-1">
            <div>
              <span className="font-semibold text-slate-800">Entity:</span> {SITE_CONFIG.name}
            </div>
            <div>
              <span className="font-semibold text-slate-800">Registered Office:</span>{' '}
              {SITE_CONFIG.registeredOffice}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">Official Contact:</span>
              <a href="tel:+917259171733" className="font-mono text-[#0066FF] hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>+91 72591 71733</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">WhatsApp:</span>
              <a
                href={SITE_CONFIG.whatsapp.chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#0066FF] hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3 text-[#25D366]" />
                <span>{SITE_CONFIG.whatsapp.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0B2545]/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have an Inspection Project in Mind?</h3>
            <p className="text-xs text-slate-300">
              Schedule an introductory engineering consultation or ship workpiece samples to our Bengaluru lab.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow whitespace-nowrap shrink-0"
          >
            Start Technical Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
