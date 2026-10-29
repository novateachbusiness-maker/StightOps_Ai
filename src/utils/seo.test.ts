import test from 'node:test';
import assert from 'node:assert/strict';
import { generateOrganizationSchema, generateBreadcrumbSchema, generateFaqSchema } from './seo.ts';

test('generateOrganizationSchema returns valid JSON-LD structure', () => {
  const schema = generateOrganizationSchema();
  assert.equal(schema['@type'], 'Organization');
  assert.equal(schema.name, 'SightOpsAi');
  assert.ok(Array.isArray(schema.knowsAbout));
  assert.ok(schema.address);
});

test('generateBreadcrumbSchema handles item positions properly', () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: 'PCB AOI', url: '/solutions/pcb-aoi' }
  ];
  const schema = generateBreadcrumbSchema(breadcrumbs);
  assert.equal(schema['@type'], 'BreadcrumbList');
  assert.equal(schema.itemListElement.length, 3);
  assert.equal(schema.itemListElement[0].position, 1);
  assert.equal(schema.itemListElement[2].name, 'PCB AOI');
});

test('generateFaqSchema constructs FAQPage entities correctly', () => {
  const faqs = [
    { question: 'What is automated optical inspection?', answer: 'AOI uses industrial cameras and computer vision to inspect assemblies.' }
  ];
  const schema = generateFaqSchema(faqs);
  assert.equal(schema['@type'], 'FAQPage');
  assert.equal(schema.mainEntity.length, 1);
  assert.equal(schema.mainEntity[0].name, 'What is automated optical inspection?');
});
