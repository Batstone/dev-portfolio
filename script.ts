const mobileButton = document.querySelector<HTMLElement>("#mobile-btn")!;
const nav = document.querySelector<HTMLElement>("#mobile-nav")!;
const screenReaderText = mobileButton.querySelector<HTMLElement>(".sr-only")!;
const firstLink = nav.querySelector<HTMLElement>("ul li:first-child a")!;
const lastLink = nav.querySelector<HTMLElement>("ul li:last-child a")!;

mobileButton.addEventListener("click", (e) => {
  e.preventDefault();
  mobileButton.classList.toggle("active");
  nav.classList.toggle("active");

  const isExpanded = nav.classList.contains("active");

  mobileButton.setAttribute("aria-expanded", isExpanded.toString());

  screenReaderText.textContent = isExpanded ? "Close mobile navigation" : "Expand mobile navigation";
  console.log("hereee");
  //   if (isExpanded) {
  //     firstLink.focus();
  //   }
});
