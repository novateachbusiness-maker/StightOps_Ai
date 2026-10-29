import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search, Layers, Phone } from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export function NotFoundPage() {
  return (
    <div className="py-20 bg-transparent min-h-[70vh] flex items-center justify-center">
      <SeoHead
        title="Page Not Found"
        description="The requested page could not be located on SightOpsAi."
        canonicalPath="/404"
      />

      <div className="max-w-xl mx-auto px-6 py-10 bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-[#0066FF]/10 text-[#0066FF] rounded-2xl flex items-center justify-center mx-auto font-mono text-2xl font-bold">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Requested Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            The inspection route or resource you are looking for has moved or does not exist. Please use the quick links below to explore our vision platform.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#0066FF] bg-white border border-slate-200 hover:border-[#0066FF] rounded-lg transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Solutions</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-white rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
