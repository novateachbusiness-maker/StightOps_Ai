import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, ArrowRight, Cpu, Wrench, ShieldAlert } from 'lucide-react';
import { INDUSTRIES } from '../data/industries.ts';
import { SOLUTIONS } from '../data/solutions.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ConsultationForm } from '../components/ConsultationForm.tsx';

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = INDUSTRIES.find((i) => i.slug === slug);

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SeoHead
        title={`${industry.title} | Machine Vision Systems`}
        description={industry.heroSummary}
        canonicalPath={`/industries/${industry.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Industries', path: '/industries' },
            { name: industry.title, path: `/industries/${industry.slug}` },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
                Industrial Vision Solutions
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {industry.title}
              </h1>
              <p className="text-sm font-medium text-[#0066FF]">
                {industry.tagline}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {industry.heroSummary}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="#consultation"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors shadow-sm"
                >
                  Discuss Plant Application
                </a>
                <Link
                  to="/industries"
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
                >
                  &larr; All Industries
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Challenge & Application Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Customer Challenge vs Proposed Solution */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                The Customer Challenge & Vision Solution
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>The Inspection Challenge</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {industry.customerChallenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF]">
                    <Cpu className="w-4 h-4 text-[#0066FF]" />
                    <span>The SightOps AI Solution</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {industry.proposedSolution}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Specific Inspection Challenges List */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>Sector-Specific Inspection Challenges</span>
              </h2>
              <div className="space-y-3 pt-2">
                {industry.inspectionChallenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[#0066FF] font-mono font-bold text-xs mt-0.5">0{idx + 1}.</span>
                    <p className="text-xs text-slate-700 leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Key Applications & Use Cases */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Core Inspection Use Cases</h2>
              <div className="grid grid-cols-1 gap-4">
                {industry.keyApplications.map((app, idx) => (
                  <div key={idx} className="border border-slate-200 p-5 rounded-lg bg-slate-50/50 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900">{app.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Factory Integration Considerations */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#0066FF]" />
                <span>Production Line Integration Considerations</span>
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                {industry.integrationConsiderations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Expected Business Benefits */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Expected Business Benefits</h3>
              <div className="space-y-2 text-xs text-slate-600">
                {industry.expectedBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable Vision Technologies */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Recommended Vision Technologies</h3>
              <div className="space-y-2 text-xs text-slate-600">
                {industry.suitableTechnologies.map((tech, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#0066FF] shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Solutions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Relevant Inspection Solutions</h3>
              <div className="space-y-2">
                {SOLUTIONS.slice(0, 3).map((sol) => (
                  <Link
                    key={sol.id}
                    to={`/solutions/${sol.slug}`}
                    className="block p-3 rounded-lg border border-slate-200 hover:border-[#0066FF] transition-colors group"
                  >
                    <div className="text-xs font-semibold text-slate-800 group-hover:text-[#0066FF]">
                      {sol.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {sol.tagline}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Form Anchor */}
        <section id="consultation" className="scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <ConsultationForm
              defaultIndustry={industry.title}
              defaultApplication=""
            />
          </div>
        </section>
      </div>
    </div>
  );
}
