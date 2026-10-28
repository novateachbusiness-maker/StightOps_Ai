import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#064E52] text-white pt-16 pb-12 border-t border-[#087F8C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#18B6A4] text-[#064E52] flex items-center justify-center font-mono font-bold text-base">
                SA
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {SITE_CONFIG.subheadline}
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#18B6A4] shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.postalCode}, {SITE_CONFIG.address.country}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#18B6A4] shrink-0" />
                <span className="font-mono">{SITE_CONFIG.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#18B6A4] shrink-0" />
                <span className="font-mono">{SITE_CONFIG.phone}</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#18B6A4] mb-4">
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
                  PCB Automated Optical Inspection
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

          {/* Industries Column */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#18B6A4] mb-4">
              Industries Served
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/industries/electronics-pcb" className="hover:text-white transition-colors">
                  Electronics & SMT
                </Link>
              </li>
              <li>
                <Link to="/industries/automotive-metal" className="hover:text-white transition-colors">
                  Automotive & Metal Parts
                </Link>
              </li>
              <li>
                <Link to="/industries/pharmaceutical-medical" className="hover:text-white transition-colors">
                  Pharma & Medical Devices
                </Link>
              </li>
              <li>
                <Link to="/industries/food-beverage-packaging" className="hover:text-white transition-colors">
                  Food & Beverage Packaging
                </Link>
              </li>
              <li>
                <Link to="/industries/semiconductor" className="hover:text-white transition-colors">
                  Semiconductor Components
                </Link>
              </li>
              <li>
                <Link to="/industries/logistics-traceability" className="hover:text-white transition-colors">
                  Logistics & Sorting
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Resources & Company */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#18B6A4] mb-4">
              Resources & Info
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/technologies" className="hover:text-white transition-colors">
                  Technology Architecture
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-white transition-colors">
                  Application Demonstrations
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Technical Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Engineering Approach
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Consultation
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>XML Sitemap</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Disclaimer & Legal Notice */}
        <div className="pt-8 text-xs text-slate-400 space-y-4">
          <p className="leading-relaxed bg-white/5 p-4 rounded-lg border border-white/10">
            <span className="font-semibold text-slate-300">Engineering Note:</span> Vision inspection accuracy, cycle times, optical resolution, and false rejection rates depend on workpiece presentation, optical geometry, lighting wavelength, camera sensor calibration, line speed, and dataset verification. Visualizations provided on this website are illustrative engineering demonstrations. Stightops Ai designs systems to specific customer acceptance criteria established during formal feasibility trials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
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
