import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Check,
  X,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { APPLICATIONS } from '../data/applications.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    'All',
    'Electronics & PCB Inspection',
    'Automotive Vision Inspection',
    'Food & Packaging Inspection',
    'Logistics & Product Inspection',
    'Pharmaceutical Inspection',
  ];

  const filteredApplications = APPLICATIONS.filter((app) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      app.industry.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(app.industry.toLowerCase());
    const matchesSearch =
      searchQuery.trim() === '' ||
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.customerProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.inspectedProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    if (filteredApplications.length > 0) {
      const scrollRatio = scrollLeft / Math.max(1, scrollWidth - clientWidth);
      const computedIndex = Math.round(scrollRatio * (filteredApplications.length - 1));
      setActiveIndex(Math.min(Math.max(computedIndex, 0), filteredApplications.length - 1));
    }
  }, [filteredApplications.length]);

  useEffect(() => {
    updateScrollState();
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => updateScrollState();
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateScrollState]);

  // Reset scroll position on filter change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setActiveIndex(0);
  }, [selectedCategory, searchQuery]);

  // Handle URL hash anchor navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && scrollContainerRef.current) {
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount =
      container.clientWidth >= 1024
        ? container.clientWidth * 0.52
        : container.clientWidth * 0.88;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardElements = container.querySelectorAll('[data-card-index]');
    if (cardElements[index]) {
      (cardElements[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SeoHead
        title="Industrial Vision Applications & Case Benchmarks | SightOps AI"
        description="Explore SightOps AI engineering application benchmarks: PCB AOI, automotive transmission defect detection, pharmaceutical serialization, packaging seal integrity, and telecentric metrology."
        canonicalPath="/applications"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Applications', path: '/applications' }]} />

        {/* Section Header */}
        <div className="space-y-4 mb-8 max-w-3xl">
          <div className="text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
            Customer Problems & Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Inspection Application Benchmarks
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every application is structured around real customer manufacturing problems, 5-stage optical workflows, and measurable business value.
          </p>
        </div>

        {/* Engineering Benchmark Disclaimer Banner */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 mb-8 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">Illustrative Engineering Benchmarks:</span> The examples below demonstrate optical methodology and algorithmic results under IPC-A-610, GS1, and ISO/IEC 15415 standards. They illustrate technical capability and do not claim unverified specific customer deployments.
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0066FF] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by part, code, or defect..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
            />
          </div>
        </div>

        {/* Horizontal Navigation Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] animate-pulse" />
              <span className="text-xs font-semibold text-slate-800">
                {filteredApplications.length} {filteredApplications.length === 1 ? 'Benchmark Case' : 'Benchmark Cases'}
              </span>
            </div>
            {selectedCategory !== 'All' && (
              <span className="text-[11px] font-mono text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hidden sm:inline">
                {selectedCategory}
              </span>
            )}
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500 font-mono">
              Card {filteredApplications.length > 0 ? activeIndex + 1 : 0} of {filteredApplications.length}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] text-slate-400 mr-2 hidden md:inline">
              Swipe or click arrows to explore
            </span>
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous application card"
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-400 disabled:hover:border-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next application card"
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-400 disabled:hover:border-slate-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty State if filter yields zero matches */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No applications match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No benchmark cases were found matching "{searchQuery}". Try selecting another category or resetting the search filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Horizontal Flow Carousel */
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-0.5 focus:outline-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              tabIndex={0}
              role="region"
              aria-label="Applications carousel"
            >
              {filteredApplications.map((app, index) => (
                <article
                  key={app.id}
                  id={app.slug}
                  data-card-index={index}
                  className="hover-card-panel w-[88vw] sm:w-[500px] lg:w-[calc(50%-12px)] min-w-[310px] sm:min-w-[480px] lg:min-w-[540px] max-w-[620px] shrink-0 snap-start bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Header Strip */}
                  <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 flex flex-col justify-between gap-3 min-h-[105px]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[11px] font-mono font-semibold text-[#00D2FF] uppercase tracking-wide truncate">
                        {app.industry}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-slate-300 rounded border border-white/15 shrink-0">
                        Case #{index + 1}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white leading-snug line-clamp-2">
                        {app.title}
                      </h2>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                        Part: {app.inspectedProduct}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-6 flex-1 flex flex-col justify-between">
                    {/* Clean Unannotated Industrial Image */}
                    <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-200 aspect-[16/9] w-full shrink-0 flex items-center justify-center select-none shadow-xs">
                      <img
                        src={app.image}
                        alt={app.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                        loading="lazy"
                      />
                    </div>

                    {/* Customer Problem Box */}
                    <div className="hover-card-panel p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1.5 shadow-xs">
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>The Manufacturing Problem:</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {app.customerProblem}
                      </p>
                    </div>

                    {/* Example Input vs Output Description */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="hover-card-panel p-3.5 rounded-lg border border-slate-200 bg-white space-y-1 shadow-xs flex flex-col justify-between">
                        <span className="font-semibold text-slate-700 text-[11px]">Example Input:</span>
                        <p className="text-slate-600 leading-relaxed text-[11px]">
                          {app.exampleInputDescription}
                        </p>
                      </div>

                      <div className="hover-card-panel p-3.5 rounded-lg border border-slate-200 bg-blue-50/60 space-y-1 shadow-xs flex flex-col justify-between">
                        <span className="font-semibold text-[#0066FF] text-[11px]">Inspection Output:</span>
                        <p className="text-slate-700 leading-relaxed text-[11px] font-mono">
                          {app.exampleOutputDescription}
                        </p>
                      </div>
                    </div>

                    {/* Accepted vs Rejected Criteria */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="hover-card-panel p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/60 space-y-1 shadow-xs">
                        <span className="font-semibold text-emerald-800 flex items-center gap-1 text-[11px]">
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span>Accepted Criteria:</span>
                        </span>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          {app.acceptedVsRejectedDetails.acceptedCriteria}
                        </p>
                      </div>

                      <div className="hover-card-panel p-3 rounded-lg bg-rose-50/70 border border-rose-200/60 space-y-1 shadow-xs">
                        <span className="font-semibold text-rose-800 flex items-center gap-1 text-[11px]">
                          <X className="w-3.5 h-3.5 shrink-0" />
                          <span>Rejected Criteria:</span>
                        </span>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          {app.acceptedVsRejectedDetails.rejectedCriteria}
                        </p>
                      </div>
                    </div>

                    {/* 5-Stage Inspection Process Workflow */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#0066FF] uppercase tracking-wider">
                          5-Stage Process Workflow
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Stages 01 – 05</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5">
                        {app.inspectionProcess.map((step) => (
                          <div
                            key={step.stepNumber}
                            className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors text-xs flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-[9px] font-mono font-bold text-[#0066FF] block">
                                S{step.stepNumber}
                              </span>
                              <span className="font-bold text-slate-800 text-[10px] line-clamp-1 block mt-0.5">
                                {step.name}
                              </span>
                            </div>
                            <p className="text-[9px] text-slate-500 line-clamp-2 leading-tight mt-1">
                              {step.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expected Business Value */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-800">
                        Expected Business Value Delivered:
                      </div>
                      <div className="space-y-1 text-[11px] text-slate-600">
                        {app.expectedBusinessValue.map((val, vIdx) => (
                          <div key={vIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Bar with CTA */}
                  <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
                    <span className="text-[10px] font-mono text-slate-500 text-center sm:text-left">
                      Standard: ISO / IPC-A-610 Benchmark
                    </span>
                    <Link
                      to={`/contact?application=${encodeURIComponent(app.title)}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer active:scale-95"
                    >
                      <span>Discuss a Custom Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Dots Indicator */}
            {filteredApplications.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-4">
                {filteredApplications.map((app, idx) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Jump to application ${idx + 1}: ${app.title}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? 'w-8 bg-[#0066FF]'
                        : 'w-2 bg-slate-200 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
