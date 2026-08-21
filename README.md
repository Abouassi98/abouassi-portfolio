# abouassi-portfolio

My portfolio, and deliberately also a work sample: a small React + TypeScript
site that I would be comfortable having someone read line by line.

**Live:** https://abouassi98.github.io/abouassi-portfolio/ — in English and Arabic.

```bash
npm ci
npm run dev        # http://localhost:5173/abouassi-portfolio/
npm test           # 95 tests
npm run lint       # eslint, type-aware
npm run typecheck  # tsc -b
npm run build
```

---

## Why this repository exists

My public GitHub is mostly Dart. My CV says I write React and TypeScript. Both
are true — the React work is in private client repositories — but a reviewer
opening my GitHub sees only the contradiction, and "trust me, it's private" is
not evidence. So this site is written in the stack it claims, and the code is
meant to be the argument rather than the copy on the page.

That framing decided most of what follows. It is a static, single-page site
with no data fetching and no router; the interesting problems here are
correctness, accessibility, bilingual layout, and not saying anything I cannot
defend. Those are the things I tried to do properly.

---

## Where the content comes from

Every factual claim on this site is governed by a fact ledger I maintain
outside this repository, the same one my CVs run under. Each claim has an
attribution class, an interview defence, and a status; claims that could not be
defended were deleted from it and must not come back.

Two of those rules are enforced by the code rather than by remembering them.

**Borrowed scale must name whose scale it is.** Numbers like total value
processed are context — the scale I worked inside, not something I caused. The
ledger requires the employer named inline wherever such a number appears. So
the type makes an employer-less context metric unrepresentable:

```ts
export type Attribution =
  | { readonly kind: 'causal' }        // I implemented it
  | { readonly kind: 'contribution' }  // I moved it; I did not solely cause it
  | { readonly kind: 'context'; readonly employer: string };
```

`MetricTile` has to handle the `context` branch to compile, and it appends the
employer there. The rule cannot be dropped in a later edit without a type error.

**Deleted claims must stay deleted.** `src/content/content.test.ts` asserts that
no retired metric or forbidden phrase appears anywhere in either locale, and
that no unevidenced technology appears in the skills list. Those phrases had
been removed by hand once before and reappeared. A test fails the build; a
review relies on someone remembering. The same file also asserts the two locales
expose the same claim ids in the same order, so a claim cannot be added to one
language only.

This is the part of the repository I would most want a reviewer to look at. It
is a small idea, but it is the one that generalises: if a constraint matters,
encode it where it will be checked.

---

## Accessibility

`npm test` runs axe over the whole page in both locales and fails on any
violation. Lighthouse reports **100** for accessibility. Beyond the automated
pass:

- **Tabs** (`Tracks.tsx`) follow the WAI-ARIA pattern with a roving tabindex,
  Home/End, and wrap-around arrows. Arrow keys follow *visual* order, so in
  Arabic `ArrowLeft` moves forward. Hard-coding `ArrowRight` as "next" passes
  every English test and is wrong for every RTL user; there is a test for it.
- **Disclosures** (`ProjectCard.tsx`) use `hidden` on the collapsed panel rather
  than a zero-height wrapper. The height trick animates more nicely and leaves
  every link inside a collapsed panel in the tab order — a keyboard user tabs
  into content that is not on screen. There is a test for that too.
- Each project name sits in a real `<h3>` wrapping the toggle button, not in a
  button that happens to look like a heading.
- Motion is behind `prefers-reduced-motion`, including smooth scrolling. The
  scroll-reveal degrades to "visible" when `IntersectionObserver` is missing,
  **and** on a timer if the observer exists but never fires. That second case is
  real: a background tab receives no intersection callbacks at all, so without
  it a crawler running JavaScript on a hidden page would index a blank
  document. An enhancement that hides content on failure is not an
  enhancement.

## Arabic and RTL

`dir` and `lang` are set on `<html>`, the choice is persisted, and a small
inline script in `index.html` applies it **before first paint** — otherwise an
Arabic visitor sees one frame of left-to-right layout and a visible reflow.

Layout uses logical properties (`border-s`, `ps-*`, `-start-*`, `text-start`)
so nothing needs an RTL override.

Two bidi details that only show up once you actually look at the page in Arabic:

