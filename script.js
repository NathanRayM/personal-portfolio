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

// Section Animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".scroll-animate").forEach((el) => {
  observer.observe(el);
});

// Client Side Form Data
const contactForm = document.querySelector(".contact__form");
const contactStatus = document.querySelector(".contact__status");
const submitButton = document.querySelector(".submit__button");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);

  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  submitButton.disabled = true;
  submitButton.classList.add("disabled");
  submitButton.innerText = "Submitting";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      contactStatus.textContent = result.message;
      contactStatus.style.color = "var(--node)";
      submitButton.innerText = "SUBMIT";
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
    } else {
      contactStatus.textContent = result.message;
      contactStatus.style.color = "red";
      submitButton.innerText = "OOPS!";
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
    }
    contactForm.reset();
  } catch (error) {
    console.error(error);
  }
});
