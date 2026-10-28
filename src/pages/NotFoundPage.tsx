import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search, Layers, Phone } from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export function NotFoundPage() {
  return (
    <div className="py-20 bg-[#F4F8F8] min-h-[70vh] flex items-center justify-center">
      <SeoHead
        title="Page Not Found"
        description="The requested page could not be located on SightOps AI."
        canonicalPath="/404"
      />

      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-[#064E52]/10 text-[#064E52] rounded-2xl flex items-center justify-center mx-auto font-mono text-2xl font-bold">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064E52]">
            Requested Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            The inspection route or resource you are looking for has moved or does not exist. Please use the quick links below to explore our vision platform.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#064E52] hover:bg-[#087F8C] rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#064E52] bg-white border border-[#DCE7E8] hover:border-[#087F8C] rounded-lg transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Solutions</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-[#DCE7E8] bg-white rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
