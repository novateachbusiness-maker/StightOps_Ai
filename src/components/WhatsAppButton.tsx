import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.ts';

export function WhatsAppButton() {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Floating Welcome Prompt Tooltip (dismissible) */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">Discuss Your Application</span>
            <span className="text-[11px] text-slate-500">Quick response from engineering team</span>
          </div>
          <button
            type="button"
            onClick={() => setTooltipDismissed(true)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md ml-1"
            aria-label="Dismiss chat prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Official WhatsApp Button */}
      <a
        href={SITE_CONFIG.whatsapp.chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SightOps AI on WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        {/* SVG WhatsApp Official Icon */}
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.526.15-.175.2-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.111.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.634.721.229 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.43-.076-.125-.276-.201-.577-.351zM12.04 2C6.53 2 2.062 6.467 2.062 11.977c0 1.954.564 3.784 1.543 5.34L2 22l4.823-1.558c1.503.921 3.266 1.455 5.217 1.455 5.51 0 9.978-4.468 9.978-9.978 0-5.51-4.468-9.92-9.978-9.92zm0 18.254c-1.745 0-3.37-.502-4.757-1.37l-.341-.216-2.861.924.945-2.788-.236-.364a8.175 8.175 0 01-1.285-4.463c0-4.524 3.68-8.204 8.238-8.204 4.558 0 8.238 3.68 8.238 8.204 0 4.524-3.68 8.277-8.196 8.277z" />
        </svg>
      </a>
    </div>
  );
}
