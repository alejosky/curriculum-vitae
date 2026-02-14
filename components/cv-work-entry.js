class CvWorkEntry extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["certificate-text", "visit-website-text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (
      (name === "certificate-text" || name === "visit-website-text") &&
      oldValue !== newValue
    ) {
      this.render();
    }
  }

  render() {
    const company = this.getAttribute("company") || "";
    const period = this.getAttribute("period") || "";
    const location = this.getAttribute("location") || "";
    const role = this.getAttribute("role") || "";
    const type = this.getAttribute("type") || "";
    const description = this.getAttribute("description") || "";
    const technologies = this.getAttribute("technologies") || "";
    const certificatePath = this.getAttribute("certificate-path");
    const companyUrl = this.getAttribute("company-url");
    const certificateText =
      this.getAttribute("certificate-text") || "See certificate";
    const visitWebsiteText =
      this.getAttribute("visit-website-text") || "Visit website";

    const descriptionList = description
      ? description.split("|").filter((d) => d.trim())
      : [];
    const techList = technologies
      ? technologies.split(",").filter((t) => t.trim())
      : [];

    let certificateButton = "";
    if (certificatePath) {
      certificateButton = `
        <a href="${certificatePath}" target="_blank" rel="noopener noreferrer" class="action-link no-print">
          <span class="action-icon">📄</span>
          <span class="action-text">${certificateText}</span>
        </a>
      `;
    }

    let websiteButton = "";
    if (companyUrl) {
      websiteButton = `
        <a href="${companyUrl}" target="_blank" rel="noopener noreferrer" class="action-link no-print">
          <span class="action-icon">🔗</span>
          <span class="action-text">${visitWebsiteText}</span>
        </a>
      `;
    }

    const template = `
      <style>
        :host {
          display: block;
          margin-bottom: 1.5rem;
        }

        .work-entry {
          position: relative;
        }

        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.25rem;
        }

        .entry-title {
          flex: 1;
        }

        .period {
          font-size: 0.9rem;
          color: var(--text-tertiary, #666);
          white-space: nowrap;
          margin-left: auto;
        }

        .company {
          font-weight: 600;
          font-size: 1rem;
          margin: 0;
          color: var(--text-primary, #000);
        }

        .location-role {
          display: flex;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-tertiary, #666);
          margin: 0.25rem 0;
        }

        .location {
          color: var(--text-secondary, #555);
        }

        .role {
          color: var(--text-primary, #333);
        }

        .type-badge {
          display: inline-block;
          padding: 0.125rem 0.5rem;
          background: var(--bg-sidebar, #f0f0f0);
          border-radius: 3px;
          font-size: 0.8rem;
          margin-left: 0.5rem;
        }

        .description {
          margin: 0.5rem 0;
        }

        .description-list {
          margin: 0.25rem 0 0 0;
          padding-left: 1.25rem;
          list-style-type: disc;
        }

        .description-list li {
          margin: 0.125rem 0;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .technologies {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-tertiary, #666);
        }

        .action-links {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .action-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          text-decoration: none;
          color: var(--text-tertiary, #666);
          font-size: 0.85rem;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          transition: all 0.2s ease;
          border: 1px solid var(--border-color, #ddd);
          background: var(--bg-sidebar, #fafafa);
        }

        .action-link:hover {
          background: var(--bg-primary, #f0f0f0);
          color: var(--text-primary, #333);
          border-color: var(--text-tertiary, #bbb);
        }

        .action-icon {
          font-size: 1rem;
          line-height: 1;
        }

        .action-text {
          line-height: 1;
        }
      </style>

      <div class="work-entry">
        <div class="entry-header">
          <div class="entry-title">
            <h3 class="company">${company}</h3>
          </div>
          <span class="period">${period}</span>
        </div>
        ${
          location || role
            ? `
          <div class="location-role">
            ${location ? `<span class="location">${location}</span>` : ""}
            ${role ? `<span class="role">${role}${type ? `<span class="type-badge">${type}</span>` : ""}</span>` : ""}
          </div>
        `
            : ""
        }
        ${
          descriptionList.length > 0
            ? `
          <div class="description">
            <ul class="description-list">
              ${descriptionList.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        `
            : ""
        }
        ${
          techList.length > 0
            ? `
          <div class="technologies">
            <strong>Technologies:</strong> ${techList.join(", ")}
          </div>
        `
            : ""
        }
        ${
          certificateButton || websiteButton
            ? `
          <div class="action-links">
            ${websiteButton}
            ${certificateButton}
          </div>
        `
            : ""
        }
      </div>
    `;

    this.shadowRoot.innerHTML = template;
  }
}

customElements.define("cv-work-entry", CvWorkEntry);
