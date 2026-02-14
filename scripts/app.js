// Main application logic
let cvData = null;
let translations = null;
let currentLang = localStorage.getItem("cv-lang") || "en";
let currentTheme = localStorage.getItem("cv-theme") || "auto";

// Detect and apply system theme
function detectSystemTheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Apply theme
function applyTheme(theme) {
  if (theme === "auto") {
    const systemTheme = detectSystemTheme();
    document.body.setAttribute("data-theme", systemTheme);
  } else {
    document.body.setAttribute("data-theme", theme);
  }
}

// Setup theme switcher
function setupThemeSwitcher() {
  const themeButtons = document.querySelectorAll(".theme-btn");

  themeButtons.forEach((btn) => {
    if (btn.dataset.theme === currentTheme) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentTheme = btn.dataset.theme;
      localStorage.setItem("cv-theme", currentTheme);

      themeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyTheme(currentTheme);
    });
  });

  // Listen for system theme changes
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (currentTheme === "auto") {
          applyTheme("auto");
        }
      });
  }
}

// Load data and initialize app
async function init() {
  try {
    // Apply theme immediately
    applyTheme(currentTheme);

    // Load CV data and translations
    const [cvResponse, translationsResponse] = await Promise.all([
      fetch("data/cv-data.json"),
      fetch("i18n/translations.json"),
    ]);

    cvData = await cvResponse.json();
    translations = await translationsResponse.json();

    // Set up language switcher
    setupLanguageSwitcher();

    // Set up theme switcher
    setupThemeSwitcher();

    // Render all sections
    renderPersonalInfo();
    renderWorkExperience();
    renderEducation();
    renderSkills();
    renderLanguages();
    renderInterests();

    // Apply translations
    applyTranslations();

    // Set up print button
    setupPrintButton();
  } catch (error) {
    console.error("Error loading CV data:", error);
  }
}

// Setup language switcher
function setupLanguageSwitcher() {
  const langButtons = document.querySelectorAll(".lang-btn");

  langButtons.forEach((btn) => {
    if (btn.dataset.lang === currentLang) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem("cv-lang", currentLang);

      langButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyTranslations();
      renderWorkExperience(); // Re-render to update certificate text
    });
  });
}

// Apply translations to static elements
function applyTranslations() {
  const lang = translations[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (lang[key]) {
      element.textContent = lang[key];
    }
  });

  // Update document title
  document.title = `${cvData.personal.name} - ${lang.title}`;
}

