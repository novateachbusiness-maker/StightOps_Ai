import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG, NAVIGATION_ITEMS } from '../config/site.ts';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on route change or outside click
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const industriesItem = NAVIGATION_ITEMS.find((item) => item.title === 'Industries');

  return (
    <header className="sticky top-0 z-40 border-b" style={{
      background: 'rgba(3, 20, 56, 0.82)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderColor: 'rgba(56, 189, 248, 0.18)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-22 sm:h-24" ref={dropdownRef}>

          {/* Zone 1: Brand Logo & Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3.5 text-xl font-bold tracking-tight whitespace-nowrap shrink-0 group"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5 transition-transform group-hover:scale-[1.02]"
              style={{ border: '1px solid rgba(56, 189, 248, 0.3)', background: 'rgba(255,255,255,0.08)' }}
            >
              <img
                src={SITE_CONFIG.logo.main}
                alt={SITE_CONFIG.logo.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-[#38BDF8] transition-colors leading-none">
                Sight<span style={{ color: '#00E5FF' }}>OpsAi</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase mt-1 hidden sm:block" style={{ color: '#38BDF8' }}>
                Industrial Vision Systems
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-200">
            <Link
              to="/"
              className={`hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/' ? 'text-[#00E5FF] font-semibold' : ''
              }`}
            >
              Home
            </Link>

            {/* Consolidated 5 Industries Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'industries' ? null : 'industries')}
                className={`flex items-center gap-1 hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  location.pathname.startsWith('/industries') ? 'text-[#00E5FF] font-semibold' : ''
                }`}
                aria-expanded={openDropdown === 'industries'}
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    openDropdown === 'industries' ? 'rotate-180 text-[#00E5FF]' : 'text-slate-400'
                  }`}
                />
              </button>

              {openDropdown === 'industries' && industriesItem?.children && (
                <div
                  className="absolute top-full left-0 mt-3 w-88 rounded-xl shadow-2xl p-3 grid gap-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                  style={{
                    background: 'rgba(5, 18, 50, 0.97)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                  }}
                >
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: '#38BDF8' }}>
                    5 Core Manufacturing Sectors
                  </div>
                  {industriesItem.children.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="px-3 py-2 rounded-lg transition-colors block text-left group"
                      style={{ background: 'transparent' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(37, 99, 235, 0.2)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                        {sub.title}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{sub.description}</p>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1" style={{ borderTop: '1px solid rgba(56, 189, 248, 0.15)' }}>
                    <Link
                      to="/industries"
                      className="px-3 py-1.5 text-xs font-semibold flex items-center justify-between transition-colors"
                      style={{ color: '#00E5FF' }}
                    >
                      <span>Explore Industry Sector Hub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/technologies"
              className={`hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/technologies' ? 'text-[#00E5FF] font-semibold' : ''
              }`}
            >
              Technologies
            </Link>

            <Link
              to="/applications"
              className={`hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/applications' ? 'text-[#00E5FF] font-semibold' : ''
              }`}
            >
              Applications
            </Link>

            <Link
              to="/resources"
              className={`hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname.startsWith('/resources') ? 'text-[#00E5FF] font-semibold' : ''
              }`}
            >
              Resources
            </Link>

            <Link
              to="/about"
              className={`hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/about' ? 'text-[#00E5FF] font-semibold' : ''
              }`}
            >
              About Us
            </Link>
          </nav>

          {/* Zone 3: Status badge + CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* IN DEVELOPMENT status badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0, 229, 255, 0.1)',
                border: '1px solid rgba(0, 229, 255, 0.25)',
              }}
              title="SightOps AI is currently under active development"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: '#00E5FF', boxShadow: '0 0 6px #00E5FF' }}
              />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: '#00E5FF' }}>
                In Development
              </span>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 text-xs font-bold text-white rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
              style={{ background: '#2563EB' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#2563EB')}
            >
              Request a Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/contact"
              className="px-3 py-1.5 text-xs font-bold text-white rounded-md whitespace-nowrap shrink-0"
              style={{ background: '#2563EB' }}
            >
              Consultation
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden px-4 pt-3 pb-6 space-y-3"
          style={{
            background: 'rgba(3, 15, 46, 0.97)',
            borderTop: '1px solid rgba(56, 189, 248, 0.2)',
          }}
        >
          {/* IN DEVELOPMENT mobile badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-full w-fit"
            style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00E5FF', boxShadow: '0 0 6px #00E5FF' }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: '#00E5FF' }}>
              In Development
            </span>
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-white"
            style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.15)' }}
          >
            Home
          </Link>

          <div>
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider py-1" style={{ color: '#38BDF8' }}>
              5 Core Manufacturing Industries
            </div>
            <div className="pl-3 space-y-1">
              <Link
                to="/industries"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-xs text-white font-semibold"
              >
                All Industries Overview
              </Link>
              {industriesItem?.children?.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-xs text-slate-300"
                >
                  {sub.title}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/technologies" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-white" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.15)' }}>
            Technologies
          </Link>
          <Link to="/applications" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-white" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.15)' }}>
            Applications &amp; Case Studies
          </Link>
          <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-white" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.15)' }}>
            Resources &amp; Guides
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-white" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.15)' }}>
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-2.5 text-xs font-bold text-white rounded-lg mt-3"
            style={{ background: '#2563EB' }}
          >
            Request a Consultation
          </Link>

          <div className="pt-3 mt-2 flex items-center justify-between text-xs px-1" style={{ borderTop: '1px solid rgba(56, 189, 248, 0.15)' }}>
            <a
              href="tel:+917259171733"
              className="flex items-center gap-1.5 font-mono text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" style={{ color: '#00E5FF' }} />
              <span>+91 72591 71733</span>
            </a>
            <a
              href={SITE_CONFIG.whatsapp.chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline font-mono"
              style={{ color: '#25D366' }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
