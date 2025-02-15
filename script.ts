const mobileButtonOpen = document.querySelector<HTMLElement>("#mobile-btn-open")!;
const nav = document.querySelector<HTMLElement>("#mobile-nav")!;
const screenReaderText = mobileButtonOpen.querySelector<HTMLElement>(".sr-only")!;
const firstLink = nav.querySelector<HTMLElement>("ul li:first-child a")!;
const lastLink = nav.querySelector<HTMLElement>("ul li:last-child a")!;
const themeSwitch = document.querySelector<HTMLElement>("#theme-switch")!;

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }
});

themeSwitch.addEventListener("click", function () {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

mobileButtonOpen.addEventListener("click", (e) => {
  e.preventDefault();
  mobileButtonOpen.classList.toggle("active");
  nav.classList.toggle("active");

  const isExpanded = nav.classList.contains("active");

  mobileButtonOpen.setAttribute("aria-expanded", isExpanded.toString());

  screenReaderText.textContent = isExpanded ? "Close mobile navigation" : "Expand mobile navigation";

  if (isExpanded) {
    firstLink.focus();
  }
});

document.addEventListener("keydown", function (e) {
  const isExpanded = nav.classList.contains("active");
  const tabCheck = e.key === "Tab";
  const escCheck = e.key === "Escape";

  if (tabCheck) {
    if (document.activeElement === lastLink && isExpanded && !e.shiftKey) {
      e.preventDefault();
      mobileButtonOpen.focus();
    }

    if (document.activeElement === mobileButtonOpen && isExpanded && e.shiftKey) {
      e.preventDefault();
      lastLink.focus();
    }

    if (document.activeElement === firstLink && isExpanded && e.shiftKey) {
      e.preventDefault();
      mobileButtonOpen.focus();
    }
  }

  if (escCheck && isExpanded) {
    mobileButtonOpen.click();
    mobileButtonOpen.focus();
  }
});
