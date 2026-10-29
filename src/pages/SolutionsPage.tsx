import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Check, SlidersHorizontal, Eye } from 'lucide-react';
import { SOLUTIONS, Solution } from '../data/solutions.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function SolutionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Intelligent Machine Vision',
    'Electronics Manufacturing',
    'Traceability & Identification',
    'Quality Assurance',
    'Precision Engineering',
    'System Integration',
  ];

  const filteredSolutions = SOLUTIONS.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.industrialProblem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-transparent min-h-screen">
      <SeoHead
        title="Industrial Vision Systems & Inspection Solutions"
        description="Explore SightOps AI inspection systems: AI visual inspection, PCB AOI, surface defect detection, OCR & barcode decoding, and telecentric dimensional metrology."
        canonicalPath="/solutions"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Solutions', path: '/solutions' }]} />

        {/* Header Section */}
        <div className="space-y-4 mb-10 max-w-3xl">
          <div className="text-xs font-semibold text-[#00D2FF] font-mono uppercase tracking-wider">
            Engineered Inspection Systems
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-sm tracking-tight">
            Industrial Vision & Inspection Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Every inspection station is designed around physical optical principles, calibrated illumination, and deterministic algorithm pipelines tailored to your line speed and tolerance requirements.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Interactive filter tabs */}
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#064E52] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search solutions, optics, defects..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#DCE7E8] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C]"
            />
          </div>
        </div>

        {/* Solutions Grid */}
        {filteredSolutions.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-12 text-center text-slate-600">
            No inspection solutions matched your filter. Try adjusting your search term.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSolutions.map((solution) => (
              <div
                key={solution.id}
                className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-white bg-[#064E52]/90 backdrop-blur-sm px-2 py-0.5 rounded">
                      {solution.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h2 className="text-lg font-bold text-[#172B32] group-hover:text-[#087F8C] transition-colors leading-snug">
                      {solution.title}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {solution.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-700">Suitable For:</div>
                      <div className="space-y-1 text-xs text-slate-500">
                        {solution.suitableApplications.slice(0, 2).map((app, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#18B6A4] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/solutions/${solution.slug}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#064E52] group-hover:bg-[#087F8C] rounded-lg transition-colors text-center shadow-sm"
                  >
                    <span>View Technical Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Engineering Performance Note */}
        <div className="mt-16 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-white/30 text-xs text-slate-600 leading-relaxed shadow-md">
          <h3 className="font-bold text-[#064E52] text-sm mb-1">
            Optical Feasibility & System Performance Governance
          </h3>
          <p>
            Final system capabilities (repeatability, false rejection rate, cycle time) depend on part presentation stability, ambient thermal expansion, lighting wavelength selection, and optical depth-of-field. SightOps AI conducts physical laboratory feasibility assessments on client part samples before finalizing mechanical or optical design freezes.
          </p>
        </div>
      </div>
    </div>
  );
}