- `4s → 1s` reorders in an RTL paragraph and the arrow ends up pointing the
  wrong way. Numeric values are wrapped in `<bdi dir="ltr">`, which isolates
  the internal order without changing alignment the way `dir="ltr"` on a block
  would.
- The `MA.` monogram rendered as `.MA`, because a trailing full stop is a
  neutral character and migrates. Same fix.

Arabic uses the platform's own Arabic face rather than a webfont. Outfit has no
Arabic glyphs, and the system Arabic fonts on every target OS are better hinted
and better shaped than anything worth adding 100 kB for.

## Performance

One deliberate optimisation, measured before and after with Lighthouse 12.8.2,
headless Chrome, mobile preset, against `vite preview`:

|                          | before  | after   |
| ------------------------ | ------- | ------- |
| Performance              | **87**  | **100** |
| Accessibility            | 100     | 100     |
| Best practices           | 96      | 100     |
| SEO                      | 100     | 100     |
| First Contentful Paint   | 2.9 s   | 1.2 s   |
| Largest Contentful Paint | 2.9 s   | 1.5 s   |
| Speed Index              | 4.8 s   | 1.2 s   |
| Total page weight        | 129 kB  | 98 kB   |

**What changed.** The page was loading two families from Google Fonts —
Outfit at six static weights plus JetBrains Mono at two — through a
render-blocking stylesheet on a third-party origin. That is a DNS lookup, a TLS
handshake and a stylesheet round trip before any text can paint.

1. Self-hosted one Outfit **variable** file (32 kB) covering weights 300–800,
   replacing six static files, and preloaded it. No third-party origin remains.
2. Dropped JetBrains Mono for the system monospace stack. It was decorative and
   cost 47 kB.
3. Added a favicon — the missing one was a 404 in the console, which is what
   held best practices at 96.

Most of the win is (1): removing the render-blocking third-party request is
what moved FCP by 1.7 s.

The live site, measured over the network rather than against `vite preview`,
scores **99 / 100 / 100 / 100**.

Build output: **182 kB JS (58.5 kB gzip)**, 17 kB CSS (4.1 kB gzip), 32 kB font.
Test coverage: 98% of statements.

---

## Trade-offs, and what I chose not to do

- **No i18n library.** i18next is what I use professionally, and I did not use
  it here. Two locales, no plurals, no interpolation beyond one formatter, and
  no runtime translation loading — a typed `SiteContent` interface with one
  object per locale gives full type safety, catches a missing key at compile
  time rather than at runtime, and costs nothing in bundle. A library here
  would be resume-driven.
- **I did not code-split the Arabic locale.** Shipping both to everyone costs
  roughly 8 kB gzipped. Splitting it means either a loading state on first paint
  for Arabic visitors or a flash of English, and Suspense plumbing through the
  provider. Not worth it at this size — but it is the first thing I would change
  if the content grew.
- **No animation on the disclosure.** Correct keyboard behaviour was worth more
  than the height transition. See Accessibility above.
- **No state management library, no router, no UI kit.** One page, no server
  state, no routes. `useState` and a context is the whole of it.
- **`noUncheckedIndexedAccess` is on**, and collections that must not be empty
  are `readonly [T, ...T[]]` rather than `T[]`. That removed every non-null
  assertion from application code instead of hiding the problem behind `!`.
- **The site is static.** There is a Spring Boot service in a separate
  repository as the backend work sample. It is deliberately not a backend for
  this page: a live service is a thing that can be down when someone is looking,
  and it would add nothing here.

## Stack

React 18 · TypeScript 5 (strict, plus `noUncheckedIndexedAccess`,
`verbatimModuleSyntax`) · Vite 7 · Tailwind CSS 3 · Vitest 3 ·
React Testing Library · axe-core · ESLint 9 with type-aware rules and
`jsx-a11y`.

CI runs typecheck, lint, tests with coverage, build and `npm audit` on every
push and pull request.

## Layout

```
src/
  content/     types.ts (the shape + the attribution union), en.ts, ar.ts
               content.test.ts — the fact-ledger guard
  i18n/        locale registry, provider, useLocale hook
  components/  one file per section, plus Reveal / Section / MetricTile
  hooks/       useReveal
  test/        setup, axe helper, render-with-locale helper
```
