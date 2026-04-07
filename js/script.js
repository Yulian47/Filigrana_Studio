// Filigrana Studio - Main JavaScript File

document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  // Initialize smooth scrolling for navigation links
  initSmoothScroll();

  // Initialize contact form
  initContactForm();

  // Initialize mobile menu toggle (if needed)
  initMobileMenu();

  console.log("Filigrana Studio initialized");
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
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector("textarea").value;

      // Simple validation
      if (!name.trim() || !email.trim() || !message.trim()) {
        alert("Будь ласка, заповніть всі поля");
        return;
      }

      // Email validation
      if (!isValidEmail(email)) {
        alert("Будь ласка, введіть коректну електронну пошту");
        return;
      }

      // Here you would typically send the form data to a server
      console.log("Form Data:", {
        name: name,
        email: email,
        message: message,
      });

      // Success message
      alert(
        "Дякуємо за ваше повідомлення! Ми зв'яжемося з вами найближчим часом.",
      );

      // Reset form
      this.reset();
    });
  }
}

// Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
