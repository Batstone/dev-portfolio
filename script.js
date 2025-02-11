"use strict";
const mobileButtonOpen = document.querySelector("#mobile-btn-open");
const nav = document.querySelector("#mobile-nav");
const screenReaderText = mobileButtonOpen.querySelector(".sr-only");
const firstLink = nav.querySelector("ul li:first-child a");
const lastLink = nav.querySelector("ul li:last-child a");
const themeSwitch = document.querySelector("#theme-switch");
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }
    else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
});
themeSwitch.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
    else {
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
});
