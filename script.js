"use strict";
const mobileButtonOpen = document.querySelector("#mobile-btn-open");
const nav = document.querySelector("#mobile-nav");
const screenReaderText = mobileButtonOpen.querySelector(".sr-only");
const firstLink = nav.querySelector("ul li:first-child a");
const lastLink = nav.querySelector("ul li:last-child a");
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
