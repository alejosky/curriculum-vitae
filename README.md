# Alejandro Hirsch - CV

A modern, multilingual single-page CV application built with native web technologies and modern tooling (Vite, pnpm). No frontend framework is required at runtime, and all CV content is rendered from JSON. :)

🌐 **Live Demo**: [View CV](https://alejosky.github.io/curriculum-vitae/)

## Features

- 📄 **Single-page layout** - Two-column design with sidebar and main content area
- 🌍 **Multilingual** - English, German, and Spanish with translated UI labels and localized content
- 🌓 **Theme switching** - Auto, light, and dark modes with saved preference in local storage
- 🖨️ **Print-ready** - Optimized for A4 PDF export via browser print
- ⌨️ **Print shortcut support** - `Ctrl+P` and `Cmd+P` trigger the custom print flow
- 📱 **Responsive** - Mobile and tablet friendly layout
- ⭐ **Skill ratings** - Visual tachometer-style bars with translated hover labels
- 📎 **Certificate links** - Direct links to PDF certificates and references
- 🔗 **Company links** - Optional website buttons for work experience entries
- 🧩 **Native Web Component** - Work history is rendered with a custom `<cv-work-entry>` element
- ⚙️ **JSON-driven content** - Personal data, jobs, education, skills, languages, interests, and soft skills come from JSON files
- 🔄 **JSON reloads in dev** - Changes in `data/` and `i18n/` trigger a full reload during development

## Technology Stack

- **HTML5** - Semantic markup and static document structure
- **CSS3** - Grid layout, responsive behavior, theme variables, and print styles
- **JavaScript (ES modules)** - Rendering, translations, theme persistence, and print behavior
- **Web Components** - Custom `<cv-work-entry>` element with Shadow DOM
- **Vite** - Development server and production build pipeline
- **vite-plugin-static-copy** - Copies `data/`, `i18n/`, `documents/`, and required assets into `dist/`
- **pnpm** - Package manager
- **GitHub Actions** - Automatic deployment workflow
- **GitHub Pages** - Hosting target

### System Fonts Used

- **SF Pro Display/Text** (macOS)
- **Segoe UI** (Windows)
- **Ubuntu/Cantarell** (Linux)
- Fallback to `system-ui` and `sans-serif`

## Project Structure

```text
cv/
├── .github/
│   ├── copilot-instructions.md   # Repo-specific AI instructions
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment workflow
├── assets/
│   ├── face_1.jpg                # Profile photo
│   ├── favicon.png               # Favicon and social preview image
│   └── signature.png             # Signature image
├── components/
│   └── cv-work-entry.js          # Work entry web component
├── data/
│   └── cv-data.json              # CV content and structured profile data
├── documents/
│   ├── GISA_Gewerbelizenz.pdf
│   ├── HIRSCH A INNIO DZ.pdf
│   ├── HIRSCH A Monkee DZ.pdf
│   ├── HIRSCH A P8 DZ.pdf
│   ├── HIRSCH A Pimcore.pdf
│   ├── HIRSCH A Pixelart DZ.pdf
│   ├── HIRSCH A Sixt DZ.pdf
│   ├── HIRSCH A Styletronic DZ.pdf
│   └── HIRSCH A admorris DZ.pdf  # Employment certificates and related PDFs
├── i18n/
│   └── translations.json         # UI translations for EN, DE, and ES
├── scripts/
│   └── app.js                    # App bootstrap, rendering, i18n, theme, print
├── styles/
│   ├── main.css                  # Screen styles and responsive layout
│   └── print.css                 # Print-specific overrides
├── GEMINI.md                     # Project context for AI tools
├── index.html                    # Main HTML document
├── llms.txt                      # LLM-oriented profile summary
├── package.json                  # Scripts and dependencies
├── pnpm-lock.yaml                # Dependency lockfile
├── vite.config.js                # Vite config, base path, static copy, JSON watch
└── README.md                     # This file
```

## Getting Started

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/alejosky/curriculum-vitae.git
   cd curriculum-vitae
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

   This starts Vite's development server, usually at `http://localhost:5173`.

The app loads `data/cv-data.json` and `i18n/translations.json` via `fetch`, so it must be served over HTTP. Opening `index.html` directly from the filesystem is not a supported workflow.

**Alternative development methods (without Vite):**

```bash
# Using live-server (via npx, no installation needed)
npx live-server

# Using Python 3
python3 -m http.server 8000
```

### Editing Content

#### Update Personal Information

Edit `data/cv-data.json`:

```json
{
  "personal": {
    "name": "Your Name",
    "title": {
      "en": "Your Title",
      "de": "Ihr Titel",
      "es": "Tu título"
    },
    "email": "your.email@example.com"
  }
}
```

Many user-facing fields support either a plain string or a localized object with `en`, `de`, and `es` keys.

#### Add or Remove Work Experience

In `data/cv-data.json`, add entries to the `workExperience` array:

```json
{
  "id": "unique-id",
  "company": "Company Name",
  "period": "MM/YYYY — MM/YYYY",
  "location": {
    "en": "City, Country",
    "de": "Stadt, Land",
    "es": "Ciudad, País"
  },
  "role": {
    "en": "Your Role",
    "de": "Ihre Rolle",
    "es": "Tu rol"
  },
  "type": "remote",
  "description": {
    "en": ["Bullet point 1", "Bullet point 2"]
  },
  "technologies": ["Tech1", "Tech2"],
  "visible": true,
  "certificatePath": "documents/certificate.pdf",
  "companyUrl": "https://example.com"
}
```

Set `visible: false` to hide an entry without deleting it.

#### Update Skills

Skills are organized by category with 1 to 5 rating levels:

```json
{
  "name": "JavaScript",
  "level": 5
}
```

**Level mapping**:

- 1 and 2 = Basic
- 3 = Intermediate
- 4 = Advanced
- 5 = Expert

#### Update Translations

Edit `i18n/translations.json` to change static UI labels, section names, category titles, skill-level labels, and language names.

### Print to PDF

1. Click the `Print / Save as PDF` button
2. Or use `Ctrl+P` / `Cmd+P`
3. In the print dialog:
   - Set **Destination** to `Save as PDF`
   - Choose **A4** paper size
   - Enable **Background graphics**
4. Save the PDF

During printing, the app temporarily changes the document title to generate a cleaner filename based on the current profession and year. :)

