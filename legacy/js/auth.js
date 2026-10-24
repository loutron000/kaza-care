document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const heading = document.getElementById("auth-heading");
  const intro = document.getElementById("auth-intro");

  const tabs = document.querySelectorAll("[data-auth-tab]");
  const panels = document.querySelectorAll("[data-auth-panel]");
  const switchButtons = document.querySelectorAll("[data-switch-view]");

  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  const viewContent = {
    login: {
      heading: "Welcome back",
      intro: "Log in to check on your flock and continue where you left off.",
    },
    signup: {
      heading: "Create your account",
      intro: "Get started with healthier flocks.",
    },
  };

  function switchView(view) {
    if (!viewContent[view]) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.authTab === view;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.authPanel === view;

      panel.hidden = !isActive;
      panel.tabIndex = isActive ? 0 : -1;
    });

    heading.textContent = viewContent[view].heading;
    intro.textContent = viewContent[view].intro;

    document.title =
      view === "login" ? "Log In | KazaCare" : "Sign Up | KazaCare";

    clearFormMessages(loginForm);
    clearFormMessages(signupForm);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      switchView(tab.dataset.authTab);
    });

    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      event.preventDefault();

      const nextView = tab.dataset.authTab === "login" ? "signup" : "login";

      switchView(nextView);

      document.querySelector(`[data-auth-tab="${nextView}"]`).focus();
    });
  });

  switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchView(button.dataset.switchView);

      document
        .querySelector(`[data-auth-tab="${button.dataset.switchView}"]`)
        .focus();
    });
  });

  const initialView = body.dataset.initialView || "login";
  switchView(initialView);

  const passwordToggles = document.querySelectorAll("[data-password-toggle]");

  passwordToggles.forEach((button) => {
    button.addEventListener("click", () => {
      const inputId = button.dataset.passwordToggle;
      const passwordInput = document.getElementById(inputId);

      if (!passwordInput) return;

      const shouldShow = passwordInput.type === "password";

      passwordInput.type = shouldShow ? "text" : "password";
      button.textContent = shouldShow ? "Hide" : "Show";
      button.setAttribute(
        "aria-label",
        shouldShow ? "Hide password" : "Show password",
      );
      button.setAttribute("aria-pressed", String(shouldShow));
    });
  });

  function showFieldError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);

    if (!input || !error) return;

    error.textContent = message;
    error.hidden = false;
    input.setAttribute("aria-invalid", "true");
  }

  function clearFieldError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);

    if (!input || !error) return;

    error.textContent = "";
    error.hidden = true;
    input.removeAttribute("aria-invalid");
  }

  function clearFormMessages(form) {
    if (!form) return;

    form.querySelectorAll(".auth-field-error").forEach((error) => {
      error.textContent = "";
      error.hidden = true;
    });

    form.querySelectorAll("[aria-invalid='true']").forEach((input) => {
      input.removeAttribute("aria-invalid");
    });

    const message = form.querySelector(".auth-form-message");

    if (message) {
      message.textContent = "";
      message.hidden = true;
    }
  }

  function showFormMessage(form, text) {
    const message = form.querySelector(".auth-form-message");

    if (!message) return;

    message.textContent = text;
    message.hidden = false;
  }

  function isValidEmail(email) {
    const input = document.createElement("input");

    input.type = "email";
    input.value = email;

    return input.validity.valid && email.length > 0;
  }

  function focusFirstInvalid(form) {
    const firstInvalid = form.querySelector("[aria-invalid='true']");

    if (firstInvalid) {
      firstInvalid.focus();
    }
  }

  document.querySelectorAll(".auth-form input").forEach((input) => {
    const eventName = input.type === "checkbox" ? "change" : "input";

    input.addEventListener(eventName, () => {
      clearFieldError(input.id);

      const form = input.closest("form");
      const message = form?.querySelector(".auth-form-message");

      if (message) {
        message.textContent = "";
        message.hidden = true;
      }

      if (
        input.id === "signup-password" ||
        input.id === "signup-confirm-password"
      ) {
        const confirmInput = document.getElementById("signup-confirm-password");

        if (
          confirmInput.value &&
          confirmInput.value !==
            document.getElementById("signup-password").value
        ) {
          showFieldError(
            "signup-confirm-password",
            "Your passwords do not match.",
          );
        }
      }
    });
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormMessages(loginForm);

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    let isValid = true;

    if (!email) {
      showFieldError("login-email", "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showFieldError("login-email", "Enter a valid email address.");
      isValid = false;
    }

    if (!password.trim()) {
      showFieldError("login-password", "Please enter your password.");
      isValid = false;
    }

    if (!isValid) {
      focusFirstInvalid(loginForm);
      return;
    }

    completeDemoLogin(loginForm);
  });

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormMessages(signupForm);

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirm-password",
    ).value;
    const terms = document.getElementById("signup-terms").checked;

    let isValid = true;

    if (!name) {
      showFieldError("signup-name", "Please enter your full name.");
      isValid = false;
    } else if (name.length < 2) {
      showFieldError(
        "signup-name",
        "Your name must contain at least 2 characters.",
      );
      isValid = false;
    }

    if (!email) {
      showFieldError("signup-email", "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showFieldError("signup-email", "Enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      showFieldError("signup-password", "Please create a password.");
      isValid = false;
    } else if (password.length < 8) {
      showFieldError(
        "signup-password",
        "Your password must be at least 8 characters long.",
      );
      isValid = false;
    }

    if (!confirmPassword) {
      showFieldError(
        "signup-confirm-password",
        "Please confirm your password.",
      );
      isValid = false;
    } else if (password !== confirmPassword) {
      showFieldError("signup-confirm-password", "Your passwords do not match.");
      isValid = false;
    }

    if (!terms) {
      showFieldError(
        "signup-terms",
        "Please agree to the Privacy Policy to continue.",
      );
      isValid = false;
    }

    if (!isValid) {
      focusFirstInvalid(signupForm);
      return;
    }

    completeDemoLogin(signupForm);
  });

  function completeDemoLogin(form) {
    try {
      localStorage.setItem("isLoggedIn", "true");

      window.location.href = "dashboard.html";
    } catch (error) {
      showFormMessage(
        form,
        "We couldn't save your demo session. Check your browser settings and try again.",
      );
    }
  }

  document.querySelectorAll("[data-forgot-password]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      showFormMessage(
        loginForm,
        "Password recovery isn't available in this demo yet. Please contact the KazaCare team for assistance.",
      );
    });
  });
});
