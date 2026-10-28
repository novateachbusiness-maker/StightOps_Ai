import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
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

  const solutionsItem = NAVIGATION_ITEMS.find((item) => item.title === 'Solutions');
  const industriesItem = NAVIGATION_ITEMS.find((item) => item.title === 'Industries');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#DCE7E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18" ref={dropdownRef}>
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#064E52] whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-md bg-[#064E52] flex items-center justify-center text-white font-mono text-base font-semibold group-hover:bg-[#087F8C] transition-colors">
              S<span className="text-[#18B6A4]">A</span>
            </div>
            <span>{SITE_CONFIG.name}</span>
          </Link>

          {/* Zone 2: Navigation Links (Single-line, quiet hover states) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#172B32]">
            <Link
              to="/"
              className={`hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/' ? 'text-[#087F8C] font-semibold' : ''
              }`}
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'solutions' ? null : 'solutions')}
                className={`flex items-center gap-1 hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 ${
                  location.pathname.startsWith('/solutions') ? 'text-[#087F8C] font-semibold' : ''
                }`}
                aria-expanded={openDropdown === 'solutions'}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    openDropdown === 'solutions' ? 'rotate-180 text-[#087F8C]' : 'text-slate-400'
                  }`}
                />
              </button>

              {openDropdown === 'solutions' && solutionsItem?.children && (
                <div className="absolute top-full left-0 mt-3 w-84 bg-white border border-[#DCE7E8] rounded-lg shadow-lg p-3 grid gap-1.5 z-50">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Inspection Systems
                  </div>
                  {solutionsItem.children.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="px-3 py-2 rounded-md hover:bg-[#F4F8F8] transition-colors block text-left group"
                    >
                      <div className="text-sm font-medium text-[#172B32] group-hover:text-[#087F8C]">
                        {sub.title}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{sub.description}</p>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-[#DCE7E8]">
                    <Link
                      to="/solutions"
                      className="px-3 py-1.5 text-xs font-semibold text-[#087F8C] hover:underline flex items-center justify-between"
                    >
                      <span>View All Solutions Overview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'industries' ? null : 'industries')}
                className={`flex items-center gap-1 hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 ${
                  location.pathname.startsWith('/industries') ? 'text-[#087F8C] font-semibold' : ''
                }`}
                aria-expanded={openDropdown === 'industries'}
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    openDropdown === 'industries' ? 'rotate-180 text-[#087F8C]' : 'text-slate-400'
                  }`}
                />
              </button>

              {openDropdown === 'industries' && industriesItem?.children && (
                <div className="absolute top-full left-0 mt-3 w-84 bg-white border border-[#DCE7E8] rounded-lg shadow-lg p-3 grid gap-1.5 z-50">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Manufacturing Sectors
                  </div>
                  {industriesItem.children.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="px-3 py-2 rounded-md hover:bg-[#F4F8F8] transition-colors block text-left group"
                    >
                      <div className="text-sm font-medium text-[#172B32] group-hover:text-[#087F8C]">
                        {sub.title}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{sub.description}</p>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-[#DCE7E8]">
                    <Link
                      to="/industries"
                      className="px-3 py-1.5 text-xs font-semibold text-[#087F8C] hover:underline flex items-center justify-between"
                    >
                      <span>Explore All Industries</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/technologies"
              className={`hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/technologies' ? 'text-[#087F8C] font-semibold' : ''
              }`}
            >
              Technologies
            </Link>

            <Link
              to="/applications"
              className={`hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/applications' ? 'text-[#087F8C] font-semibold' : ''
              }`}
            >
              Applications
            </Link>

            <Link
              to="/resources"
              className={`hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname.startsWith('/resources') ? 'text-[#087F8C] font-semibold' : ''
              }`}
            >
              Resources
            </Link>

            <Link
              to="/about"
              className={`hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/about' ? 'text-[#087F8C] font-semibold' : ''
              }`}
            >
              About Us
            </Link>
          </nav>

          {/* Zone 3: Single Primary Action CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#064E52] hover:bg-[#087F8C] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              Request a Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/contact"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#064E52] rounded-md whitespace-nowrap shrink-0"
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DCE7E8] bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            className="block py-2 text-base font-medium text-slate-900 border-b border-slate-100"
          >
            Home
          </Link>

          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider py-1">
              Solutions
            </div>
            <div className="pl-3 space-y-1">
              <Link to="/solutions" className="block py-1 text-sm text-slate-700 font-medium">
                All Solutions Overview
              </Link>
              {solutionsItem?.children?.map((sub) => (
                <Link key={sub.href} to={sub.href} className="block py-1 text-xs text-slate-600">
                  {sub.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider py-1">
              Industries
            </div>
            <div className="pl-3 space-y-1">
              <Link to="/industries" className="block py-1 text-sm text-slate-700 font-medium">
                All Industries Overview
              </Link>
              {industriesItem?.children?.map((sub) => (
                <Link key={sub.href} to={sub.href} className="block py-1 text-xs text-slate-600">
                  {sub.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/technologies"
            className="block py-2 text-base font-medium text-slate-900 border-b border-slate-100"
          >
            Technologies
          </Link>
          <Link
            to="/applications"
            className="block py-2 text-base font-medium text-slate-900 border-b border-slate-100"
          >
            Applications & Case Studies
          </Link>
          <Link
            to="/resources"
            className="block py-2 text-base font-medium text-slate-900 border-b border-slate-100"
          >
            Resources & Guides
          </Link>
          <Link
            to="/about"
            className="block py-2 text-base font-medium text-slate-900 border-b border-slate-100"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block w-full text-center py-2.5 text-sm font-semibold text-white bg-[#064E52] rounded-lg mt-3"
          >
            Request a Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
