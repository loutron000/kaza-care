document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.querySelector("#dashboard-greeting");

  if (greeting) {
    const hour = new Date().getHours();

    let message = "Good evening";

    if (hour >= 0 && hour < 12) {
      message = "Good morning";
    } else if (hour >= 12 && hour < 17) {
      message = "Good afternoon";
    }

    greeting.textContent = `${message}, Salma 👋`;
  }
});
