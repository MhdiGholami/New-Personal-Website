const DEFAULT_LANGUAGE = "fa";
const LANGUAGE_KEY = "language";

/* --------------------------------
   Get translation
-------------------------------- */

function getTranslation(object, path) {
  return path.split(".").reduce((result, key) => {
    return result?.[key];
  }, object);
}

/* --------------------------------
   Translate text
-------------------------------- */

function translateTextElements(language) {
  const dictionary = translations[language];

  if (!dictionary) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = getTranslation(dictionary, key);

    if (value !== undefined) {
      element.textContent = value;
    }
  });
}

/* --------------------------------
   Translate placeholders
-------------------------------- */

function translatePlaceholders(language) {
  const dictionary = translations[language];

  if (!dictionary) return;

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const value = getTranslation(dictionary, key);

    if (value !== undefined) {
      element.placeholder = value;
    }
  });
}

/* --------------------------------
   Translate aria labels
-------------------------------- */

function translateAriaLabels(language) {
  const dictionary = translations[language];

  if (!dictionary) return;

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    const value = getTranslation(dictionary, key);

    if (value !== undefined) {
      element.setAttribute("aria-label", value);
    }
  });
}

/* --------------------------------
   Translate title attributes
-------------------------------- */

function translateTitles(language) {
  const dictionary = translations[language];

  if (!dictionary) return;

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;
    const value = getTranslation(dictionary, key);

    if (value !== undefined) {
      element.setAttribute("title", value);
    }
  });
}

/* --------------------------------
   Translate page
-------------------------------- */

function translatePage(language) {
  translateTextElements(language);
  translatePlaceholders(language);
  translateAriaLabels(language);
  translateTitles(language);
}

/* --------------------------------
   Update language button
-------------------------------- */

/*
  The button shows the language
  the user can switch TO.

  Persian page  → EN
  English page  → FA
*/

function updateLanguageButton(language) {
  const languageLabel = document.getElementById("language-label");

  const languageToggle = document.getElementById("language-toggle");

  if (!languageLabel) return;

  if (language === "fa") {
    languageLabel.textContent = "EN";

    languageToggle?.setAttribute("aria-label", "Switch to English");
  } else {
    languageLabel.textContent = "فا";

    languageToggle?.setAttribute("aria-label", "تغییر به فارسی");
  }
}

/* --------------------------------
   Set language
-------------------------------- */

function setLanguage(language) {
  if (!translations[language]) {
    language = DEFAULT_LANGUAGE;
  }

  const isPersian = language === "fa";

  /* HTML language */
  document.documentElement.lang = language;

  /* RTL / LTR */
  document.documentElement.dir = isPersian ? "rtl" : "ltr";

  /* Translate */
  translatePage(language);

  /* Update button */
  updateLanguageButton(language);

  /* Save */
  localStorage.setItem(LANGUAGE_KEY, language);
}

/* --------------------------------
   Initialize language
-------------------------------- */

function initLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);

  /*
    New visitors:
    Persian by default.

    Returning visitors:
    Use their saved language.
  */

  const language = savedLanguage || DEFAULT_LANGUAGE;

  setLanguage(language);
}

/* --------------------------------
   Language button
-------------------------------- */

const languageToggle = document.getElementById("language-toggle");

languageToggle?.addEventListener("click", () => {
  const currentLanguage = document.documentElement.lang;

  const newLanguage = currentLanguage === "fa" ? "en" : "fa";

  setLanguage(newLanguage);
});

/* --------------------------------
   Start
-------------------------------- */

initLanguage();
