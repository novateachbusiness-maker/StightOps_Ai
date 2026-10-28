/**
 * B2B Consultation Form Validation Utilities
 */

export interface EnquiryInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  application: string;
  requirements?: string;
  description: string;
  consent: boolean;
}

export interface ValidationErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  application?: string;
  description?: string;
  consent?: string;
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // Standard RFC 5322 compatible regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  // Accept standard international or local formats, at least 7 digits
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 16;
}

export function validateEnquiryForm(data: Partial<EnquiryInput>): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  } else if (data.name.trim().length > 80) {
    errors.name = "Full name must not exceed 80 characters.";
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = "Company or organization name is required.";
  } else if (data.company.trim().length > 100) {
    errors.company = "Company name must not exceed 100 characters.";
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = "Please provide a valid business email address.";
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = "Please provide a valid telephone number with country code.";
  }

  if (!data.industry || data.industry.trim().length === 0) {
    errors.industry = "Please select your primary manufacturing sector.";
  }

  if (!data.application || data.application.trim().length === 0) {
    errors.application = "Please select the primary inspection application.";
  }

  if (!data.description || data.description.trim().length < 15) {
    errors.description = "Please describe your inspection requirements in at least 15 characters.";
  } else if (data.description.trim().length > 2500) {
    errors.description = "Project description must not exceed 2500 characters.";
  }

  if (!data.consent) {
    errors.consent = "You must acknowledge privacy consent for technical consultation.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
