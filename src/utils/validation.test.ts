import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail, validatePhone, validateEnquiryForm } from './validation.ts';

test('validateEmail correctly validates business emails', () => {
  assert.equal(validateEmail('quality.engineer@automotive-plant.in'), true);
  assert.equal(validateEmail('purchasing@semicon-oem.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('user@'), false);
  assert.equal(validateEmail(''), false);
});

test('validatePhone correctly validates international telephone numbers', () => {
  assert.equal(validatePhone('+91 72591 71733'), true);
  assert.equal(validatePhone('+1 (555) 234-5678'), true);
  assert.equal(validatePhone('123'), false); // Too short
  assert.equal(validatePhone(''), false);
});

test('validateEnquiryForm checks all mandatory B2B fields', () => {
  const validData = {
    name: 'Rajesh Sharma',
    company: 'Apex Precision Auto Components Ltd',
    email: 'r.sharma@apexauto.in',
    phone: '+91 72591 71733',
    industry: 'Automotive & Machined Metal',
    application: 'Surface Defect Detection',
    description: 'We need to inspect bevel gear tooth surface flaws and scratches on a 60 ppm line.',
    consent: true,
  };

  const result = validateEnquiryForm(validData);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateEnquiryForm rejects missing required fields and short descriptions', () => {
  const invalidData = {
    name: 'A', // too short
    company: '',
    email: 'not-an-email',
    phone: '123',
    industry: '',
    application: '',
    description: 'short',
    consent: false,
  };

  const result = validateEnquiryForm(invalidData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.company);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.industry);
  assert.ok(result.errors.application);
  assert.ok(result.errors.description);
  assert.ok(result.errors.consent);
});
