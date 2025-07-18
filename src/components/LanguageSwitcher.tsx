import React, { useCallback, useMemo } from "react";
import { Switch } from "./ui/switch";
import { useTranslations, useSwitchLocalePath } from "../i18n/react";

interface LanguageSwitcherProps {
  currentLocale: string;
  currentPath?: string;
  className?: string;
}

const SUPPORTED_LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "AR", name: "العربية" },
];

export default function LanguageSwitcher({ currentLocale, currentPath = "", className = "" }: LanguageSwitcherProps) {
  const isArabic = currentLocale === "ar";
  const otherLang = SUPPORTED_LANGUAGES.find((lang) => lang.code !== currentLocale)!;

  // Use our new helper to switch paths between locales
  const switchLocalePath = useSwitchLocalePath();
  
  // Generate the target path for language switching
  const switchPath = useMemo(() => {
    if (!currentPath) return `/${otherLang.code}/`;
    return switchLocalePath(currentPath, otherLang.code as 'en' | 'ar');
  }, [currentPath, otherLang.code, switchLocalePath]);

  // Debug logging
  const handleToggle = useCallback(() => {
    console.log('=== DEBUG INFO ===');
    console.log('currentLocale:', currentLocale);
    console.log('currentPath:', currentPath);
    console.log('otherLang:', otherLang);
    console.log('switchPath:', switchPath);
    console.log('window.location.href:', window.location.href);
    console.log('==================');
    window.location.assign(switchPath);
  }, [switchPath, currentLocale, currentPath, otherLang]);

  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Language Switcher">
      <span
        className={`text-xs font-semibold transition-colors ${!isArabic ? 'text-primary' : 'text-gray-400'}`}
        aria-current={!isArabic ? "true" : undefined}
      >EN</span>
      <Switch
        checked={isArabic}
        onCheckedChange={handleToggle}
        aria-label={isArabic ? "Switch to English" : "Switch to Arabic"}
        tabIndex={0}
        className="mx-1"
      />
      <span
        className={`text-xs font-semibold transition-colors ${isArabic ? 'text-primary' : 'text-gray-400'}`}
        aria-current={isArabic ? "true" : undefined}
      >AR</span>
    </div>
  );
}

