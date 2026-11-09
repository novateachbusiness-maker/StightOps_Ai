import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Cpu, ShieldAlert } from 'lucide-react';
import { INDUSTRIES } from '../data/industries.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ConsultationForm } from '../components/ConsultationForm.tsx';

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = INDUSTRIES.find((i) => i.slug === slug);

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const hasMoreThanThree = industry.keyApplications.length > 3;

  return (
    <div className="py-8 bg-transparent min-h-screen">
      <SeoHead
        title={`Industrial Vision Solutions - ${industry.title} | SightOpsAi`}
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
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-6 sm:p-10 shadow-xl mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-semibold text-[#0066FF] font-mono uppercase tracking-wider">
                Sector · {industry.title}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Industrial Vision Solutions
              </h1>
              <p className="text-sm font-medium text-[#0066FF]">
                {industry.tagline}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
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
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
                {industry.video ? (
                  <video
                    src={industry.video}
                    poster={industry.videoPoster || industry.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                ) : (
                  <img
                    src={industry.videoPoster || industry.image}
                    alt={industry.title}
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                )}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/85 text-[#0066FF] border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
                  <span>100% IN-LINE VISION FEED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8 mb-10">
          {/* 1. Concise Customer Challenge vs Proposed Solution */}
          <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 shadow-md space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Inspection Challenge &amp; SightOpsAi Solution
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>The Inspection Challenge</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {industry.customerChallenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF]">
                  <Cpu className="w-4 h-4 text-[#0066FF] shrink-0" />
                  <span>The SightOpsAi Solution</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {industry.proposedSolution}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Key Applications & Use Cases (Vertically scrollable if > 3 items) */}
          <div className="hover-card-panel bg-white/95 backdrop-blur-md rounded-xl border border-white/30 p-6 shadow-md space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Core Inspection Components &amp; Applications
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Representative inspection stations demonstrating component localization, optical geometries, and defect prevention for {industry.title}.
              </p>
            </div>

            <div
              className={
                hasMoreThanThree
                  ? 'max-h-[480px] section-scrollbar pr-3'
                  : ''
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industry.keyApplications.map((app, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:bg-white transition-all shadow-xs flex flex-col justify-between group"
                  >
                    {app.image && (
                      <div className="relative h-44 w-full overflow-hidden bg-slate-900 shrink-0">
                        <img
                          src={app.image}
                          alt={app.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-slate-900">{app.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{app.description}</p>
                      </div>

                      {(app.inspectionFocus || app.benefit) && (
                        <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-[11px]">
                          {app.inspectionFocus && (
                            <div>
                              <span className="font-semibold text-slate-800">What It Inspects: </span>
                              <span className="text-slate-600">{app.inspectionFocus}</span>
                            </div>
                          )}
                          {app.benefit && (
                            <div>
                              <span className="font-semibold text-[#0066FF]">Inspection Value: </span>
                              <span className="text-slate-600">{app.benefit}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
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
