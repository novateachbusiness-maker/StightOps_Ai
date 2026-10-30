import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, ArrowRight, HelpCircle } from 'lucide-react';
import { RESOURCE_ARTICLES, ResourceArticle } from '../data/resources.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

export function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'AI-Based Inspection',
    'Optics & Lighting',
    'PCB Inspection',
    'OCR & Barcode',
    'QA & Automation',
  ];

  const filteredArticles = RESOURCE_ARTICLES.filter((article) => {
    const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="py-12 bg-transparent min-h-screen">
      <SeoHead
        title="Technical Resources & Industrial Vision Knowledge Base"
        description="Engineering guides on machine vision optics, telecentric lenses, deep learning vs rule-based vision, PCB SMT inspection, and statistical process control."
        canonicalPath="/resources"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Resources', path: '/resources' }]} />

        {/* Header */}
        <div className="space-y-4 mb-10 max-w-3xl">
          <div className="text-xs font-semibold text-[#00D2FF] font-mono uppercase tracking-wider bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit">
            Technical Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Machine Vision Engineering Resources
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            In-depth technical guides authored by our optical and vision software engineers to help manufacturing teams design and specify reliable automated inspection lines.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0066FF] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
              placeholder="Search articles, algorithms, optics..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-12 text-center text-slate-600">
            No articles matched your filter. Try adjusting your search term.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/resources/${article.slug}`}
                className="hover-card-interactive bg-white/95 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-md flex flex-col justify-between group"
              >
                <div>
                  {/* Article Supporting Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-white bg-[#0066FF]/90 backdrop-blur-sm px-2.5 py-0.5 rounded shadow-xs">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#0066FF]" />
                        <span>{article.readingTime}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.datePublished}</span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0066FF]">
                    <span>Read Full Technical Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
