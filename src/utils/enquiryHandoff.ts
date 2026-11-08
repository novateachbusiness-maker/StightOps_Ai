import { SITE_CONFIG } from '../config/site.ts';

export interface EnquiryDetails {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  application: string;
  requirements?: string;
  description: string;
}

export interface EnquiryHandoff {
  referenceId: string;
  whatsappUrl: string;
  emailUrl: string;
}

// Very long links can fail in some email apps and browsers.
const MAX_TEXT_LENGTH = 900;

function shorten(text: string): string {
  const trimmed = text.trim();
  return trimmed.length > MAX_TEXT_LENGTH ? trimmed.slice(0, MAX_TEXT_LENGTH).trimEnd() + '...' : trimmed;
}

/**
 * Builds ready-to-send WhatsApp and email links for an enquiry, for hosts
 * where no enquiry server is running.
 */
export function buildEnquiryHandoff(
  details: EnquiryDetails,
  now: Date = new Date(),
  random: () => number = Math.random,
): EnquiryHandoff {
  const referenceId = 'ST-' + now.getFullYear() + '-' + Math.floor(10000 + random() * 90000);
  const requirements = details.requirements?.trim();

  const lines = [
    'SightOpsAi enquiry ' + referenceId,
    '',
    'Name: ' + details.name.trim(),
    'Company: ' + details.company.trim(),
    'Email: ' + details.email.trim(),
    'Phone: ' + details.phone.trim(),
    'Industry: ' + details.industry.trim(),
    'Application: ' + details.application.trim(),
    ...(requirements ? ['Requirements: ' + shorten(requirements)] : []),
    'Details: ' + shorten(details.description),
  ];

  const message = lines.join('\n');
  const subject = 'Consultation enquiry ' + referenceId;

  return {
    referenceId,
    whatsappUrl: 'https://wa.me/' + SITE_CONFIG.whatsapp.number + '?text=' + encodeURIComponent(message),
    emailUrl:
      'mailto:' +
      SITE_CONFIG.contactEmail +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(message.replace(/\n/g, '\r\n')),
  };
}
