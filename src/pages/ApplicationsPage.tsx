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
  Maximize2,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { APPLICATIONS, ApplicationCase } from '../data/applications.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

type TabKey = 'overview' | 'workflow' | 'criteria' | 'value';

export function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cardTabs, setCardTabs] = useState<Record<string, TabKey>>({});
  const [modalApp, setModalApp] = useState<ApplicationCase | null>(null);

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

  const getCardTab = (appId: string): TabKey => {
    return cardTabs[appId] || 'overview';
  };

  const setCardTab = (appId: string, tab: TabKey) => {
    setCardTabs((prev) => ({ ...prev, [appId]: tab }));
  };

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    if (filteredApplications.length > 0) {
      const cardElements = container.querySelectorAll<HTMLElement>('[data-card-index]');
      if (cardElements.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cardElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
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

  // Keyboard navigation for carousel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scroll('left');
    } else if (e.key === 'ArrowRight') {
      scroll('right');
    }
  };

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalApp(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardElements = container.querySelectorAll<HTMLElement>('[data-card-index]');
    if (cardElements.length === 0) return;

    const firstCard = cardElements[0];
    const scrollAmount = firstCard.offsetWidth + 24; // card width + gap

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardElements = container.querySelectorAll<HTMLElement>('[data-card-index]');
    if (cardElements[index]) {
      cardElements[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  return (
    <div className="py-12 bg-transparent min-h-screen">
      <SeoHead
        title="Industrial Vision Applications & Case Benchmarks | SightOpsAi"
        description="Explore SightOpsAi engineering application benchmarks: PCB AOI, automotive transmission defect detection, pharmaceutical serialization, packaging seal integrity, and telecentric metrology."
        canonicalPath="/applications"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Applications', path: '/applications' }]} />

        {/* Section Header */}
        <div className="space-y-4 mb-8 max-w-3xl">
          <div className="text-xs font-semibold text-[#00D2FF] font-mono uppercase tracking-wider bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
            Customer Problems & Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Inspection Application Benchmarks
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Every application is structured around real customer manufacturing problems, 5-stage optical workflows, and measurable business value.
          </p>
        </div>

        {/* Engineering Benchmark Disclaimer Banner */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-amber-500/30 rounded-xl p-4 mb-8 text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-amber-300">Illustrative Engineering Benchmarks:</span> The examples below demonstrate optical methodology and algorithmic results under IPC-A-610, GS1, and ISO/IEC 15415 standards. They illustrate technical capability and do not claim unverified specific customer deployments.
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? APPLICATIONS.length
                  : APPLICATIONS.filter(
                      (a) =>
                        a.industry.toLowerCase().includes(cat.toLowerCase()) ||
                        cat.toLowerCase().includes(a.industry.toLowerCase())
                    ).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-[#0066FF] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      selectedCategory === cat
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] animate-pulse" />
              <span className="text-xs font-semibold text-white">
                {filteredApplications.length} {filteredApplications.length === 1 ? 'Benchmark Case' : 'Benchmark Cases'}
              </span>
            </div>
            {selectedCategory !== 'All' && (
              <span className="text-[11px] font-mono text-[#00D2FF] bg-slate-900/60 px-2 py-0.5 rounded border border-white/15 hidden sm:inline">
                {selectedCategory}
              </span>
            )}
            <span className="text-slate-400">|</span>
            <span className="text-xs text-slate-300 font-mono">
              Card {filteredApplications.length > 0 ? activeIndex + 1 : 0} of {filteredApplications.length}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] text-slate-300 mr-2 hidden md:inline">
              Swipe or click arrows to explore horizontally
            </span>
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous application card"
              className="p-2 rounded-lg border border-white/20 bg-slate-900/70 text-white shadow-xs hover:bg-[#0066FF] hover:border-[#0066FF] active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-900/70 disabled:hover:text-slate-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next application card"
              className="p-2 rounded-lg border border-white/20 bg-slate-900/70 text-white shadow-xs hover:bg-[#0066FF] hover:border-[#0066FF] active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-900/70 disabled:hover:text-slate-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty State if filter yields zero matches */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-12 text-center space-y-4">
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
            {/* Left fade gradient overlay */}
            {canScrollLeft && (
              <div className="hidden sm:block absolute left-0 top-0 bottom-4 w-10 z-10 pointer-events-none bg-gradient-to-r from-slate-950/60 to-transparent" />
            )}

            {/* Right fade gradient overlay */}
            {canScrollRight && (
              <div className="hidden sm:block absolute right-0 top-0 bottom-4 w-10 z-10 pointer-events-none bg-gradient-to-l from-slate-950/60 to-transparent" />
            )}

            <div
              ref={scrollContainerRef}
              onKeyDown={handleKeyDown}
              className="flex gap-6 overflow-x-auto pb-4 pt-1 px-0.5 snap-x snap-mandatory scroll-smooth focus:outline-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              tabIndex={0}
              role="region"
              aria-label="Applications carousel"
            >
              {filteredApplications.map((app, index) => {
                const currentTab = getCardTab(app.id);

                return (
                  <article
                    key={app.id}
                    id={app.slug}
                    data-card-index={index}
                    className="app-carousel-card shrink-0 snap-start bg-white/95 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Header Strip */}
                    <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800 flex flex-col gap-2 min-h-[110px] justify-between">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[11px] font-mono font-semibold text-[#00D2FF] uppercase tracking-wide truncate">
                          {app.industry}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-slate-300 rounded border border-white/15 shrink-0">
                          Case #{index + 1}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
                          {app.title}
                        </h2>
                        <div className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                          Part: {app.inspectedProduct}
                        </div>
                      </div>
                    </div>

                    {/* Card Image */}
                    <div className="relative bg-slate-950 aspect-[16/9] w-full shrink-0 flex items-center justify-center select-none overflow-hidden group">
                      <img
                        src={app.image}
                        alt={app.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        onClick={() => setModalApp(app)}
                        aria-label={`View full dossier for ${app.title}`}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-xs hover:bg-[#0066FF] transition-colors cursor-pointer opacity-90 hover:opacity-100"
                        title="View Full Specifications"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Tab Navigation Controls */}
                    <div className="flex border-b border-slate-200 bg-slate-50/70 text-[11px] font-medium text-slate-600 px-2 pt-1 gap-1">
                      <button
                        type="button"
                        onClick={() => setCardTab(app.id, 'overview')}
                        className={`px-2.5 py-1.5 border-b-2 transition-colors cursor-pointer ${
                          currentTab === 'overview'
                            ? 'border-[#0066FF] text-[#0066FF] font-semibold'
                            : 'border-transparent hover:text-slate-900'
                        }`}
                      >
                        Problem & Data
                      </button>
                      <button
                        type="button"
                        onClick={() => setCardTab(app.id, 'workflow')}
                        className={`px-2.5 py-1.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1 ${
                          currentTab === 'workflow'
                            ? 'border-[#0066FF] text-[#0066FF] font-semibold'
                            : 'border-transparent hover:text-slate-900'
                        }`}
                      >
                        <Workflow className="w-3 h-3" />
                        <span>Workflow</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCardTab(app.id, 'criteria')}
                        className={`px-2.5 py-1.5 border-b-2 transition-colors cursor-pointer ${
                          currentTab === 'criteria'
                            ? 'border-[#0066FF] text-[#0066FF] font-semibold'
                            : 'border-transparent hover:text-slate-900'
                        }`}
                      >
                        Pass/Fail
                      </button>
                      <button
                        type="button"
                        onClick={() => setCardTab(app.id, 'value')}
                        className={`px-2.5 py-1.5 border-b-2 transition-colors cursor-pointer ${
                          currentTab === 'value'
                            ? 'border-[#0066FF] text-[#0066FF] font-semibold'
                            : 'border-transparent hover:text-slate-900'
                        }`}
                      >
                        ROI & Value
                      </button>
                    </div>

                    {/* Card Content Area (Uniform height across all cards for perfect alignment) */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-h-[290px] text-xs">
                      {currentTab === 'overview' && (
                        <div className="space-y-3">
                          {/* Manufacturing Problem */}
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                            <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>Manufacturing Problem:</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                              {app.customerProblem}
                            </p>
                          </div>

                          {/* Example Input / Output */}
                          <div className="space-y-2">
                            <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                              <span className="font-semibold text-slate-700 text-[10px] uppercase tracking-wider block">
                                Example Input:
                              </span>
                              <p className="text-slate-600 text-[11px] leading-snug line-clamp-2 mt-0.5">
                                {app.exampleInputDescription}
                              </p>
                            </div>
                            <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/50">
                              <span className="font-semibold text-[#0066FF] text-[10px] uppercase tracking-wider block">
                                Inspection Output:
                              </span>
                              <p className="text-slate-700 font-mono text-[11px] leading-snug line-clamp-2 mt-0.5">
                                {app.exampleOutputDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentTab === 'workflow' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-1 border-b border-slate-100">
                            <span>5-Stage Optical Pipeline</span>
                            <span className="text-[#0066FF] font-semibold">Stages 01 – 05</span>
                          </div>
                          <div className="space-y-1.5 overflow-y-auto max-h-[230px] pr-1">
                            {app.inspectionProcess.map((step) => (
                              <div
                                key={step.stepNumber}
                                className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2"
                              >
                                <span className="text-[10px] font-mono font-bold text-[#0066FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 shrink-0">
                                  S{step.stepNumber}
                                </span>
                                <div>
                                  <div className="font-bold text-slate-800 text-[11px] leading-tight">
                                    {step.name}
                                  </div>
                                  <p className="text-[10px] text-slate-500 leading-snug mt-0.5">
                                    {step.detail}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentTab === 'criteria' && (
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200/80 space-y-1">
                            <span className="font-semibold text-emerald-800 flex items-center gap-1.5 text-[11px]">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Accepted Criteria:</span>
                            </span>
                            <p className="text-slate-700 text-[11px] leading-relaxed">
                              {app.acceptedVsRejectedDetails.acceptedCriteria}
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-rose-50/80 border border-rose-200/80 space-y-1">
                            <span className="font-semibold text-rose-800 flex items-center gap-1.5 text-[11px]">
                              <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>Rejected Criteria:</span>
                            </span>
                            <p className="text-slate-700 text-[11px] leading-relaxed">
                              {app.acceptedVsRejectedDetails.rejectedCriteria}
                            </p>
                          </div>
                        </div>
                      )}

                      {currentTab === 'value' && (
                        <div className="space-y-2.5">
                          <div className="text-[11px] font-semibold text-slate-800">
                            Measurable Business ROI Delivered:
                          </div>
                          <div className="space-y-1.5">
                            {app.expectedBusinessValue.map((val, vIdx) => (
                              <div key={vIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">{val}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                            {app.technologiesUsed.slice(0, 3).map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[9px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 truncate max-w-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dossier quick link */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <button
                          type="button"
                          onClick={() => setModalApp(app)}
                          className="text-[#0066FF] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Full Specifications Dossier</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-[10px]">ISO / IPC-A-610</span>
                      </div>
                    </div>

                    {/* Card Footer Bar with CTA */}
                    <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => setModalApp(app)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Inspect Dossier
                      </button>
                      <Link
                        to={`/contact?application=${encodeURIComponent(app.title)}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer active:scale-95"
                      >
                        <span>Discuss Solution</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
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

      {/* Full Specifications Modal Dossier */}
      {modalApp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in"
          onClick={() => setModalApp(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-start justify-between gap-4 sticky top-0 z-20">
              <div>
                <div className="text-xs font-mono font-semibold text-[#00D2FF] uppercase tracking-wider">
                  {modalApp.industry}
                </div>
                <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {modalApp.title}
                </h2>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  Inspected Product: {modalApp.inspectedProduct}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalApp(null)}
                aria-label="Close dossier"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Image Banner */}
              <div className="rounded-xl overflow-hidden aspect-[16/9] bg-slate-950 border border-slate-200">
                <img
                  src={modalApp.image}
                  alt={modalApp.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Manufacturing Problem */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>The Manufacturing Problem:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {modalApp.customerProblem}
                </p>
              </div>

              {/* Example Input & Output */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <span className="font-semibold text-slate-800 text-[11px]">Example Input Capture:</span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {modalApp.exampleInputDescription}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/60 space-y-1">
                  <span className="font-semibold text-[#0066FF] text-[11px]">Inspection Output & Result:</span>
                  <p className="text-slate-700 font-mono leading-relaxed text-[11px]">
                    {modalApp.exampleOutputDescription}
                  </p>
                </div>
              </div>

              {/* Quality Standards: Pass vs Fail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-emerald-50/80 border border-emerald-200 space-y-1">
                  <span className="font-semibold text-emerald-800 flex items-center gap-1.5 text-[11px]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Accepted Criteria:</span>
                  </span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {modalApp.acceptedVsRejectedDetails.acceptedCriteria}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-rose-50/80 border border-rose-200 space-y-1">
                  <span className="font-semibold text-rose-800 flex items-center gap-1.5 text-[11px]">
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Rejected Criteria:</span>
                  </span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {modalApp.acceptedVsRejectedDetails.rejectedCriteria}
                  </p>
                </div>
              </div>

              {/* 5-Stage Inspection Process Workflow */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
                    5-Stage Optical Pipeline Workflow
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Stages 01 – 05</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {modalApp.inspectionProcess.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#0066FF] block">
                          S{step.stepNumber}
                        </span>
                        <span className="font-bold text-slate-800 text-[11px] block mt-0.5">
                          {step.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-snug mt-1.5">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Value Delivered */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  Expected Business Value Delivered:
                </div>
                <div className="space-y-1.5">
                  {modalApp.expectedBusinessValue.map((val, vIdx) => (
                    <div key={vIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Integrated Optical Technologies:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {modalApp.technologiesUsed.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20">
              <span className="text-xs text-slate-500 font-mono">
                Complies with ISO / IPC-A-610 Engineering Guidelines
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setModalApp(null)}
                  className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to={`/contact?application=${encodeURIComponent(modalApp.title)}`}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  <span>Discuss Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
