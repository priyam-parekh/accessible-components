document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(
    ".right-section a, .sticky-nav-links a"
  );
  const stickyNav = document.querySelector(".sticky-nav");
  const homeSection = document.querySelector("#home");
  let lastScrollPosition = window.pageYOffset;
  let isMouseNearTop = false;

  function handleStickyNav() {
    const currentScrollPosition = window.pageYOffset;
    const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
    const scrollingDown = currentScrollPosition > lastScrollPosition;

    if (currentScrollPosition >= homeSectionBottom) {
      if (isMouseNearTop || !scrollingDown) {
        stickyNav.classList.add("visible");
      } else {
        stickyNav.classList.remove("visible");
      }
    } else {
      stickyNav.classList.remove("visible");
    }

    lastScrollPosition = currentScrollPosition;
  }

  document.addEventListener("mousemove", (e) => {
    isMouseNearTop = e.clientY <= 100;
    handleStickyNav();
  });

  window.addEventListener("scroll", handleStickyNav);

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const modalOverlay = document.querySelector(".modal-overlay");
  const modalImage = modalOverlay.querySelector("img");
  const modalClose = modalOverlay.querySelector(".modal-close");
  const interfaceImages = document.querySelectorAll(".interface-img");

  interfaceImages.forEach((img) => {
    img.addEventListener("click", () => {
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalOverlay.classList.add("active");
    });
  });

  modalClose.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      modalOverlay.classList.remove("active");
    }
  });

  function updateActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    const inputAnalysis = document.querySelector("#input-analysis");
    if (inputAnalysis) {
      const inputAnalysisPosition =
        inputAnalysis.getBoundingClientRect().top + window.scrollY;
      const nextSection = document.querySelector("#output-analysis");
      const nextSectionPosition = nextSection
        ? nextSection.getBoundingClientRect().top + window.scrollY
        : Infinity;

      if (
        scrollPosition >= inputAnalysisPosition &&
        scrollPosition < nextSectionPosition
      ) {
        updateActiveLinks("input-analysis");
        return;
      }
    }

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        updateActiveLinks(section.id);
      }
    });
  }

  function updateActiveLinks(sectionId) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveSection);
  updateActiveSection();
});
