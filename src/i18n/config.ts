import { defineAstroI18nConfig } from "astro-i18n";

export default defineAstroI18nConfig({
  defaultLangCode: "en",
  supportedLangCodes: ["ar"],
  showDefaultLangCode: false,
  translations: {
    en: "src/i18n/locales/en.json",
    ar: "src/i18n/locales/ar.json",
  },
  routeTranslations: {
    en: "src/i18n/routes/en.json",
    ar: "src/i18n/routes/ar.json",
  },
});
