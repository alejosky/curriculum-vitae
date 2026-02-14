# Alejandro Hirsch - CV

A modern, multilingual single-page CV application built with native web technologies. No external dependencies, frameworks, or libraries required.

🌐 **Live Demo**: [View CV](https://alejosky.github.io/curriculum-vitae/)

## Features

- 📄 **Single-page layout** - Two-column design (sidebar + main content)
- 🌍 **Multilingual** - English (default), German, and Spanish
- 🖨️ **Print-ready** - Optimized for PDF export via browser print
- 📱 **Responsive** - Mobile and tablet friendly
- ⭐ **Skill ratings** - Visual star system with hover labels
- 📎 **Certificate links** - Direct links to employment certificates (Dienstzeugnis)
- 🎨 **Clean design** - Elegant typography using system fonts
- 🚀 **Zero dependencies** - Pure HTML, CSS, and vanilla JavaScript
- ⚙️ **Easy to maintain** - Content managed via JSON files

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Grid layout, print styles
- **JavaScript (ES6+)** - Web Components, async/await
- **Web Components** - Custom `<cv-work-entry>` element
- **GitHub Actions** - Automated deployment
- **GitHub Pages** - Free hosting with HTTPS

### System Fonts Used

- **SF Pro Display/Text** (macOS)
- **Segoe UI** (Windows)
- **Ubuntu/Cantarell** (Linux)
- Fallback to system-ui and sans-serif

## Project Structure

```
cv/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── assets/
│   ├── profile-photo.jpg       # Profile photo
│   └── *.pdf                   # Document files
├── components/
│   └── cv-work-entry.js        # Work entry web component
├── data/
│   └── cv-data.json            # CV content (jobs, skills, etc.)
├── documents/
│   └── *.pdf                   # Employment certificates
├── i18n/
│   └── translations.json       # Translations (EN/DE/ES)
├── scripts/
│   └── app.js                  # Main application logic
├── styles/
│   ├── main.css                # Main styles
│   └── print.css               # Print-specific styles
├── index.html                  # Main HTML file
└── README.md                   # This file
```

## Getting Started

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/alejosky/curriculum-vitae.git
   cd curriculum-vitae
   ```

2. Start a development server with hot reloading (automatically refreshes on file changes):

   **Recommended: Using live-server (via npx, no installation needed)**

   ```bash
   npx live-server
   ```

   This will open your browser automatically and reload on any file change.

   **Alternative: Using browser-sync**

   ```bash
   npx browser-sync start --server --files "**/*"
   ```

   **Without hot reload:**

   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Using Node.js serve
   npx serve

   # Or simply open the file
   open index.html
   ```

3. Visit the local address shown in your terminal (e.g., `http://127.0.0.1:8080` for live-server)

### Editing Content

#### Update Personal Information

Edit `data/cv-data.json`:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your.email@example.com",
    ...
  }
}
```

#### Add/Remove Work Experience

In `data/cv-data.json`, add entries to the `workExperience` array:

```json
{
  "id": "unique-id",
  "company": "Company Name",
  "period": "MM/YYYY — MM/YYYY",
  "location": "City, Country",
  "role": "Your Role",
  "type": "remote",
  "description": ["Bullet point 1", "Bullet point 2"],
  "technologies": ["Tech1", "Tech2"],
  "visible": true,
  "certificatePath": "documents/certificate.pdf"
}
```

Set `visible: false` to hide specific entries.

#### Update Skills

Skills are organized by category with 1-5 star ratings:

```json
{
  "name": "JavaScript",
  "level": 5
}
```

**Level mapping**: Level numbers automatically map to labels:

- 1-2: Basic
- 3: Intermediate
- 4: Advanced
- 5: Expert

#### Add Translations

Edit `i18n/translations.json` to modify or add translations for the three supported languages.

### Print to PDF

1. Click the "Print / Download PDF" button
2. In the print dialog:
   - Set **Destination** to "Save as PDF"
   - Choose **A4** paper size
   - Enable **Background graphics**
3. Save the PDF

## Deployment

### GitHub Pages (Automatic)

The repository includes a GitHub Actions workflow for automatic deployment.

1. Push your changes to the `main` branch:

   ```bash
   git add .
   git commit -m "Update CV"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to repository **Settings** → **Pages**
   - Under "Build and deployment", select **GitHub Actions**

3. The site will be available at: `https://alejosky.github.io/curriculum-vitae/`

### Manual Deployment

Upload the entire project to any static web host (Netlify, Vercel, etc.).

## Customization

### Change Color Scheme

Edit `styles/main.css` to modify colors:

```css
/* Example: Change accent color */
.lang-btn.active {
  background: #007bff; /* Your color */
}
```

### Add New Sections

1. Add data to `data/cv-data.json`
2. Add rendering function in `scripts/app.js`
3. Add HTML container in `index.html`
4. Add styles in `styles/main.css`

### Modify Layout

The two-column layout is defined in `styles/main.css`:

```css
.cv-container {
  grid-template-columns: 35% 65%; /* Adjust ratio */
}
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Modern mobile browsers

**Requirements**: Web Components support (Custom Elements, Shadow DOM)

## License

This project is open source and available for personal and commercial use.

## Credits

**Alejandro Hirsch** - Web Developer  
🔗 [LinkedIn](https://www.linkedin.com/in/alejandro-hirsch-1b589117a/)  
💻 [GitHub](https://github.com/alejosky)  
📦 [Repository](https://github.com/alejosky/curriculum-vitae)

---

Built with ❤️ using native web technologies. No frameworks. No build tools. No dependencies.
