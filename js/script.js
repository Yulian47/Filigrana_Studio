// Filigrana Studio - Main JavaScript File

document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  // Try to keep portrait orientation on supported mobile browsers
  initMobileOrientationLock();

  // Initialize product side panels
  initProductAsides();

  // Initialize smooth scrolling for navigation links
  initSmoothScroll();

  // Initialize contact form
  initContactForm();

  // Initialize mobile menu toggle (if needed)
  initMobileMenu();

  console.log("Filigrana Studio initialized");
}

function initProductAsides() {
  const panels = [
    {
      triggerId: "manikyrCourseBasicCard",
      asideId: "manikyrCourseBasicAside",
      closeSelector: "[data-manikyr-course-basic-close]",
    },
    {
      triggerId: "manikyrCourseAdvancedCard",
      asideId: "manikyrCourseAdvancedAside",
      closeSelector: "[data-manikyr-course-advanced-close]",
    },
    {
      triggerId: "pedikyrCourseBasicCard",
      asideId: "pedikyrCourseBasicAside",
      closeSelector: "[data-pedikyr-course-basic-close]",
    },
    {
      triggerId: "manikyrCard",
      asideId: "manikyrAside",
      closeSelector: "[data-manikyr-aside-close]",
    },
    {
      triggerId: "pedikyrCard",
      asideId: "pedikyrAside",
      closeSelector: "[data-pedikyr-aside-close]",
    },
    {
      triggerId: "elektrolyseCard",
      asideId: "elektrolyseAside",
      closeSelector: "[data-elektrolyse-aside-close]",
    },
  ];

  const closeAllAsides = function () {
    panels.forEach(function (panelConfig) {
      const aside = document.getElementById(panelConfig.asideId);
      if (!aside) return;
      aside.classList.remove("is-open");
      aside.setAttribute("aria-hidden", "true");
    });
    document.body.classList.remove("aside-open");
  };

  panels.forEach(function (panelConfig) {
    const trigger = document.getElementById(panelConfig.triggerId);
    const aside = document.getElementById(panelConfig.asideId);
    if (!trigger || !aside) return;

    const closeButtons = aside.querySelectorAll(panelConfig.closeSelector);

    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      closeAllAsides();
      aside.classList.add("is-open");
      aside.setAttribute("aria-hidden", "false");
      document.body.classList.add("aside-open");
    });

    closeButtons.forEach(function (button) {
      button.addEventListener("click", closeAllAsides);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllAsides();
    }
  });
}

function initMobileOrientationLock() {
  const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobileViewport || !screen.orientation?.lock) return;

  const lockToPortrait = function () {
    screen.orientation.lock("portrait").catch(function () {
      // Some browsers allow orientation lock only in fullscreen/PWA context.
    });
  };

  lockToPortrait();
  window.addEventListener("orientationchange", lockToPortrait);
}

// Smooth Scrolling
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Offset for sticky navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const fields = {
      name: contactForm.querySelector('input[name="name"]'),
      email: contactForm.querySelector('input[name="email"]'),
      message: contactForm.querySelector('textarea[name="message"]'),
    };
    const errors = {
      name: document.getElementById("nameError"),
      email: document.getElementById("emailError"),
      message: document.getElementById("messageError"),
    };
    const formStatus = document.getElementById("formStatus");
    const blockedNameValues = new Set([
      "test",
      "tester",
      "asdf",
      "qwerty",
      "name",
    ]);
    const blockedEmailDomains = new Set([
      "example.com",
      "test.com",
      "mailinator.com",
      "tempmail.com",
      "fakeinbox.com",
    ]);

    const validateField = function (fieldName) {
      const field = fields[fieldName];
      if (!field) return true;

      const value = field.value.trim();
      let errorMessage = "";

      if (fieldName === "name") {
        errorMessage = validateName(value, blockedNameValues);
      }

      if (fieldName === "email") {
        errorMessage = validateEmail(value, blockedEmailDomains);
      }

      if (fieldName === "message") {
        errorMessage = validateMessage(value);
      }

      setFieldState(field, errors[fieldName], errorMessage);
      return !errorMessage;
    };

    Object.entries(fields).forEach(function ([fieldName, field]) {
      field.addEventListener("input", function () {
        validateField(fieldName);
        clearFormStatus(formStatus);
      });

      field.addEventListener("blur", function () {
        validateField(fieldName);
      });
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const isFormValid = Object.keys(fields)
        .map(function (fieldName) {
          return validateField(fieldName);
        })
        .every(Boolean);

      if (!isFormValid) {
        setFormStatus(
          formStatus,
          "error",
          "Sjekk feltene og rett opp feilene før du sender meldingen.",
        );
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sender...";
      clearFormStatus(formStatus);

      fetch(this.action, {
        method: "POST",
        body: new FormData(this),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            setFormStatus(
              formStatus,
              "success",
              "Takk for din melding! Vi tar kontakt med deg snart.",
            );
            contactForm.reset();
            Object.entries(fields).forEach(function ([fieldName, field]) {
              setFieldState(field, errors[fieldName], "");
            });
          } else {
            setFormStatus(
              formStatus,
              "error",
              "Noe gikk galt. Vennligst prøv igjen.",
            );
          }
        })
        .catch(function () {
          setFormStatus(
            formStatus,
            "error",
            "Noe gikk galt. Vennligst prøv igjen.",
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send";
        });
    });
  }
}

// Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(value, blockedNameValues) {
  if (!value) {
    return "Navn er obligatorisk.";
  }

  if (value.length < 2) {
    return "Navnet må være minst 2 tegn langt.";
  }

  if (/\d/.test(value)) {
    return "Navnet kan ikke inneholde tall.";
  }

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿĀ-žА-Яа-яЁёЇїІіЄєҐґ' -]+$/.test(value)) {
    return "Bruk kun bokstaver, mellomrom, apostrof eller bindestrek i navnet.";
  }

  if (blockedNameValues.has(value.toLowerCase())) {
    return "Skriv inn navnet ditt i stedet for en testverdi.";
  }

  if (/^(.)\1{2,}$/.test(value.replace(/\s+/g, ""))) {
    return "Navnet ser ikke gyldig ut.";
  }

  return "";
}

function validateEmail(value, blockedEmailDomains) {
  if (!value) {
    return "E-post er obligatorisk.";
  }

  if (!isValidEmail(value)) {
    return "Skriv inn en gyldig e-postadresse.";
  }

  const domain = value.split("@")[1]?.toLowerCase();
  if (domain && blockedEmailDomains.has(domain)) {
    return "Bruk en ekte e-postadresse, ikke en test- eller midlertidig adresse.";
  }

  return "";
}

function validateMessage(value) {
  if (!value) {
    return "Melding er obligatorisk.";
  }

  if (value.length < 10) {
    return "Meldingen må være minst 10 tegn lang.";
  }

  if (/^(.)\1{9,}$/.test(value.replace(/\s+/g, ""))) {
    return "Meldingen ser ikke gyldig ut.";
  }

  if (/(https?:\/\/|www\.)/i.test(value)) {
    return "Lenker er ikke tillatt i meldingsfeltet.";
  }

  return "";
}

function setFieldState(field, errorElement, message) {
  const hasError = Boolean(message);
  field.classList.toggle("is-invalid", hasError);
  field.setAttribute("aria-invalid", String(hasError));

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function setFormStatus(element, type, message) {
  if (!element) return;

  element.className = "form-status";
  if (type) {
    element.classList.add(`form-status--${type}`);
  }
  element.textContent = message;
}

function clearFormStatus(element) {
  setFormStatus(element, "", "");
}

// Mobile Menu Toggle (for future mobile menu implementation)
function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Закрити меню" : "Відкрити меню",
    );
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      if (!window.matchMedia("(max-width: 768px)").matches) return;
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Відкрити меню");
    });
  });
}

// Intersection Observer for animations on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
  });
}

// Initialize scroll animations when content is loaded
window.addEventListener("load", function () {
  initScrollAnimations();
});

// Add some interactive features
document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Utility function to add events to multiple elements
function addEventListenerToAll(selector, event, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.addEventListener(event, callback);
  });
}

// Add hover effects to service cards and portfolio items
addEventListenerToAll(".service-card", "mouseenter", function () {
  this.style.transform = "translateY(-10px)";
});

addEventListenerToAll(".service-card", "mouseleave", function () {
  this.style.transform = "translateY(0)";
});

addEventListenerToAll(".portfolio-item", "mouseenter", function () {
  this.style.transform = "scale(1.05)";
});

addEventListenerToAll(".portfolio-item", "mouseleave", function () {
  this.style.transform = "scale(1)";
});
