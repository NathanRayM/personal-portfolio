// Mobile Navigation
const mobileNavBtn = document.querySelector(".mobile__nav--toggle");
const mobileNav = document.querySelector(".mobile-nav");

mobileNavBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});
