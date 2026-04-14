# Copilot Instructions - Project Context: Alejandro Hirsch CV

This document gives implementation-accurate context for AI agents working in this repository.

## Project Summary

This project is a multilingual single-page CV site that renders content from JSON files and is published to GitHub Pages.

- Runtime stack: HTML5, CSS3, vanilla JavaScript ES modules, native Web Components.
- Tooling: Vite 5, pnpm, vite-plugin-static-copy.
- Languages: English, German, Spanish.
- Primary goals: data-driven content management, language and theme switching, and A4-optimized printing.

## Canonical Files

- `index.html`: Full page structure, control buttons, section containers, and script entrypoints.
- `scripts/app.js`: App bootstrap, data loading, rendering pipeline, i18n, theming, and print behavior.
- `components/cv-work-entry.js`: Shadow DOM web component used for each work experience entry.
- `data/cv-data.json`: Main profile content and structured CV data.
- `i18n/translations.json`: UI translation dictionaries and taxonomy labels.
- `styles/main.css`: Screen layout, responsive behavior, and light/dark theme variables.
- `styles/print.css`: Print-only A4 settings and page-break tuning.
- `vite.config.js`: Base path, static copy rules, and JSON watch-triggered full reload.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.
- `llms.txt`: LLM-oriented profile summary.

## Runtime Behavior

### Boot Process

On load, `scripts/app.js`:

1. Reads saved preferences from `localStorage`:
   - `cv-lang` default `en`
   - `cv-theme` default `auto`
2. Applies theme immediately via `applyTheme()`.
3. Fetches `data/cv-data.json` and `i18n/translations.json` in parallel.
4. Calls `setupLanguageSwitcher()` and `setupThemeSwitcher()`.
5. Renders all sections: `renderPersonalInfo`, `renderWorkExperience`, `renderEducation`, `renderSkills`, `renderLanguages`, `renderDriverLicense`, `renderSoftSkills`, `renderInterests`.
6. Calls `applyTranslations()` to fill `data-i18n` elements and update `document.title`.
7. Calls `setupPrintButton()`.

When the user switches language, all eight render functions plus `applyTranslations()` are called again.

### Internationalization

- Static labels use the `data-i18n` attribute in `index.html`. They are resolved in `applyTranslations()` by looking up `translations[currentLang][key]`.
- Dynamic values use the `t(key)` helper, which supports dot-notation (e.g. `t("status.notFinished")`).
- Data fields may be plain strings or localized objects (`{ en, de, es }`). Resolution always falls back to `en`.

### Theme System

- Theme modes: `auto`, `light`, `dark`.
- `auto` reads `prefers-color-scheme` on load and on system change events.
- The resolved theme is written to `body[data-theme]`; CSS variables in `styles/main.css` handle the rest.

### Section Rendering Details

**Personal (`renderPersonalInfo`)**

- Supports `personal.birthDate` (full date) or `personal.birthYear` (year only).
- Ordinal suffix (st/nd/rd/th) is appended only when `currentLang === "en"`.
- Phone is built from `personal.phone` or `personal.phoneParts` (`{ prefix, base, num }`), joined with spaces.
- `introText` appends a `🤖` emoji after the translated text.
- `signatureYear` DOM element is set to the current year.

**Work experience (`renderWorkExperience`)**

- Only entries with `visible: true` are rendered.
- Each entry creates a `<cv-work-entry>` element.
- `description` in JSON is an **array of strings** per language; it is joined with `|` before passing as an attribute.
- `technologies` in JSON is an **array of strings**; it is joined with `,` before passing as an attribute.
- Both a translated `type` (via `t(job.type)`) and a raw `entry-type` attribute are set.
- Optional attributes: `certificate-path` and `company-url`.
- Translated label attributes passed: `certificate-text`, `visit-website-text`, `technologies-label`.

**Education (`renderEducation`)**

- `edu.status` is converted to camelCase (e.g. `"not finished"` → `"notFinished"`) and resolved via `t("status.<key>")`.
- Status label is omitted when `edu.status === "completed"`.

**Skills (`renderSkills`)**

- Hardcoded category order: `programmingLanguages`, `frameworks`, `developmentTools`, `otherTools`, `methodologies`.
- Category titles resolved via `t("categories.<key>")`.
- Each skill shows a 5-bar tachometer visual based on `skill.level`.

**Languages (`renderLanguages`)**

- Labels from `translations.languageNames` and `translations.languageLevels`.

### Print Flow

