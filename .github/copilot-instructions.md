# Copilot Instructions

## Job Application Workflow

When provided with a job application PDF, follow these steps to generate a cover letter.

### 1. Extraction

Read the PDF and extract the following (you might use `pdftotext`):

- Position name / job title
- Recipient email address
- Company or organization name
- Key requirements and technologies mentioned in the posting

### 2. Output

- Create a new text file in the **same folder as the source PDF**.
- **Language**: Match the language of the job application exactly (German, English, or Spanish).
- **Format**: Plain prose only. Do not use bullet points, numbered lists, bold, italic, or any other markdown formatting inside the letter body.

### 3. Structure (six paragraphs in order)

1. **Greeting** — Formal salutation addressed to the recipient or the hiring team.
2. **Introduction** — State the source of the application (e.g., AMS job board) and include a short motivational remark that explains concretely why this specific company or organization fits Alejandro's professional profile and interests.
3. **Matching Strengths** — Connect Alejandro's past projects, positions, and employers directly to the requirements of the role. Name specific companies and technologies from his history (see reference data below). Demonstrate alignment between what the employer needs and what Alejandro has delivered.
4. **History and Soft Skills** — Briefly summarise his overall background and mention relevant soft skills such as intercultural communication, voluntary work, self-directed learning, client-facing experience, and working in agile teams.
5. **Closure** — Express genuine interest in a personal interview to discuss the opportunity further.
6. **Sign-off** — End with "Best regards" (English), "Mit freundlichen Grüßen" (German), or "Atentamente" (Spanish), followed by a blank line and "Alejandro Hirsch". Always include a comma after the sign-off and before the name.

### 4. Footer (after the sign-off)

Place the following two lines at the very bottom of the file, separated from the sign-off by a blank line:

Recipient: [extracted email address]
Subject: [appropriate subject line for the application]

### 5. Writing Rules

- Never use a hyphen or dash to connect or separate sentences. Write complete sentences instead.
- In German, always address the reader with the formal "Sie" form (never "du"), unless explicitly instructed otherwise (eg. "use Du form").
- Integrate as many specific company names (alta gama / altagama.dev, Pixelart, Fredmansky, Monkee Rocks, P8 Marketing, Styletronic, INNIO, ad:morris, IAESTE) and technologies (Vue.js, Nuxt.js, React, Next.js, TypeScript, WordPress, Pimcore, Twig, Tailwind CSS, JavaScript, PHP, Cypress, Docker, REST API, etc.) as naturally possible without forcing irrelevant references.
- Keep the tone professional, confident, and concise. One page is the target length.

---

## Applicant Reference Data

Before writing the cover letter, read `data/cv-data.json` from the workspace root to obtain all applicant information. This file is the single source of truth and must always be read fresh so that any updates are reflected automatically.

The relevant fields are:

- `personal` — name, location, email, LinkedIn URL, and the `intro` text (use the correct language key: `en`, `de`, or `es`).
- `workExperience` — array of positions ordered most-recent first. Each entry contains `company`, `period`, `location`, `role`, `type`, and `technologies`. Use these to build the Matching Strengths paragraph.
- `skills` — `programmingLanguages`, `frameworks`, `developmentTools`, `otherTools`, and `methodologies`.
- `languages` — spoken language levels.
- `education` — academic background.
- `interests` and `driverLicense` — personal details for soft-skills paragraph if relevant.
