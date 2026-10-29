import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, Layers, Cpu, HelpCircle, FileText } from 'lucide-react';
import { SOLUTIONS } from '../data/solutions.ts';
import { INDUSTRIES } from '../data/industries.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ConsultationForm } from '../components/ConsultationForm.tsx';
import { generateServiceSchema, generateFaqSchema } from '../utils/seo.ts';

export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = SOLUTIONS.find((s) => s.slug === slug);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  const serviceSchema = generateServiceSchema({
    name: solution.title,
    description: solution.summary,
    url: `/solutions/${solution.slug}`,
    category: solution.category,
  });

  const faqSchema = generateFaqSchema(solution.faqs);

  return (
    <div className="py-12 bg-transparent min-h-screen">
      <SeoHead
        title={`${solution.title} | Technical Overview`}
        description={solution.summary}
        canonicalPath={`/solutions/${solution.slug}`}
        jsonLd={[serviceSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Solutions', path: '/solutions' },
            { name: solution.title, path: `/solutions/${solution.slug}` },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 md:p-12 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#087F8C] font-mono uppercase">
                <span>{solution.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E52] tracking-tight leading-tight">
                {solution.title}
              </h1>
              <p className="text-base text-slate-700 leading-relaxed">
                {solution.summary}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="#consultation"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#064E52] hover:bg-[#087F8C] rounded-lg transition-colors shadow-sm"
                >
                  Discuss This Application
                </a>
                <Link
                  to="/solutions"
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-[#DCE7E8] rounded-lg"
                >
                  &larr; All Solutions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#DCE7E8] shadow-sm bg-slate-900">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Technical Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Industrial Problem */}
            <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-8 shadow-md space-y-3">
              <h2 className="text-xl font-bold text-[#064E52]">The Industrial Problem</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {solution.industrialProblem}
              </p>
            </div>

            {/* 2. Inspection Approach */}
            <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-8 shadow-md space-y-3">
              <h2 className="text-xl font-bold text-[#064E52]">Inspection Engineering Approach</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {solution.inspectionApproach}
              </p>
            </div>

            {/* 3. Inputs & Outputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 shadow-md space-y-3">
                <h3 className="text-sm font-bold text-[#064E52] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#087F8C]" />
                  <span>Typical Hardware Inputs</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {solution.typicalInputs.map((input, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#087F8C] font-bold">›</span>
                      <span>{input}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 shadow-md space-y-3">
                <h3 className="text-sm font-bold text-[#064E52] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#18B6A4]" />
                  <span>Deterministic Outputs & Telemetry</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {solution.typicalOutputs.map((output, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#18B6A4] font-bold">✓</span>
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Practical Limitations & Implementation Constraints */}
            <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-8 shadow-md space-y-3">
              <h2 className="text-xl font-bold text-[#064E52] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Practical Limitations & Physical Considerations</span>
              </h2>
              <p className="text-xs text-slate-500">
                Transparent engineering governance: machine vision systems operate within physical optical and mathematical constraints.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                {solution.limitations.map((limit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                    <span className="text-amber-700 font-bold shrink-0">•</span>
                    <span>{limit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. FAQs */}
            <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-8 shadow-md space-y-4">
              <h2 className="text-xl font-bold text-[#064E52] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#087F8C]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-4 pt-2">
                {solution.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 space-y-1.5">
                    <div className="text-xs font-bold text-[#172B32]">{faq.question}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Technologies Used Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-[#064E52]">Applied Technologies</h3>
              <div className="space-y-2 text-xs text-slate-600">
                {solution.technologiesUsed.map((tech, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#F4F8F8] border border-[#DCE7E8]/60 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#087F8C] shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable Applications */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-[#064E52]">Target Use Cases</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {solution.suitableApplications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18B6A4] shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Industries */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-[#064E52]">Related Manufacturing Sectors</h3>
              <div className="space-y-2">
                {INDUSTRIES.slice(0, 3).map((ind) => (
                  <Link
                    key={ind.id}
                    to={`/industries/${ind.slug}`}
                    className="block p-3 rounded-lg border border-[#DCE7E8] hover:border-[#087F8C] transition-colors group"
                  >
                    <div className="text-xs font-semibold text-[#172B32] group-hover:text-[#087F8C]">
                      {ind.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {ind.tagline}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Form Anchor Section */}
        <section id="consultation" className="scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <ConsultationForm
              defaultApplication={solution.title}
              defaultIndustry=""
            />
          </div>
        </section>
      </div>
    </div>
  );
}
