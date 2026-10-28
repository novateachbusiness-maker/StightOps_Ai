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
    <div className="py-12 bg-[#F4F8F8] min-h-screen">
      <SeoHead
        title="Technical Resources & Industrial Vision Knowledge Base"
        description="Engineering guides on machine vision optics, telecentric lenses, deep learning vs rule-based vision, PCB SMT inspection, and statistical process control."
        canonicalPath="/resources"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Resources', path: '/resources' }]} />

        {/* Header */}
        <div className="space-y-4 mb-10 max-w-3xl">
          <div className="text-xs font-semibold text-[#087F8C] font-mono uppercase tracking-wider">
            Technical Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E52] tracking-tight">
            Machine Vision Engineering Resources
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In-depth technical guides authored by our optical and vision software engineers to help manufacturing teams design and specify reliable automated inspection lines.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#DCE7E8] shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
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

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, algorithms, optics..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#DCE7E8] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#DCE7E8] p-12 text-center text-slate-500">
            No articles matched your filter. Try adjusting your search term.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/resources/${article.slug}`}
                className="bg-white rounded-xl border border-[#DCE7E8] p-6 shadow-sm hover:border-[#087F8C] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-[#087F8C]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readingTime}</span>
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#172B32] group-hover:text-[#087F8C] transition-colors leading-snug">
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

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#064E52]">
                  <span>Read Full Technical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
