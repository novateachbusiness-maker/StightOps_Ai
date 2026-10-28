import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, HelpCircle, ArrowRight } from 'lucide-react';
import { RESOURCE_ARTICLES } from '../data/resources.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { generateArticleSchema, generateFaqSchema } from '../utils/seo.ts';

export function ResourceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = RESOURCE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.summary,
    datePublished: article.datePublished,
    url: `/resources/${article.slug}`,
    tags: article.tags,
  });

  const faqSchema = article.faqs ? generateFaqSchema(article.faqs) : null;
  const jsonLd = faqSchema ? [articleSchema, faqSchema] : articleSchema;

  return (
    <div className="py-12 bg-[#F4F8F8] min-h-screen">
      <SeoHead
        title={`${article.title} | Technical Guide`}
        description={article.summary}
        canonicalPath={`/resources/${article.slug}`}
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Resources', path: '/resources' },
            { name: article.title, path: `/resources/${article.slug}` },
          ]}
        />

        {/* Article Header */}
        <article className="bg-white rounded-2xl border border-[#DCE7E8] p-8 md:p-12 shadow-sm space-y-8">
          <div className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="font-semibold text-[#087F8C]">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readingTime}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.datePublished}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#064E52] tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {article.summary}
            </p>

            <div className="pt-2 text-xs text-slate-500">
              Authored by: <span className="font-semibold text-slate-700">{article.author}</span>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('### ')) {
                return (
                  <h3
                    key={idx}
                    className="text-lg sm:text-xl font-bold text-[#064E52] pt-4 border-t border-slate-100 mt-6"
                  >
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
                const lines = trimmed.split('\n');
                return (
                  <ul key={idx} className="space-y-2 pl-4 list-disc text-xs sm:text-sm">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx}>{line.replace(/^[-*]|\d+\.\s*/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-xs sm:text-sm leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Technical FAQs if present */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h2 className="text-lg font-bold text-[#064E52] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#087F8C]" />
                <span>Technical Q&A</span>
              </h2>
              <div className="space-y-4">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className="hover-card-panel p-4 rounded-lg bg-[#F4F8F8] border border-[#DCE7E8] space-y-1 shadow-xs">
                    <div className="text-xs font-bold text-[#172B32]">{faq.question}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex items-center flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-500">Related Topics:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-[#064E52] bg-[#F4F8F8] border border-[#DCE7E8] px-2.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Next Steps CTA */}
          <div className="pt-8 border-t border-slate-100 bg-[#F4F8F8] -mx-8 -mb-8 p-8 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#064E52]">Discussing an Inspection Problem?</div>
              <div className="text-[11px] text-slate-500">Our engineers evaluate component optical feasibility in Bengaluru.</div>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#064E52] hover:bg-[#087F8C] rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              Request Feasibility Review
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
