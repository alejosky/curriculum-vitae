# GEMINI.md - Project Context: Alejandro Hirsch CV

This document provides essential context and instructions for AI agents working on this project.

## Project Overview

A modern, multilingual (English, German, Spanish) single-page CV application built with native web technologies and modern tooling. It is designed to be highly maintainable, data-driven, and print-optimized.

- **Primary Technologies:** Vanilla JavaScript (ES6+), Web Components, HTML5, CSS3 (Grid/Flexbox).
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Package Manager:** `pnpm`
- **Architecture:** Data-driven rendering. Content is separated from logic and presentation, stored in JSON files.

## Project Structure

- `index.html`: Main entry point and structural layout.
- `scripts/app.js`: Core application logic (data fetching, state management, rendering, i18n).
- `components/cv-work-entry.js`: Native Web Component for work experience entries.
- `data/cv-data.json`: Main CV content (personal info, experience, education, skills).
- `i18n/translations.json`: Translation strings for the UI and static labels.
- `styles/`:
  - `main.css`: Core layout and styling (including dark/light themes).
  - `print.css`: Specialized styles for high-quality PDF/Print output.
- `assets/`: Images (photos, signatures, favicons).
- `documents/`: PDF certificates and other downloadable documents.

## Building and Running

### Development
```bash
pnpm dev
```
Starts the Vite development server at `http://localhost:5173`.

### Production Build
```bash
pnpm run build
```
Generates an optimized, minified version of the site in the `dist/` directory.

### Preview Build
```bash
pnpm run preview
```
Serves the production build locally for verification.

## Development Conventions

### Data Management
- Most fields in `data/cv-data.json` support multi-language objects:
  ```json
  "title": {
    "en": "Web Developer",
    "de": "Webentwickler",
    "es": "Desarrollador Web"
  }
  ```
- If a string is provided instead of an object, it's used as a fallback for all languages.

### Internationalization (i18n)
- **Static Text:** Use the `data-i18n` attribute in HTML. `app.js` will automatically replace the text content based on the selected language.
- **Dynamic Text:** Use the `t(key)` helper function in `app.js` to retrieve translated strings from `i18n/translations.json`.

### Web Components
- The project uses native Web Components for repeated UI patterns.
- Example: `<cv-work-entry>` is used for work experience items. Attributes are used to pass data, and it handles its own internal styling via Shadow DOM.

### Theme Support
- Supports Light, Dark, and Auto (system-based) themes.
- Theme state is persisted in `localStorage`.
- CSS variables in `main.css` handle theme-specific colors.

### Print Optimization
- The site is specifically tuned for A4 PDF export.
- Use `styles/print.css` for any print-specific adjustments (hiding UI controls, forcing page breaks, etc.).
- The `no-print` class can be used to hide elements during printing.

## Deployment
- Automated via GitHub Actions (see `.github/workflows/deploy.yml`).
- Deployed to GitHub Pages.
- Production builds use the base path `/curriculum-vitae/` as configured in `vite.config.js`.
