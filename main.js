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
  // Navigation
  setText("nav-home", data.navHome);
  setText("nav-about-us", data.navAboutUs);
  setText("nav-services", data.navServices);
  setText("nav-contact-us", data.navContactUs);
  // Section titles
  setText("services-title", data.servicesTitle);
  setText(
    "why-choose-us-title",
    data.whyChooseUsTitle ||
      (lang === "fr" ? "Pourquoi nous choisir ?" : "Why Choose Us?")
  );
  setText("contact-title", data.contactTitle);
  // Owner profile
  setText("owner-name", data.ownerName);
  setText("owner-title", data.ownerTitle);
  const ownerBioEl = document.getElementById("owner-bio");
  if (ownerBioEl && Array.isArray(data.ownerBio)) {
    ownerBioEl.innerHTML = data.ownerBio
      .map(
        (item) =>
          `<p style="text-align:left;padding:0 1em;margin-bottom:1.5em;">${item}</p>`
      )
      .join("");
  } else {
    setText("owner-bio", data.ownerBio);
  }
  // Contact section
  setText("contact-find-us", data.contactFindUs);
  setText("contact-address", data.contactAddress);
  setText("contact-email-title", data.contactEmailTitle);
  setText("contact-email", data.contactEmail);
  setText("contact-phone-title", data.contactPhoneTitle);
  setText("contact-phone", data.contactPhone);
  // Footer
  setText("footer-about-link", data.footerAbout);
  setText("footer-services-link", data.footerServices);
  setText("footer-back-to-top", data.footerBackToTop);
  // Render Why Choose Us under Our Services
  const whyChooseUsSection = document.getElementById("why-choose-us-section");
  let whyChooseHtml = "";
  const isFr = lang === "fr";
  const points =
    data.whyChooseUs ||
    (data.whyChooseUsPoints
      ? data.whyChooseUsPoints.map((p) =>
          p.title
            ? {
                title: p.title,
                description: p.description,
                svg: p.svg || "",
              }
            : { title: "", description: p, svg: "" }
        )
      : []);
  if (points.length) {
    whyChooseHtml = `<div class='py-6'>
      <ul class='why-choose-list' style='display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;padding:0;margin:0;'>
        ${points
          .map(
            (point) => `
          <li class='why-choose-card' style='background:#fff;border-radius:1rem;box-shadow:0 2px 8px rgba(0,0,0,0.08);padding:2rem;min-width:320px;max-width:540px;flex:1 1 220px;transition:transform 0.3s;list-style:none;cursor:pointer;display:flex;align-items:center;gap:1.2em;'>
            <span style='display:flex;align-items:center;justify-content:center;min-width:40px;'>
              ${
                point.svg
                  ? point.svg.replace(
                      /<svg([^>]*)>/,
                      `<svg$1 style="vertical-align:middle;color:#22c55e;">`
                    )
                  : ""
              }
            </span>
            <div style="flex:1;height:100%;">
              ${
                point.title
                  ? `<h4 class="card-title text-black" style="margin-bottom:0.5em;">${point.title}:</h4>`
                  : ""
              }
              <span class="card-desc text-gray-500 dark:text-neutral-400">${
                point.description
              }</span>
            </div>
          </li>`
          )
          .join("")}
      </ul>
    </div>`;
  }

  // Render Our Services section as a horizontally scrollable row of uniform cards
  const servicesList = document.getElementById("services-list");
  let servicesHtml = "";
  if (data.servicesList && data.servicesList.length) {
    servicesHtml = `<div class='py-6' style='height:100%;'>
      <div class='services-scroll' style='overflow-x:hidden;white-space:nowrap;padding-bottom:2em;height:100%;padding-left:2rem;padding-right:2rem;padding-top:2rem;'>
      <ul class='services-list' style='display:inline-flex;gap:2rem;padding:0;margin:0;height:100%;'>
      ${data.servicesList
        .map(
          (service) => `
      <li class='service-card' style='background:#fff;border-radius:1rem;box-shadow:0 2px 8px rgba(0,0,0,0.08);padding:2rem;min-width:430px;max-width:540px;flex:1 1 220px;transition:transform 0.3s;list-style:none;cursor:pointer;'>
        <h4 class="card-title text-black" style="margin-bottom:0.5em;overflow-wrap:break-word;word-break:break-word;white-space:normal;" id="service-title">${service.title}</h4>
        <p class="card-desc text-gray-500 dark:text-neutral-400" style="overflow-wrap:break-word;word-break:break-word;white-space:normal;" id="service-description">${service.description}</p>
      </li>`
        )
        .join("")}
      </ul>
      </div>
    </div>`;
  }

  // Make horizontal scroll on vertical wheel
  setTimeout(() => {
    const scrollEl = document.querySelector(".services-scroll");
    if (scrollEl) {
      scrollEl.addEventListener(
        "wheel",
        function (e) {
          if (e.deltaY !== 0) {
            e.preventDefault();
            scrollEl.scrollLeft += e.deltaY;
          }
        },
        { passive: false }
      );
    }
  }, 0);

  if (whyChooseUsSection) {
    whyChooseUsSection.innerHTML = whyChooseHtml;
    // Add hover effect to cards
    document.querySelectorAll(".why-choose-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.07)";
        card.style.zIndex = 2;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
        card.style.zIndex = 1;
      });
    });
  }
  if (servicesList) {
    servicesList.innerHTML = servicesHtml;
    // Add hover effect to service cards
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.07)";
        card.style.zIndex = 2;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
        card.style.zIndex = 1;
      });
    });
  }

  setText("page-title", data.siteTitle);
  setText("business-name", data.businessName);
  setText("tagline", data.tagline);
  setText("about-title", data.aboutTitle || "About Us");
  const aboutTextEl = document.getElementById("about-text");
  if (aboutTextEl && Array.isArray(data.aboutText)) {
    aboutTextEl.innerHTML = data.aboutText
      .map((item) => `<p>${item}</p><br/>`)
      .join("");
  }
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
  const data = newLang === "fr" ? businessDataFr : businessData;
  renderContent(data, newLang);
}

document
  .getElementById("lang-toggle")
  .addEventListener("click", toggleLanguage);