## Deployment

### Production Build

To create an optimized production build:

```bash
pnpm run build
```

This uses Vite to:

- Bundle and minify the app
- Copy `data/`, `i18n/`, `documents/`, and `assets/face_1.jpg`
- Output the production site to the `dist` folder
- Use the GitHub Pages base path `/curriculum-vitae/`

To preview the production build locally:

```bash
pnpm run preview
```

### GitHub Pages (Automatic)

The repository includes a GitHub Actions workflow for automatic deployment.

On every push to `main`, the workflow:

1. checks out the repo
2. installs dependencies with `pnpm`
3. builds the site with Vite
4. uploads the `dist` artifact
5. deploys it to GitHub Pages

The workflow currently uses **Node.js 20** and **pnpm 8**.

### Manual Deployment

Deploy the contents of the `dist` folder to any static host such as Netlify or Vercel. If you host the site under a different repository name or subpath, update the Vite `base` setting in `vite.config.js` first.

## Customization

### Change Color Scheme

Edit `styles/main.css` to modify the theme variables and control styles:

```css
:root {
  --bg-primary: #f5f5f5;
  --text-primary: #333;
  --accent-color: #333;
}
```

### Add New Sections

1. Add the new data shape to `data/cv-data.json`
2. Add translation keys to `i18n/translations.json` if needed
3. Add the HTML container in `index.html`
4. Add a renderer in `scripts/app.js`
5. Add screen and print styling in `styles/main.css` and `styles/print.css`

### Modify Layout

The main layout is controlled in `styles/main.css`:

```css
.cv-container {
  grid-template-columns: 35% 65%;
}
```

## Browser Support

- Modern Chromium browsers
- Firefox
- Safari
- Modern mobile browsers

**Requirements**: ES modules, Fetch API, CSS Grid, Custom Elements, and Shadow DOM support.

## License

MIT

## Credits

**Alejandro Hirsch** - Web Developer  
🔗 [LinkedIn](https://www.linkedin.com/in/alejandro-hirsch-1b589117a/)  
💻 [GitHub](https://github.com/alejosky)  
📦 [Repository](https://github.com/alejosky/curriculum-vitae)

---

Built with ❤️ using native web technologies and modern tooling.
