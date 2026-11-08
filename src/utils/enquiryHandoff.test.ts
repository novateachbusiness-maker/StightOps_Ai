import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEnquiryHandoff } from './enquiryHandoff.ts';
import { SITE_CONFIG } from '../config/site.ts';

const details = {
  name: 'Test Engineer',
  company: 'Example Plant',
  email: 'test@example.com',
  phone: '+91 90000 00000',
  industry: 'Food & Beverage Packaging',
  application: 'AI-Based Visual Inspection',
  description: 'Check caps & labels on line 2.',
};

const fixedDate = new Date(2026, 10, 8);

test('buildEnquiryHandoff creates WhatsApp and email links with the details', () => {
  const result = buildEnquiryHandoff(details, fixedDate, () => 0);
  assert.equal(result.referenceId, 'ST-2026-10000');

  assert.ok(result.whatsappUrl.startsWith('https://wa.me/' + SITE_CONFIG.whatsapp.number + '?text='));
  const whatsappText = decodeURIComponent(result.whatsappUrl.split('?text=')[1]);
  assert.match(whatsappText, /Company: Example Plant/);
  assert.match(whatsappText, /Details: Check caps & labels on line 2\./);
  assert.doesNotMatch(whatsappText, /Requirements:/);

  assert.ok(result.emailUrl.startsWith('mailto:' + SITE_CONFIG.contactEmail + '?subject='));
  const emailBody = decodeURIComponent(result.emailUrl.split('&body=')[1]);
  assert.match(emailBody, /Email: test@example\.com/);
});

test('buildEnquiryHandoff shortens very long text so the links keep working', () => {
  const result = buildEnquiryHandoff({ ...details, description: 'x'.repeat(5000) }, fixedDate, () => 0);
  const text = decodeURIComponent(result.whatsappUrl.split('?text=')[1]);
  assert.ok(text.length < 1400);
  assert.match(text, /\.\.\.$/);
});
