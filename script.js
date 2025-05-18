document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }
  // Close mobile menu when clicking a nav link
  const navItems = document.querySelectorAll(".nav-links li a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
  // Hero Image Slider
  const slideContainer = document.querySelector(".hero-slide-container");
  const slides = document.querySelectorAll(".hero-slide");
  const numberOfSlides = slides.length;
  let currentIndex = 0;
  const slideInterval = 5000;
  let isSliding = true;

  function nextSlide() {
    if (!isSliding) return;
    currentIndex = (currentIndex + 1) % numberOfSlides;
    updateSlidePosition();
  }
  function updateSlidePosition() {
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  if (slideContainer && numberOfSlides > 0) {
    // Start the automatic slider
    setInterval(nextSlide, slideInterval);
    // Optional: Pause sliding on hover
    if (slides.length > 1) {
      slideContainer.addEventListener("mouseenter", () => {
        isSliding = false;
      });
      slideContainer.addEventListener("mouseleave", () => {
        isSliding = true;
      });
    }
  }
  // Fleet Category Tabs Logic
  const tabBtns = document.querySelectorAll(".category-tabs .tab-btn");
  const fleetContainers = document.querySelectorAll(".fleet-container");
  const travellersBtn = document.querySelector(
    '.category-tabs button[data-category="travellers"]'
  );
  const carsBtn = document.querySelector(
    '.category-tabs button[data-category="cars"]'
  );
  const travellersContainer = document.querySelector(
    ".fleet-container.travellers"
  );
  const carsContainer = document.querySelector(".fleet-container.cars");

  if (travellersBtn && carsBtn && travellersContainer && carsContainer) {
    travellersBtn.classList.add("active");
    travellersContainer.classList.remove("hidden");
    carsBtn.classList.remove("active");
    carsContainer.classList.add("hidden");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const category = this.getAttribute("data-category");

        tabBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        fleetContainers.forEach((container) => {
          container.classList.add("hidden");
        });
        const targetContainer = document.querySelector(
          `.fleet-container.${category}`
        );
        if (targetContainer) {
          targetContainer.classList.remove("hidden");
        }
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const toggle = item.querySelector(".faq-toggle");

      question.addEventListener("click", function () {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            otherItem.querySelector(".faq-answer").style.maxHeight = null;
            otherItem.querySelector(".faq-toggle i").className = "fas fa-plus";
          }
        });
        item.classList.toggle("active");

        if (item.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          toggle.querySelector("i").className = "fas fa-minus";
        } else {
          answer.style.maxHeight = null;
          toggle.querySelector("i").className = "fas fa-plus";
        }
      });
    });
  }

  // Enquiry Form Validation and Submission
  const enquiryForm = document.getElementById("enquiry-form");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      const formInputs = enquiryForm.querySelectorAll(
        "input, select, textarea"
      );
      formInputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          isValid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
        if (input.type === "email" && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            isValid = false;
            input.classList.add("error");
          }
        }
      });

      if (isValid) {
        const successMessage = document.createElement("div");
        successMessage.className = "form-success";
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Thank you for your enquiry! We will contact you shortly.';

        enquiryForm.parentNode.appendChild(successMessage);
        enquiryForm.reset();
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
  // Scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add animation on scroll
  const animateElements = document.querySelectorAll(
    ".section-header, .vehicle-card, .service-card, .about-content, .testimonial-card, .faq-item"
  );
  function checkInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add("animate");
      }
    });
  }
  checkInView();
  window.addEventListener("scroll", checkInView);
});

document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const loadMoreText = document.querySelector(".load-more-text");
  const loadingSpinner = document.querySelector(".loading-spinner");

  loadMoreBtn.addEventListener("click", function () {
    loadMoreText.style.display = "none";
    loadingSpinner.style.display = "inline-block";
    setTimeout(() => {
      document.querySelectorAll(".gallery-item.hidden").forEach((item) => {
        item.classList.remove("hidden");
        item.classList.add("show");
      });
      this.style.display = "none";
      loadMoreText.style.display = "inline-block";
      loadingSpinner.style.display = "none";
    }, 1000);
  });

  if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll(".gallery-item img").forEach((img) => {
      imgObserver.observe(img);
    });
  }
});
