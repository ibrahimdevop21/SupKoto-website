import { defineAstroI18nConfig } from "astro-i18n";
import fs from 'fs';
import path from 'path';

// Load translations from JSON files
const enTranslations = JSON.parse(fs.readFileSync(path.resolve('./src/i18n/locales/en.json'), 'utf-8'));
const arTranslations = JSON.parse(fs.readFileSync(path.resolve('./src/i18n/locales/ar.json'), 'utf-8'));

// Load route translations
const arRoutes = JSON.parse(fs.readFileSync(path.resolve('./src/i18n/routes/ar.json'), 'utf-8'));

export default defineAstroI18nConfig({
  primaryLocale: "en",
  secondaryLocales: ["ar"],
  showPrimaryLocale: false,
  translations: {
    "common": {
      "en": enTranslations,
      "ar": arTranslations
    }
  },
  routes: {
    "ar": arRoutes
  }
});
