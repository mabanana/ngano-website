import { businessData } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
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

  const servicesList = document.getElementById("services-list");
  if (servicesList) {
    servicesList.innerHTML = "";
    businessData.servicesList.forEach((service) => {
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
  console.log("setting text content");
  setText("page-title", businessData.siteTitle);
  setText("business-name", businessData.businessName);
  setText("tagline", businessData.tagline);
  setText("about-text", businessData.aboutText);
  setText("contact-address", businessData.contactInfo.address);
  setText("contact-phone", businessData.contactInfo.phone);
  setText("contact-email", businessData.contactInfo.email);
  setText("business-name-footer", businessData.businessName);
  setupCopyButton("copy-address", "contact-address");
  setupCopyButton("copy-phone", "contact-phone");
  setupCopyButton("copy-email", "contact-email");
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

const serviceCardHtml = `
<div class="services-hover flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 py-4">
  <div class="p-4 md:p-5">
    <h3 id="service-title" class="text-lg font-bold text-gray-800 dark:text-white">
      Card title
    </h3>
    <p id="service-description" class="mt-1 text-gray-500 dark:text-neutral-400">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
  </div>
</div>
`;