- The print button and `Ctrl+P` / `Cmd+P` shortcuts call `window.print()`.
- Before printing, `document.title` is temporarily set to `HIRSCH_<profession_slug>_<year>`.
- Title is restored via the `afterprint` event plus a timeout fallback.
- `styles/print.css` enforces `@page { size: A4 }`, hides `.no-print` and `.floating-controls`, and avoids splitting key blocks across pages.

## Web Component: `cv-work-entry`

`components/cv-work-entry.js` defines `<cv-work-entry>` with:

- Shadow DOM encapsulation with all CSS inlined in the template.
- Observed attributes: `company`, `period`, `location`, `role`, `type`, `description`, `technologies`, `certificate-path`, `company-url`, `certificate-text`, `visit-website-text`, `technologies-label`.
- `description` is split on `|` to produce a bullet list; `technologies` is split on `,`.
- Action links (`certificate-path`, `company-url`) are marked `.no-print` and hidden during printing.
- CSS variables (`--text-primary`, `--text-secondary`, `--text-tertiary`, `--bg-sidebar`, `--bg-primary`) inherit from the host page for theming.

## Build and Dev Workflow

### Commands

```bash
pnpm install      # install deps
pnpm dev          # start Vite dev server (required — app fetches JSON at runtime)
pnpm run build    # production build to dist/
pnpm run preview  # preview production build locally
```

> **Important:** Always use `pnpm dev` (or another HTTP server) for local development. Opening `index.html` directly as a `file://` URL will fail because `scripts/app.js` fetches `data/cv-data.json` and `i18n/translations.json` at runtime.

### Live Editing Data

The custom `watchStaticJson` Vite plugin watches the `data/` and `i18n/` directories and sends a `full-reload` to the browser whenever a file there changes. Edit either JSON file and the dev server reloads immediately — no manual refresh needed.

### Vite Configuration

`vite.config.js` configures:

- Base path: `/curriculum-vitae/`.
- Build output: `dist/`.
- Static copy targets (these files are **not** bundled by Vite; they must be copied explicitly):
  - `data/` → `dist/data/`
  - `i18n/` → `dist/i18n/`
  - `documents/` → `dist/documents/`
  - `assets/face_1.jpg` → `dist/assets/face_1.jpg`
- If you add new runtime-fetched files (JSON, PDFs, etc.), add them to the `targets` array in `viteStaticCopy`.

## Deployment

GitHub Actions workflow in `.github/workflows/deploy.yml`:

- Trigger: push to `main` and manual dispatch.
- Environment: Node 20 + pnpm 8.
- Steps: install, build, upload `dist/`, deploy to GitHub Pages.

## Data Model Notes

`data/cv-data.json` top-level blocks:

| Block            | Notes                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `personal`       | Name, title, photo, birth info, contact, intro (all multilingual objects or plain strings)                                                                                                         |
| `workExperience` | Array; each entry has `id`, `company`, `period`, `location`, `role`, `type`, `description` (array per lang), `technologies` (string array), `visible`, optional `certificatePath` and `companyUrl` |
| `education`      | Array; each entry has `institution`, `degree`, `location`, `period`, `status`                                                                                                                      |
| `skills`         | Object with keys: `programmingLanguages`, `frameworks`, `developmentTools`, `otherTools`, `methodologies`; each is an array of `{ name, level }`                                                   |
| `languages`      | Array of `{ language, level }`                                                                                                                                                                     |
| `interests`      | Multilingual array or string                                                                                                                                                                       |
| `driverLicense`  | Plain string or multilingual object                                                                                                                                                                |
| `softSkills`     | Array of multilingual strings                                                                                                                                                                      |

Most display fields are multilingual objects (`{ en, de, es }`). Plain strings are treated as universal fallbacks.

## Editing Guidance for Agents

- **Content changes** belong in `data/cv-data.json`; **UI label changes** belong in `i18n/translations.json`.
- Keep all three language keys (`en`, `de`, `es`) in sync when editing multilingual fields.
- To add a new work entry: append to `workExperience` array with `visible: true` and all required fields.
- To add a new skill category: add the key to both `data/cv-data.json` under `skills` and to the `categories` object in `renderSkills()` in `scripts/app.js`, and add translations for `categories.<newKey>` in all three language blocks of `i18n/translations.json`.
- Preserve `data-i18n` bindings and `aria-label` attributes in `index.html`.
- After any layout or typography changes, verify A4 print output — this is a primary use case.
- Do not add new runtime-fetched assets without updating `vite.config.js` static copy targets.
