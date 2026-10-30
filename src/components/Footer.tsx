import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2545]/90 backdrop-blur-md text-white pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/20 bg-white p-1.5 shrink-0 flex items-center justify-center shadow-sm">
                <img
                  src={SITE_CONFIG.logo.main}
                  alt={SITE_CONFIG.logo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  Sight<span className="text-[#00D2FF]">OpsAi</span>
                </span>
                <div className="text-[10px] font-mono text-slate-300 tracking-wider uppercase mt-0.5">
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
                <span className="leading-relaxed">
                  <span className="font-semibold text-white">Registered Office:</span> {SITE_CONFIG.registeredOffice}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00D2FF] shrink-0" />
                <span className="font-mono">{SITE_CONFIG.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00D2FF] shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="font-mono hover:text-[#00D2FF] transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
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
              <li className="pt-2">
                <Link to="/industries" className="text-[#00D2FF] hover:underline font-semibold flex items-center gap-1">
                  <span>View All 5 Industries</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Technologies & Capabilities */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00D2FF] mb-4 font-mono">
              Technologies & Vision
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/technologies" className="hover:text-white transition-colors">
                  Deep Learning & Anomaly Segmentation
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="hover:text-white transition-colors">
                  Sub-Pixel Telecentric Metrology
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="hover:text-white transition-colors">
                  Industrial Optics & Strobe Lighting
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="hover:text-white transition-colors">
                  Edge AI & Jetson Accelerator IPCs
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="hover:text-white transition-colors">
                  Deterministic PLC & Robot Handshakes
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/technologies" className="text-[#00D2FF] hover:underline font-semibold flex items-center gap-1">
                  <span>Explore Technology Stack</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Navigation */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00D2FF] mb-4 font-mono">
              Navigation & Company
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-white transition-colors">
                  Application Benchmarks
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Knowledge Centre & Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About SightOpsAi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Consultation
                </Link>
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
            <span className="font-semibold text-slate-200">Engineering Note:</span> Inspection repeatabilities, cycle times, optical resolution, and false rejection rates depend on workpiece presentation, optical geometry, lighting wavelength, camera sensor calibration, line speed, and dataset verification. Visualizations provided on this website are illustrative engineering demonstrations. SightOpsAi designs systems to specific customer acceptance criteria established during formal feasibility trials.
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
