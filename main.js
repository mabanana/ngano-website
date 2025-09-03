import { businessData, businessDataFr } from "./data.js";

let currentLang = "en";

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setupCopyButton(buttonId, valueId) {
  const btn = document.getElementById(buttonId);
  const val = document.getElementById(valueId);
  if (btn && val) {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(val.textContent).then(() => {
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = "Copy";
        }, 1200);
      });
    });
  }
}

function renderContent(data, lang) {
  const servicesList = document.getElementById("services-list");
  if (servicesList) {
    servicesList.innerHTML = "";
    data.servicesList.forEach((service) => {
      servicesList.insertAdjacentHTML("beforeend", serviceCardHtml);
      const currentCard = servicesList.lastElementChild;
      const title = currentCard.querySelector("#service-title");
      const description = currentCard.querySelector("#service-description");
      if (title && description) {
        title.textContent = service.title;
        description.textContent = service.description;
      }
    });
  }
  setText("page-title", data.siteTitle);
  setText("business-name", data.businessName);
  setText("tagline", data.tagline);
  setText("about-title", data.aboutTitle || "About Us");
  setText("about-text", data.aboutText);
  setText("contact-address", data.contactInfo.address);
  setText("contact-phone", data.contactInfo.phone);
  setText("contact-email", data.contactInfo.email);
  setText("business-name-footer", data.businessName);
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = lang === "en" ? "Français" : "English";
  document
    .getElementById("contact-email")
    .setAttribute("href", "mailto:" + data.contactInfo.email);
  document
    .getElementById("contact-phone")
    .setAttribute("href", "tel:" + data.contactInfo.phone);
  document
    .getElementById("contact-address")
    .setAttribute(
      "href",
      "https://www.google.com/maps?q=" +
        encodeURIComponent(data.contactInfo.address)
    );
}

document.addEventListener("DOMContentLoaded", () => {
  renderContent(businessData, "en");
  setupCopyButton("copy-address", "contact-address");
  setupCopyButton("copy-phone", "contact-phone");
  setupCopyButton("copy-email", "contact-email");
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "fr" : "en";
      renderContent(
        currentLang === "en" ? businessData : businessDataFr,
        currentLang
      );
    });
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function toggleLanguage() {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === "en" ? "fr" : "en";
  document.documentElement.lang = newLang;
  // Update text content based on the new language
  if (newLang === "fr") {
    setText("lang-toggle", "English");
    setText("page-title", businessData.siteTitleFr);
    setText("business-name", businessData.businessNameFr);
    setText("tagline", businessData.taglineFr);
    setText("about-title", businessData.aboutTitleFr);
    setText("about-text", businessData.aboutTextFr);
    setText("business-name-footer", businessData.businessNameFr);
  } else {
    setText("lang-toggle", "Français");
    setText("page-title", businessData.siteTitle);
    setText("business-name", businessData.businessName);
    setText("tagline", businessData.tagline);
    setText("about-title", businessData.aboutTitle);
    setText("about-text", businessData.aboutText);
    setText("business-name-footer", businessData.businessName);
  }
}

document
  .getElementById("lang-toggle")
  .addEventListener("click", toggleLanguage);

const serviceCardHtml = `
<div class="card glass services-hover flex flex-col border border-gray-200 shadow-xl rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
  <div>
    <h3 id="service-title" class="card-title text-gray-800 dark:text-white mb-2">
      Card title
    </h3>
    <p id="service-description" class="card-desc text-gray-500 dark:text-neutral-400">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
  </div>
</div>
`;
