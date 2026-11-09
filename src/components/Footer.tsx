import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, MessageCircle, Cpu, Code2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="pt-16 pb-0 border-t text-white"
      style={{
        background: 'rgba(2, 10, 30, 0.80)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderColor: 'rgba(56, 189, 248, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>

          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden p-1.5 shrink-0 flex items-center justify-center shadow-sm"
                style={{ border: '1px solid rgba(56, 189, 248, 0.3)', background: 'rgba(255,255,255,0.08)' }}
              >
                <img
                  src={SITE_CONFIG.logo.main}
                  alt={SITE_CONFIG.logo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  Sight<span style={{ color: '#00E5FF' }}>OpsAi</span>
                </span>
                <div className="text-[10px] font-mono tracking-wider uppercase mt-0.5" style={{ color: '#38BDF8' }}>
                  {SITE_CONFIG.tagline}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              {SITE_CONFIG.subheadline}
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono" style={{ color: '#00E5FF' }}>
              <span>VISION</span>
              <span aria-hidden="true">·</span>
              <span>INTELLIGENCE</span>
              <span aria-hidden="true">·</span>
              <span>CUTTING-EDGE TECH</span>
            </div>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#00E5FF' }} />
                <span className="leading-relaxed">
                  <span className="font-semibold text-white">Registered Office:</span> {SITE_CONFIG.registeredOffice}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#00E5FF' }} />
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="font-mono hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: '#00E5FF' }} />
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="font-mono hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 shrink-0" style={{ color: '#25D366' }} />
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
            <div className="text-xs font-semibold uppercase tracking-wider mb-4 font-mono" style={{ color: '#00E5FF' }}>
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
                  Electronics &amp; PCB Inspection
                </Link>
              </li>
              <li>
                <Link to="/industries/food-packaging-inspection" className="hover:text-white transition-colors">
                  Food &amp; Packaging Inspection
                </Link>
              </li>
              <li>
                <Link to="/industries/logistics-product-inspection" className="hover:text-white transition-colors">
                  Logistics &amp; Product Inspection
                </Link>
              </li>
              <li>
                <Link to="/industries/pharmaceutical-inspection" className="hover:text-white transition-colors">
                  Pharmaceutical Inspection
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/industries"
                  className="font-semibold flex items-center gap-1 hover:underline transition-colors"
                  style={{ color: '#00E5FF' }}
                >
                  <span>View All 5 Industries</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Technologies & Capabilities */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-4 font-mono" style={{ color: '#00E5FF' }}>
              Technologies &amp; Vision
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link to="/technologies" className="hover:text-white transition-colors">Deep Learning &amp; Anomaly Segmentation</Link></li>
              <li><Link to="/technologies" className="hover:text-white transition-colors">Sub-Pixel Telecentric Metrology</Link></li>
              <li><Link to="/technologies" className="hover:text-white transition-colors">Industrial Optics &amp; Strobe Lighting</Link></li>
              <li><Link to="/technologies" className="hover:text-white transition-colors">Edge AI &amp; Jetson Accelerator IPCs</Link></li>
              <li><Link to="/technologies" className="hover:text-white transition-colors">Deterministic PLC &amp; Robot Handshakes</Link></li>
              <li className="pt-2">
                <Link
                  to="/technologies"
                  className="font-semibold flex items-center gap-1 hover:underline transition-colors"
                  style={{ color: '#00E5FF' }}
                >
                  <span>Explore Technology Stack</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Navigation */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-4 font-mono" style={{ color: '#00E5FF' }}>
              Navigation &amp; Company
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Application Benchmarks</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Knowledge Centre &amp; Guides</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About SightOpsAi</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact &amp; Consultation</Link></li>
              <li className="pt-2 text-[11px] text-slate-400">
                <span>LinkedIn Company Page: </span>
                <span className="italic block mt-0.5 text-slate-400">
                  {SITE_CONFIG.socials.linkedinStatus}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Development Attribution Banner ── */}
        <div
          className="my-8 rounded-2xl p-6"
          style={{
            background: 'rgba(8, 25, 55, 0.70)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-2">
              {/* Status badge */}
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: '#00E5FF', boxShadow: '0 0 6px #00E5FF' }}
                />
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-widest"
                  style={{ color: '#00E5FF' }}
                >
                  IN DEVELOPMENT
                </span>
              </div>
              <p className="text-sm text-slate-200 font-medium">
                SightOps AI is currently under development as we work towards delivering intelligent industrial AI solutions.
              </p>
            </div>

            {/* Attribution */}
            <div
              className="flex flex-col gap-2 shrink-0 pl-5 sm:border-l"
              style={{ borderColor: 'rgba(56, 189, 248, 0.2)' }}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#38BDF8' }}>
                Development Support
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 shrink-0" style={{ color: '#00E5FF' }} />
                <span className="text-sm font-bold text-white">Shah Tishy</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 shrink-0" style={{ color: '#3B82F6' }} />
                <span className="text-sm font-bold text-white">Python Community India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Disclaimer & Legal Notice */}
        <div className="pb-8 text-xs text-slate-400 space-y-4">
          <p className="leading-relaxed p-4 rounded-xl text-[11px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="font-semibold text-slate-200">Engineering Note:</span> Inspection repeatabilities, cycle times, optical resolution, and false rejection rates depend on workpiece presentation, optical geometry, lighting wavelength, camera sensor calibration, line speed, and dataset verification. Visualizations provided on this website are illustrative engineering demonstrations. SightOpsAi designs systems to specific customer acceptance criteria established during formal feasibility trials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t text-[11px]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-slate-400">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              <span className="ml-3 text-slate-500">Developed with support from Shah Tishy and Python Community India.</span>
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
