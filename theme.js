(function () {
  "use strict";

  var root = document.documentElement;
  var storageKey = "qun-dai-color-theme";
  var savedTheme = null;

  try {
    savedTheme = window.localStorage.getItem(storageKey);
  } catch (error) {
    savedTheme = null;
  }

  var systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initialTheme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : (systemPrefersDark ? "dark" : "light");

  root.dataset.theme = initialTheme;
  root.style.colorScheme = initialTheme;

  function initializePage() {
    var toggle = document.getElementById("theme-toggle");
    var label = toggle ? toggle.querySelector(".theme-label") : null;
    var themeColor = document.querySelector('meta[name="theme-color"]');

    function applyTheme(theme, savePreference) {
      var isDark = theme === "dark";
      root.dataset.theme = theme;
      root.style.colorScheme = theme;

      if (toggle) {
        toggle.setAttribute("aria-pressed", String(isDark));
        toggle.setAttribute("aria-label", "Switch to " + (isDark ? "light" : "dark") + " mode");
        toggle.setAttribute("title", "Switch to " + (isDark ? "light" : "dark") + " mode");
      }

      if (label) {
        label.textContent = isDark ? "Light" : "Dark";
      }

      if (themeColor) {
        themeColor.setAttribute("content", isDark ? "#0f1821" : "#ffffff");
      }

      if (savePreference) {
        try {
          window.localStorage.setItem(storageKey, theme);
        } catch (error) {
          /* The selected theme still works when storage is unavailable. */
        }
      }
    }

    applyTheme(initialTheme, false);

    if (toggle) {
      toggle.addEventListener("click", function () {
        var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
      });
    }

    var today = new Date();
    var currentYear = document.getElementById("current-year");

    if (currentYear) {
      currentYear.textContent = String(today.getFullYear());
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage, { once: true });
  } else {
    initializePage();
  }
}());
