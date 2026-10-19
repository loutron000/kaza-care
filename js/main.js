const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const loggedOutNavbars = document.querySelectorAll(".navbar-logged-out");
const loggedInNavbars = document.querySelectorAll(".navbar-logged-in");

if (loggedOutNavbars.length > 0 && loggedInNavbars.length > 0) {
  loggedOutNavbars.forEach((navbar) => {
    navbar.classList.toggle("hidden", isLoggedIn);
  });

  loggedInNavbars.forEach((navbar) => {
    navbar.classList.toggle("hidden", !isLoggedIn);
  });
}



const navbarToggles = document.querySelectorAll(".navbar-toggle");

navbarToggles.forEach((navbarToggle) => {
  const navbar = navbarToggle.closest(".navbar");
  const navbarMenu = navbar?.querySelector(".navbar-menu");

  if (!navbarMenu) return;

  navbarToggle.addEventListener("click", () => {
    const isOpen = navbarMenu.classList.toggle("is-open");

    navbarToggle.setAttribute("aria-expanded", isOpen);
    navbarToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
});