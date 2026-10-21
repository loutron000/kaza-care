const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const loggedOutNavbars = document.querySelectorAll(".navbar-logged-out");
const loggedInNavbars = document.querySelectorAll(".navbar-logged-in");

loggedOutNavbars.forEach((navbar) => {
  navbar.classList.toggle("hidden", isLoggedIn);
});

loggedInNavbars.forEach((navbar) => {
  navbar.classList.toggle("hidden", !isLoggedIn);
});


const navbarToggles = document.querySelectorAll(".navbar-toggle");

navbarToggles.forEach((navbarToggle) => {
  const navbar = navbarToggle.closest(".navbar");
  const navbarMenu = navbar?.querySelector(".navbar-menu");

  if (!navbarMenu) return;

  navbarToggle.addEventListener("click", () => {
    const isOpen = navbarMenu.classList.toggle("is-open");

    navbarToggle.setAttribute("aria-expanded", String(isOpen));
    navbarToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
});


const sidebar = document.querySelector("#app-sidebar");
const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
const sidebarOverlay = document.querySelector("[data-sidebar-overlay]");

function closeSidebar() {
  if (!sidebar || !sidebarToggle || !sidebarOverlay) return;

  sidebar.classList.remove("is-open");
  sidebarOverlay.classList.remove("is-visible");
  sidebarOverlay.classList.add("hidden");

  sidebarToggle.setAttribute("aria-expanded", "false");
  sidebarToggle.setAttribute("aria-label", "Open sidebar");
}

if (sidebar && sidebarToggle && sidebarOverlay) {
  sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");

    sidebarOverlay.classList.toggle("is-visible", isOpen);
    sidebarOverlay.classList.toggle("hidden", !isOpen);

    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    sidebarToggle.setAttribute(
      "aria-label",
      isOpen ? "Close sidebar" : "Open sidebar"
    );
  });

  sidebarOverlay.addEventListener("click", closeSidebar);

  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });
}


const profileMenuToggle = document.querySelector("#profile-menu-toggle");
const profileMenu = document.querySelector("#profile-menu");

function closeProfileMenu(returnFocus = false) {
  if (!profileMenuToggle || !profileMenu) return;

  profileMenu.classList.add("hidden");
  profileMenuToggle.setAttribute("aria-expanded", "false");

  if (returnFocus) {
    profileMenuToggle.focus();
  }
}

if (profileMenuToggle && profileMenu) {
  profileMenuToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = profileMenu.classList.contains("hidden");

    profileMenu.classList.toggle("hidden", !isOpen);
    profileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  profileMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    closeProfileMenu();
  });
}


const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");

const savedTheme = localStorage.getItem("kazaTheme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";

document.documentElement.dataset.theme = initialTheme;

function updateThemeLabel() {
  if (!themeLabel) return;

  themeLabel.textContent =
    document.documentElement.dataset.theme === "dark"
      ? "Light theme"
      : "Dark theme";
}

updateThemeLabel();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("kazaTheme", nextTheme);

    updateThemeLabel();
  });
}


const languageToggles = document.querySelectorAll(
  "[data-language-toggle], .language-toggle"
);

const languageLabels = document.querySelectorAll("[data-language-label]");

let currentLanguage =
  localStorage.getItem("kazaLanguage") === "ha" ? "ha" : "en";

function updateLanguageLabels() {
  languageLabels.forEach((label) => {
    label.textContent = currentLanguage === "ha" ? "Hausa" : "English";
  });

  languageToggles.forEach((toggle) => {
    toggle.setAttribute(
      "aria-label",
      currentLanguage === "ha"
        ? "Change language to English"
        : "Change language to Hausa"
    );
  });
}

document.documentElement.lang = currentLanguage;
updateLanguageLabels();

languageToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ha" : "en";

    localStorage.setItem("kazaLanguage", currentLanguage);
    document.documentElement.lang = currentLanguage;

    updateLanguageLabels();
  });
});


const logoutButtons = document.querySelectorAll("[data-logout]");

logoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  });
});


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSidebar();
    closeProfileMenu(true);

    document.querySelectorAll(".navbar-menu.is-open").forEach((menu) => {
      menu.classList.remove("is-open");
    });

    navbarToggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    });
  }
});