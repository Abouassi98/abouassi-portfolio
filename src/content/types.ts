/**
 * The shape of everything this site says about Mohamed.
 *
 * ⚠️ The prose in `en.ts` and `ar.ts` is governed by
 * `job_hunter/resumes/FACT_LEDGER.json`. A claim that is not in the ledger does
 * not go here. See README.md § "Where the content comes from".
 *
 * The types below are not decoration: two of the ledger's rules are enforced
 * structurally rather than by review, because review is what failed last time.
 */

/**
 * The ledger's attribution classes.
 *
 * `context` carries `employer` in the type — not by convention — because the
 * ledger requires borrowed scale to name the employer inline wherever it
 * appears. A context metric without an employer does not compile, so the rule
 * cannot be lost in a later edit.
 */
/** A collection the site cannot sensibly render as empty. */
export type NonEmpty<T> = readonly [T, ...T[]];

export type Attribution =
  | { readonly kind: 'causal' }
  | { readonly kind: 'contribution' }
  | { readonly kind: 'context'; readonly employer: string };

/** A headline number. `claimId` is the ledger row it answers to. */
export interface Metric {
  readonly claimId: string;
  readonly value: string;
  readonly label: string;
  readonly note: string;
  readonly attribution: Attribution;
}

export interface ExternalLink {
  readonly label: string;
  readonly href: string;
}

export type TrackId = 'mobile' | 'web' | 'backend';

export interface Track {
  readonly id: TrackId;
  readonly name: string;
  readonly line: string;
  readonly points: readonly string[];
  /** Proper nouns; identical across locales by design. */
  readonly stack: readonly string[];
}

export type ProjectId =
  | 'bravo'
  | 'daftarpay'
  | 'mycity'
  | 'mozodi'
  | 'alahram';

export interface Project {
  readonly id: ProjectId;
  readonly name: string;
  readonly role: string;
  readonly period: string;
  readonly domain: string;
  readonly summary: string;
  readonly points: readonly string[];
  readonly tags: readonly string[];
  readonly links?: readonly ExternalLink[];
}

export interface Role {
  readonly org: string;
  /** Employer of record, where it differs from the org the work was for. */
  readonly note?: string;
  readonly role: string;
  readonly period: string;
  readonly where: string;
}

export interface SkillGroup {
  readonly group: string;
  readonly items: readonly string[];
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly status: string;
  readonly blurb: string;
  readonly email: string;
  readonly links: readonly ExternalLink[];
}

/** Every string the chrome needs, so no component holds a hard-coded label. */
export interface UiStrings {
  readonly skipToContent: string;
  readonly nav: {
    readonly work: string;
    readonly tracks: string;
    readonly experience: string;
    readonly skills: string;
    readonly contact: string;
  };
  readonly heroCta: string;
  readonly sections: {
    readonly work: { readonly eyebrow: string; readonly title: string };
    readonly tracks: { readonly eyebrow: string; readonly title: string };
    readonly experience: { readonly eyebrow: string; readonly title: string };
    readonly skills: { readonly eyebrow: string; readonly title: string };
    readonly contact: { readonly eyebrow: string; readonly title: string };
  };
  readonly contactBlurb: string;
  readonly localeSwitchLabel: string;
  /** Appended to an external link so its accessible name is unique and honest. */
  readonly externalLinkContext: (projectName: string) => string;
  readonly builtWith: string;
}

export interface SiteContent {
  readonly profile: Profile;
  readonly metrics: NonEmpty<Metric>;
  readonly tracks: NonEmpty<Track>;
  readonly projects: NonEmpty<Project>;
  readonly experience: NonEmpty<Role>;
  readonly skills: NonEmpty<SkillGroup>;
  readonly languages: string;
  readonly education: string;
  readonly ui: UiStrings;
}
