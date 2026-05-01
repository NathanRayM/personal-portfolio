// Mobile Navigation
const mobileNavBtn = document.querySelector(".mobile__nav--toggle");
const mobileNav = document.querySelector(".mobile-nav");

mobileNavBtn.addEventListener("click", () => {
  const isExpanded = mobileNavBtn.getAttribute("aria-expanded") === "true";
  mobileNav.classList.toggle("hidden");
  mobileNavBtn.setAttribute("aria-expanded", !isExpanded);
});
