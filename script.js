// Mobile Navigation
const mobileNavBtn = document.querySelector(".mobile__nav--toggle");
const mobileNav = document.querySelector(".mobile-nav");

mobileNavBtn.addEventListener("click", () => {
  const isExpanded = mobileNavBtn.getAttribute("aria-expanded") === "true";
  mobileNav.classList.toggle("hidden");

  if (mobileNav.classList.contains("hidden")) {
    mobileNavBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  } else {
    mobileNavBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
  }

  mobileNavBtn.setAttribute("aria-expanded", !isExpanded);
});
