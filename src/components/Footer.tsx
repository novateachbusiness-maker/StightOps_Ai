import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2545] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 bg-white p-0.5 shrink-0 flex items-center justify-center">
                <img
                  src={SITE_CONFIG.logo.main}
                  alt={SITE_CONFIG.logo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Sight<span className="text-[#00D2FF]">Ops</span> AI
                </span>
                <div className="text-[10px] font-mono text-slate-300 tracking-wider uppercase">
                  {SITE_CONFIG.tagline}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              {SITE_CONFIG.subheadline}
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#00D2FF]">
              <span>VISION</span>
              <span aria-hidden="true">·</span>
              <span>INTELLIGENCE</span>
              <span aria-hidden="true">·</span>
              <span>CUTTING-EDGE TECH</span>
            </div>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.postalCode}, {SITE_CONFIG.address.country}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00D2FF] shrink-0" />
                <span className="font-mono">{SITE_CONFIG.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00D2FF] shrink-0" />
                <span className="font-mono">{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={SITE_CONFIG.whatsapp.chatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors underline font-mono text-xs"
                >
                  WhatsApp: {SITE_CONFIG.whatsapp.displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00D2FF] mb-4 font-mono">
              Vision Solutions
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/solutions/ai-visual-inspection" className="hover:text-white transition-colors">
                  AI Visual Inspection
                </Link>
              </li>
              <li>
                <Link to="/solutions/pcb-aoi" className="hover:text-white transition-colors">
                  Automated PCB Inspection
                </Link>
              </li>
              <li>
                <Link to="/solutions/ocr-barcode-inspection" className="hover:text-white transition-colors">
                  OCR & Barcode Reading
                </Link>
              </li>
              <li>
                <Link to="/solutions/surface-defect-detection" className="hover:text-white transition-colors">
                  Surface Defect Detection
                </Link>
              </li>
              <li>
                <Link to="/solutions/dimensional-measurement" className="hover:text-white transition-colors">
                  Dimensional Measurement
                </Link>
              </li>
              <li>
                <Link to="/solutions/custom-machine-vision" className="hover:text-white transition-colors">
                  Custom Vision Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Consolidated 5 Industries Column */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00D2FF] mb-4 font-mono">
              Core Industries
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/industries/automotive-vision-inspection" className="hover:text-white transition-colors">
                  Automotive Vision Inspection
                </Link>
              </li>
              <li>
                <Link to="/industries/electronics-pcb-inspection" className="hover:text-white transition-colors">
                  Electronics & PCB Inspection
                </Link>
              </li>
              <li>
                <Link to="/industries/food-packaging-inspection" className="hover:text-white transition-colors">
                  Food & Packaging Inspection
                </Link>
              </li>
              <li>
                <Link to="/industries/logistics-product-inspection" className="hover:text-white transition-colors">
                  Logistics & Product Inspection
                </Link>
              </li>
              <li>
                <Link to="/industries/pharmaceutical-inspection" className="hover:text-white transition-colors">
                  Pharmaceutical Inspection
                </Link>
              </li>
            </ul>
          </div>

          {/* Technologies & Company */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00D2FF] mb-4 font-mono">
              Platform & Company
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/technologies" className="hover:text-white transition-colors">
                  Technology Explorer
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-white transition-colors">
                  Application Benchmarks
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Knowledge Centre
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About SightOps AI
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Consultation
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>XML Sitemap</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                <span>LinkedIn Company Page: </span>
                <span className="italic block mt-0.5 text-slate-400">
                  {SITE_CONFIG.socials.linkedinStatus}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Disclaimer & Legal Notice */}
        <div className="pt-8 text-xs text-slate-400 space-y-4">
          <p className="leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 text-[11px]">
            <span className="font-semibold text-slate-200">Engineering Note:</span> Inspection repeatabilities, cycle times, optical resolution, and false rejection rates depend on workpiece presentation, optical geometry, lighting wavelength, camera sensor calibration, line speed, and dataset verification. Visualizations provided on this website are illustrative engineering demonstrations. SightOps AI designs systems to specific customer acceptance criteria established during formal feasibility trials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10 text-[11px]">
            <div className="text-slate-400">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-slate-300">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Engineering Consultation</span>
              <span className="hover:text-white cursor-pointer transition-colors">Acceptance Protocols</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
