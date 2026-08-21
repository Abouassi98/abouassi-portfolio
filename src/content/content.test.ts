import { describe, expect, it } from 'vitest';
import { ar } from './ar';
import { en } from './en';
import type { SiteContent } from './types';
import { LOCALES, localeRegistry } from '../i18n/locales';

const locales: readonly (readonly [string, SiteContent])[] = [
  ['en', en],
  ['ar', ar],
];

/** Every string reachable in a content tree, so a guard cannot be dodged by nesting. */
function collectStrings(value: unknown, into: string[] = []): string[] {
  if (typeof value === 'string') into.push(value);
  else if (Array.isArray(value)) for (const item of value) collectStrings(item, into);
  else if (value !== null && typeof value === 'object') {
    for (const item of Object.values(value)) collectStrings(item, into);
  }
  // Functions (UiStrings formatters) carry no claims and are skipped.
  return into;
}

describe('locale parity', () => {
  it('registers every declared locale', () => {
    expect(Object.keys(localeRegistry).sort()).toEqual([...LOCALES].sort());
  });

  it.each(['projects', 'tracks'] as const)(
    'exposes the same %s in the same order in both locales',
    (key) => {
      expect(ar[key].map((entry) => entry.id)).toEqual(en[key].map((entry) => entry.id));
    },
  );

  it('exposes the same number of metrics, roles and skill groups', () => {
    expect(ar.metrics.map((m) => m.claimId)).toEqual(en.metrics.map((m) => m.claimId));
    expect(ar.experience).toHaveLength(en.experience.length);
    expect(ar.skills).toHaveLength(en.skills.length);
    ar.skills.forEach((group, index) => {
      // Group names are translated; the technologies inside them must not drift.
      expect(group.items).toEqual(en.skills[index]?.items);
    });
  });

  it('keeps every project bullet count aligned, so neither locale carries an extra claim', () => {
    en.projects.forEach((project, index) => {
      expect(ar.projects[index]?.points).toHaveLength(project.points.length);
    });
  });
});

/**
 * The point of this file.
 *
 * Every phrase below was deleted from `FACT_LEDGER.json` because it could not
 * be defended in an interview, or because it discloses client-internal design.
 * They were removed by hand once already and came back. This test is what stops
 * that happening a third time — it fails the build, not a review.
 */
describe('fact ledger', () => {
  const forbiddenPhrases: readonly (readonly [string, string])[] = [
    ['6+ years', 'tenure is "nearly 6 years" (ledger: tenure.forbidden_wording)'],
    ['Team Lead', 'he was a senior IC (never_add.titles)'],
    ['Engineering Lead', 'never_add.titles'],
    ['Engineering Manager', 'never_add.titles'],
    ['100% retention', 'M-006 percentage deleted'],
    ['code reuse', 'M-007 deleted — no calculation methodology exists'],
    ['cart abandonment', 'M-009 deleted'],
    ['fraud reduction', 'C-003 deleted and must stay deleted'],
    ['zero findings', 'C-002 deleted — an organisation-level outcome he cannot evidence'],
    ['99.95%', 'B-002 — a design target, never a measurement'],
    ['1,000 TPS', 'B-002 — a design target, never a measurement'],
    ['p99', 'B-002 — a design target, never a measurement'],
    ['99.8%', 'M-011 deleted'],
    ['28 methods', 'exact bridge method count — client-internal, removed by review'],
    ['emulator', 'enumerated anti-analysis checks — removed by review'],
    ['ADB', 'enumerated anti-analysis checks — removed by review'],
    ['lacked tests', 'the consent-surface note — removed by review'],
  ];

  /** never_add.unevidenced_skills, plus the terms R-002 keeps withheld. */
  const forbiddenSkills: readonly string[] = [
    'PCI DSS', 'eKYC', 'GraphQL', 'KMP', 'Compose Multiplatform', 'WorkManager',
    'Turbine', 'Espresso', 'Jenkins', 'AWS', 'Micrometer', 'Spring Actuator',
    'transactional outbox', 'Playwright', 'Cypress', 'Storybook', 'Vitest', 'Remix',
  ];

  describe.each(locales)('%s', (_name, content) => {
    const strings = collectStrings(content);
    const haystack = strings.join('\n').toLowerCase();

    it.each(forbiddenPhrases)('never says "%s" — %s', (phrase) => {
      expect(haystack).not.toContain(phrase.toLowerCase());
    });

    it('lists no unevidenced skill', () => {
      const listed = content.skills.flatMap((group) => group.items.map((i) => i.toLowerCase()));
      const offenders = forbiddenSkills.filter((skill) => listed.includes(skill.toLowerCase()));
      expect(offenders).toEqual([]);
    });

    it('names the employer on every borrowed-scale metric', () => {
      for (const metric of content.metrics) {
        if (metric.attribution.kind === 'context') {
          expect(metric.attribution.employer.length).toBeGreaterThan(0);
        }
      }
    });

    it('cites a ledger claim id on every metric', () => {
      for (const metric of content.metrics) {
        expect(metric.claimId).toMatch(/^[A-Z]-\d{3}$/);
      }
    });
  });

  it('states tenure the one way the ledger allows', () => {
    expect(en.profile.blurb).toContain('Nearly six years');
    expect(ar.profile.blurb).toContain('قرابة ست سنوات');
  });
});

describe('bidi', () => {
  it('keeps metric values identical across locales — numerals are not translated', () => {
    expect(ar.metrics.map((metric) => metric.value)).toEqual(
      en.metrics.map((metric) => metric.value),
    );
  });
});