// Get translated text
function t(key) {
  const keys = key.split(".");
  let value = translations[currentLang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

// Render personal information
function renderPersonalInfo() {
  const { personal } = cvData;

  document.getElementById("profilePhoto").src = personal.photo;
  document.getElementById("cvName").textContent = personal.name;
  document.getElementById("cvTitle").textContent = personal.title;

  const birthDate = new Date(personal.birthDate);
  const birthYear = birthDate.getFullYear();
  const day = birthDate.getDate();
  const month = birthDate.toLocaleString(currentLang, { month: "long" });

  document.getElementById("birthInfo").innerHTML =
    `<strong>${t("born")}</strong> ${day}<sup>${getOrdinalSuffix(day)}</sup> ${month} ${birthYear}<br>${personal.birthPlace}<br>${personal.nationality}`;

  document.getElementById("address").innerHTML = `${personal.address}<br>${personal.city}`;
  document.getElementById("phone").innerHTML =
    `<a href="tel:${personal.phone}">${personal.phone}</a>`;
  document.getElementById("email").innerHTML =
    `<a href="mailto:${personal.email}">${personal.email}</a>`;

  document.getElementById("maritalStatus").innerHTML =
    `${t("single")}, ${t("noChildren")}`;

  document.getElementById("driverLicense").textContent = t("driverLicense");

  document.getElementById("quote").textContent = `"${personal.quote}"`;
  document.getElementById("quoteAuthor").textContent =
    `— ${personal.quoteAuthor}`;

  document.getElementById("introText").textContent = personal.intro;

  document.getElementById("signatureName").textContent = personal.name;
  document.getElementById("signatureYear").textContent =
    `— ${new Date().getFullYear()}`;
}

// Get ordinal suffix for dates
function getOrdinalSuffix(day) {
  if (currentLang !== "en") return "";

  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// Render work experience
function renderWorkExperience() {
  const container = document.getElementById("workExperienceList");
  container.innerHTML = "";

  cvData.workExperience.forEach((job) => {
    if (!job.visible) return;

    const entry = document.createElement("cv-work-entry");
    entry.setAttribute("company", job.company);
    entry.setAttribute("period", job.period);
    entry.setAttribute("location", job.location);
    entry.setAttribute("role", job.role);
    entry.setAttribute("type", t(job.type));
    entry.setAttribute("description", job.description.join("|"));
    entry.setAttribute("technologies", job.technologies.join(","));
    entry.setAttribute("entry-type", job.type);
    entry.setAttribute("certificate-text", t("seeCertificate"));
    entry.setAttribute("visit-website-text", t("visitWebsite"));

    if (job.certificatePath) {
      entry.setAttribute("certificate-path", job.certificatePath);
    }

    if (job.companyUrl) {
      entry.setAttribute("company-url", job.companyUrl);
    }

    container.appendChild(entry);
  });
}

// Render education
function renderEducation() {
  const container = document.getElementById("educationList");
  container.innerHTML = "";

  cvData.education.forEach((edu) => {
    const entry = document.createElement("div");
    entry.className = "education-entry";

    entry.innerHTML = `
      <div class="education-header">
        <div>
          <h3 class="institution">${edu.institution}</h3>
          <p class="degree">${edu.location}</p>
        </div>
        <span class="period">${edu.period}</span>
      </div>
      <p class="degree-info">${edu.degree} ${edu.status !== "completed" ? `(${t("status." + edu.status.replace(" ", ""))})` : ""}</p>
    `;

    container.appendChild(entry);
  });
}

// Render skills with star ratings
function renderSkills() {
  const container = document.getElementById("skillsList");
  container.innerHTML = "";

  const categories = {
    programmingLanguages: cvData.skills.programmingLanguages,
    frameworks: cvData.skills.frameworks,
    developmentTools: cvData.skills.developmentTools,
    otherTools: cvData.skills.otherTools,
    methodologies: cvData.skills.methodologies,
  };

  Object.entries(categories).forEach(([categoryKey, skills]) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "skill-category";

    const categoryTitle = document.createElement("h3");
    categoryTitle.className = "skill-category-title";
    categoryTitle.textContent = t("categories." + categoryKey);
    categoryDiv.appendChild(categoryTitle);

    const skillsGrid = document.createElement("div");
    skillsGrid.className = "skills-grid";

    skills.forEach((skill) => {
      const skillItem = document.createElement("div");
      skillItem.className = "skill-item";

      const skillName = document.createElement("span");
      skillName.className = "skill-name";
      skillName.textContent = skill.name;

      const stars = createStarRating(skill.level, skill.levelLabel);

      skillItem.appendChild(skillName);
      skillItem.appendChild(stars);
      skillsGrid.appendChild(skillItem);
    });

    categoryDiv.appendChild(skillsGrid);
    container.appendChild(categoryDiv);
  });
}

// Create star rating with hover label
function createStarRating(level, label) {
  const container = document.createElement("span");
  container.className = "star-rating";
  container.setAttribute("title", t("skillLevels." + label.toLowerCase()));

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.className = i <= level ? "star filled" : "star empty";
    star.textContent = i <= level ? "★" : "☆";
    container.appendChild(star);
  }

  return container;
}

// Render languages
function renderLanguages() {
  const container = document.getElementById("languagesList");
  container.innerHTML = "";

  cvData.languages.forEach((lang) => {
    const langItem = document.createElement("div");
    langItem.className = "language-item";

    const levelText =
      lang.level === "Native"
        ? t("languageLevels.native")
        : `${lang.level}, ${t("languageLevels." + lang.label)}`;

    langItem.innerHTML = `
      <span class="language-name">${lang.name}</span>
      <span class="language-level">${levelText}</span>
    `;

    container.appendChild(langItem);
  });
}

// Render interests
function renderInterests() {
  const container = document.getElementById("interestsList");
  container.innerHTML = "";

  cvData.interests.forEach((interest) => {
    const li = document.createElement("li");
    li.textContent = interest;
    container.appendChild(li);
  });
}

// Setup print button
function setupPrintButton() {
  document.getElementById("printBtn").addEventListener("click", () => {
    window.print();
  });
}

// Initialize app when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
