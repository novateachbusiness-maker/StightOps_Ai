import { useState, useId } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck, FileText, MessageCircle } from 'lucide-react';
import { validateEnquiryForm, ValidationErrors } from '../utils/validation.ts';
import { SITE_CONFIG } from '../config/site.ts';

interface ConsultationFormProps {
  defaultApplication?: string;
  defaultIndustry?: string;
}

export function ConsultationForm({ defaultApplication = '', defaultIndustry = '' }: ConsultationFormProps) {
  const formId = useId();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '+91 ',
    industry: defaultIndustry,
    application: defaultApplication,
    requirements: '',
    description: '',
    consent: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    referenceId?: string;
    message?: string;
    deliveryNote?: string;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const industryOptions = [
    'Electronics & PCB Assembly',
    'Automotive & Machined Metal',
    'Pharmaceutical & Medical Devices',
    'Food & Beverage Packaging',
    'Semiconductors & Components',
    'Logistics, Packaging & Traceability',
    'Aerospace & Defense',
    'General Manufacturing & Plastics',
  ];

  const applicationOptions = [
    'AI-Based Visual Inspection',
    'PCB Automated Optical Inspection (AOI)',
    'OCR & 2D Barcode Verification',
    'Surface Defect Detection & Scratch Classification',
    'Dimensional Metrology & GD&T Inspection',
    'Component Presence & Assembly Verification',
    'Turnkey Custom Vision Automation Station',
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error as user types
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);

    // Client-side validation
    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setSubmissionResult({
        success: true,
        referenceId: data.referenceId,
        message: data.message,
        deliveryNote: data.deliveryNote,
      });

      // Clear form upon successful submission
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '+91 ',
        industry: '',
        application: '',
        requirements: '',
        description: '',
        consent: false,
      });
      setErrors({});
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during submission.';
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-6 sm:p-8 shadow-xl">
      {submissionResult?.success ? (
        <div className="space-y-6 text-center py-8">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#172B32]">
              Consultation Request Received
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {submissionResult.message}
            </p>
          </div>

          <div className="bg-[#F4F8F8] border border-[#DCE7E8] rounded-lg p-4 max-w-md mx-auto text-left space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Enquiry Reference:</span>
              <span className="font-mono font-bold text-[#064E52]">
                {submissionResult.referenceId}
              </span>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed border-t border-[#DCE7E8] pt-2">
              <span className="font-semibold text-slate-700">Storage Status:</span>{' '}
              {submissionResult.deliveryNote}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSubmissionResult(null)}
              className="px-5 py-2.5 text-xs font-semibold text-[#064E52] hover:text-[#087F8C] border border-[#DCE7E8] rounded-lg hover:bg-slate-50 transition-colors"
            >
              Submit Another Technical Request
            </button>
            <a
              href={SITE_CONFIG.whatsapp.chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp ({SITE_CONFIG.whatsapp.displayPhone})</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#172B32]">Technical Application Request</h3>
            <p className="text-xs text-slate-500">
              Provide your production parameters for a preliminary optical feasibility assessment.
            </p>
          </div>

          {apiError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor={`${formId}-name`} className="block text-xs font-medium text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id={`${formId}-name`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. S. Ramanathan"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                  errors.name
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-[#DCE7E8] focus:border-[#087F8C] focus:ring-[#087F8C]'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor={`${formId}-company`} className="block text-xs font-medium text-slate-700 mb-1">
                Company / Plant Name <span className="text-rose-500">*</span>
              </label>
              <input
                id={`${formId}-company`}
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Precision Engineering Ltd"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                  errors.company
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-[#DCE7E8] focus:border-[#087F8C] focus:ring-[#087F8C]'
                }`}
              />
              {errors.company && <p className="text-[11px] text-rose-500 mt-1">{errors.company}</p>}
            </div>

            {/* Work Email */}
            <div>
              <label htmlFor={`${formId}-email`} className="block text-xs font-medium text-slate-700 mb-1">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. engineer@plant.com"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                  errors.email
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-[#DCE7E8] focus:border-[#087F8C] focus:ring-[#087F8C]'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor={`${formId}-phone`} className="block text-xs font-medium text-slate-700 mb-1">
                Telephone (with Country Code) <span className="text-rose-500">*</span>
              </label>
              <input
                id={`${formId}-phone`}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 72591 71733"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                  errors.phone
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-[#DCE7E8] focus:border-[#087F8C] focus:ring-[#087F8C]'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Manufacturing Sector */}
            <div>
              <label htmlFor={`${formId}-industry`} className="block text-xs font-medium text-slate-700 mb-1">
                Manufacturing Sector <span className="text-rose-500">*</span>
              </label>
              <select
                id={`${formId}-industry`}
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                  errors.industry
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-[#DCE7E8] focus:border-[#087F8C] focus:ring-[#087F8C]'
                }`}
              >
                <option value="">-- Select Industry --</option>
                {industryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.industry && <p className="text-[11px] text-rose-500 mt-1">{errors.industry}</p>}
            </div>

            {/* Primary Inspection Application */}
            <div>
              <label htmlFor={`${formId}-application`} className="block text-xs font-medium text-slate-700 mb-1">
                Inspection Application <span className="text-rose-500">*</span>
              </label>
              <select
                id={`${formId}-application`}
                name="application"
                value={formData.application}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                  errors.application
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-[#DCE7E8] focus:border-[#087F8C] focus:ring-[#087F8C]'
                }`}
              >
                <option value="">-- Select Application --</option>
                {applicationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.application && <p className="text-[11px] text-rose-500 mt-1">{errors.application}</p>}
            </div>
          </div>

          {/* Production Cadence / Part Requirements */}
          <div>
            <label htmlFor={`${formId}-requirements`} className="block text-xs font-medium text-slate-700 mb-1">
              Production Cadence & Part Specs (Optional)
            </label>
            <input
              id={`${formId}-requirements`}
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="e.g. 120 parts/min, part dimensions 50x30mm, ±0.01mm tolerance"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7E8] bg-white focus:outline-none focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C]"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor={`${formId}-description`} className="block text-xs font-medium text-slate-700 mb-1">
              Inspection Objective & Defect Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              id={`${formId}-description`}
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the defect criteria, surface material (e.g. machined steel, FR4 PCB, plastic), optical challenges, or downstream PLC rejection requirements..."
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                errors.description
                  ? 'border-rose-400 focus:ring-rose-400'
                  : 'border-[#DCE7E8] focus:border-[#087F8C] focus:ring-[#087F8C]'
              }`}
            />
            {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
          </div>

          {/* Sample Part Shipment Note */}
          <div className="bg-[#F4F8F8] border border-[#DCE7E8] rounded-lg p-3 text-[11px] text-slate-600 flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#064E52]">Sample Part Evaluation:</span> In-depth optical feasibility testing is performed on customer workpiece samples at our Bengaluru optical laboratory. We will coordinate secure shipping instructions following initial enquiry review.
            </div>
          </div>

          {/* Consent Checkbox */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-0.5 accent-[#064E52] rounded"
              />
              <span className="text-xs text-slate-600 leading-snug">
                I agree to share the above manufacturing specifications for technical evaluation and accept the consultation terms of {SITE_CONFIG.name}.
              </span>
            </label>
            {errors.consent && <p className="text-[11px] text-rose-500 mt-1">{errors.consent}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#064E52] hover:bg-[#087F8C] rounded-lg transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging Technical Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Consultation Request</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Industrial Non-Disclosure Agreement (NDA) supported upon request</span>
          </div>
        </form>
      )}
    </div>
  );
}
