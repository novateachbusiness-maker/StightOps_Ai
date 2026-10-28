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
    <div className="py-12 bg-[#F4F8F8] min-h-screen">
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
        <div className="bg-white rounded-2xl border border-[#DCE7E8] p-8 md:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold text-[#087F8C] font-mono uppercase tracking-wider">
                Industrial Vision Solutions
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E52] tracking-tight leading-tight">
                {industry.title}
              </h1>
              <p className="text-base text-slate-700 leading-relaxed">
                {industry.heroSummary}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="#consultation"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#064E52] hover:bg-[#087F8C] rounded-lg transition-colors shadow-sm"
                >
                  Discuss Plant Application
                </a>
                <Link
                  to="/industries"
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-[#DCE7E8] rounded-lg"
                >
                  &larr; All Industries
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#DCE7E8] shadow-sm bg-slate-900">
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
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Typical Inspection Challenges */}
            <div className="bg-white rounded-xl border border-[#DCE7E8] p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#064E52] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>Sector-Specific Inspection Challenges</span>
              </h2>
              <div className="space-y-3 pt-2">
                {industry.inspectionChallenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F4F8F8] border border-[#DCE7E8]">
                    <span className="text-[#087F8C] font-mono font-bold text-xs mt-0.5">0{idx + 1}.</span>
                    <p className="text-xs text-slate-700 leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Key Applications & Use Cases */}
            <div className="bg-white rounded-xl border border-[#DCE7E8] p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#064E52]">Core Inspection Use Cases</h2>
              <div className="grid grid-cols-1 gap-4">
                {industry.keyApplications.map((app, idx) => (
                  <div key={idx} className="border border-[#DCE7E8] p-5 rounded-lg bg-white space-y-2">
                    <h3 className="text-sm font-bold text-[#172B32]">{app.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Factory Integration Considerations */}
            <div className="bg-white rounded-xl border border-[#DCE7E8] p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#064E52] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#087F8C]" />
                <span>Production Line Integration Considerations</span>
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                {industry.integrationConsiderations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#18B6A4] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Suitable Vision Technologies */}
            <div className="bg-white rounded-xl border border-[#DCE7E8] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#064E52]">Recommended Vision Technologies</h3>
              <div className="space-y-2 text-xs text-slate-600">
                {industry.suitableTechnologies.map((tech, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#F4F8F8] border border-[#DCE7E8]/60 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#087F8C] shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Solutions */}
            <div className="bg-white rounded-xl border border-[#DCE7E8] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#064E52]">Relevant Inspection Solutions</h3>
              <div className="space-y-2">
                {SOLUTIONS.slice(0, 3).map((sol) => (
                  <Link
                    key={sol.id}
                    to={`/solutions/${sol.slug}`}
                    className="block p-3 rounded-lg border border-[#DCE7E8] hover:border-[#087F8C] transition-colors group"
                  >
                    <div className="text-xs font-semibold text-[#172B32] group-hover:text-[#087F8C]">
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
