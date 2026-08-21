import axe, { type AxeResults, type ElementContext, type RunOptions } from 'axe-core';
import { expect } from 'vitest';

/**
 * Rules that cannot be meaningfully evaluated on a detached jsdom fragment.
 * `color-contrast` needs real layout and computed styles, which jsdom does not
 * do — leaving it on produces "incomplete", not a pass, so it is checked in the
 * browser via Lighthouse instead (see README § Accessibility).
 */
const JSDOM_UNSUPPORTED: RunOptions = {
  rules: { 'color-contrast': { enabled: false } },
};

function describeViolations(results: AxeResults): string {
  return results.violations
    .map((violation) => {
      const targets = violation.nodes.map((node) => node.target.join(' ')).join('\n      ');
      return `  [${violation.impact ?? 'unknown'}] ${violation.id}: ${violation.help}\n      ${targets}`;
    })
    .join('\n');
}

/** Runs axe over `container` and fails with the violation list, not just a count. */
export async function expectNoAxeViolations(container: ElementContext): Promise<void> {
  const results = await axe.run(container, JSDOM_UNSUPPORTED);
  expect(results.violations, `axe found ${results.violations.length} violation(s):\n${describeViolations(results)}`).toEqual([]);
}
