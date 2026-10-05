const themeToggle = document.getElementById("theme-toggle");
const themeThumb = document.getElementById("theme-thumb");

const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

function setTheme(theme) {
  const isDark = theme === "dark";

  // HTML dark class
  document.documentElement.classList.toggle("dark", isDark);

  // Save preference
  localStorage.setItem("theme", theme);

  if (isDark) {
    // Move circle to the right
    themeThumb.classList.add("translate-x-7");

    // Sun out
    sunIcon.classList.add("rotate-90", "scale-75", "opacity-0");

    // Moon in
    moonIcon.classList.remove("scale-75", "opacity-0");

    moonIcon.classList.add("scale-100", "opacity-100");

    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    // Move circle to the left
    themeThumb.classList.remove("translate-x-7");

    // Moon out
    moonIcon.classList.add("scale-75", "opacity-0");

    moonIcon.classList.remove("scale-100", "opacity-100");

    // Sun in
    sunIcon.classList.remove("rotate-90", "scale-75", "opacity-0");

    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(prefersDark ? "dark" : "light");
}

// Toggle
themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");

  setTheme(isDark ? "light" : "dark");
});
