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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-22 sm:h-24" ref={dropdownRef}>
          {/* Zone 1: Approved Brand Logo & Wordmark (Blue SightOpsAi lettering on white) */}
          <Link
            to="/"
            className="flex items-center gap-3.5 text-xl font-bold tracking-tight text-[#0B2545] whitespace-nowrap shrink-0 group"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm shrink-0 flex items-center justify-center p-1.5 transition-transform group-hover:scale-[1.02]">
              <img
                src={SITE_CONFIG.logo.main}
                alt={SITE_CONFIG.logo.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B2545] group-hover:text-[#0066FF] transition-colors leading-none">
                Sight<span className="text-[#0066FF]">OpsAi</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 tracking-wider uppercase mt-1 hidden sm:block">
                Industrial Vision Systems
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links (Finalized 6 Core Sections) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-700">
            <Link
              to="/"
              className={`hover:text-[#0066FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/' ? 'text-[#0066FF] font-semibold' : ''
              }`}
            >
              Home
            </Link>

            {/* Consolidated 5 Industries Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'industries' ? null : 'industries')}
                className={`flex items-center gap-1 hover:text-[#0066FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  location.pathname.startsWith('/industries') ? 'text-[#0066FF] font-semibold' : ''
                }`}
                aria-expanded={openDropdown === 'industries'}
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    openDropdown === 'industries' ? 'rotate-180 text-[#0066FF]' : 'text-slate-400'
                  }`}
                />
              </button>

              {openDropdown === 'industries' && industriesItem?.children && (
                <div className="absolute top-full left-0 mt-3 w-88 bg-white border border-slate-200 rounded-xl shadow-xl p-3 grid gap-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    5 Core Manufacturing Sectors
                  </div>
                  {industriesItem.children.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors block text-left group"
                    >
                      <div className="text-xs font-bold text-slate-800 group-hover:text-[#0066FF]">
                        {sub.title}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{sub.description}</p>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-slate-100">
                    <Link
                      to="/industries"
                      className="px-3 py-1.5 text-xs font-semibold text-[#0066FF] hover:underline flex items-center justify-between"
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
              className={`hover:text-[#0066FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/technologies' ? 'text-[#0066FF] font-semibold' : ''
              }`}
            >
              Technologies
            </Link>

            <Link
              to="/applications"
              className={`hover:text-[#0066FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/applications' ? 'text-[#0066FF] font-semibold' : ''
              }`}
            >
              Applications
            </Link>

            <Link
              to="/resources"
              className={`hover:text-[#0066FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname.startsWith('/resources') ? 'text-[#0066FF] font-semibold' : ''
              }`}
            >
              Resources
            </Link>

            <Link
              to="/about"
              className={`hover:text-[#0066FF] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/about' ? 'text-[#0066FF] font-semibold' : ''
              }`}
            >
              About Us
            </Link>
          </nav>

          {/* Zone 3: Single Primary Action CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              Request a Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/contact"
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#0066FF] rounded-md whitespace-nowrap shrink-0"
            >
              Consultation
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (6 Finalized Sections) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-900 border-b border-slate-100"
          >
            Home
          </Link>

          <div>
            <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider py-1">
              5 Core Manufacturing Industries
            </div>
            <div className="pl-3 space-y-1">
              <Link
                to="/industries"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-xs text-slate-700 font-semibold"
              >
                All Industries Overview
              </Link>
              {industriesItem?.children?.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-xs text-slate-600"
                >
                  {sub.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/technologies"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-900 border-b border-slate-100"
          >
            Technologies
          </Link>
          <Link
            to="/applications"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-900 border-b border-slate-100"
          >
            Applications & Case Studies
          </Link>
          <Link
            to="/resources"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-900 border-b border-slate-100"
          >
            Resources & Guides
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-900 border-b border-slate-100"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-2.5 text-xs font-bold text-white bg-[#0066FF] rounded-lg mt-3"
          >
            Request a Consultation
          </Link>

          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs px-1">
            <a
              href="tel:+917259171733"
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#0066FF] font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>+91 72591 71733</span>
            </a>
            <a
              href={SITE_CONFIG.whatsapp.chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:underline font-mono"
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
