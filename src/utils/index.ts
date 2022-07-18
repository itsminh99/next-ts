import { DARK_THEME_MEDIA_SYSTEM, DEFAULT_LANGUAGE } from "constant";
import { AppearanceType } from "constant/enum";
import { LanguageType } from "constant/types";
import { clientStorage } from "utils/storage";
import { BreakpointsOptions } from "hooks";

export const getTheme = (
  key: string,
  fallback: AppearanceType,
): AppearanceType => {
  if (typeof window === "undefined") return fallback;
  try {
    const theme =
      (clientStorage.get(key) as AppearanceType) || getThemeSystem();
    return theme || fallback;
  } catch (error) {
    // Unsupported
    console.error(error);
  }
  return fallback;
};

export const getThemeSystem = (e?: MediaQueryList): AppearanceType => {
  if (!e) {
    e = window.matchMedia(DARK_THEME_MEDIA_SYSTEM);
  }

  const isDark = e.matches;

  const themeSystem = isDark ? AppearanceType.Dark : AppearanceType.Light;
  return themeSystem;
};

export const getOSLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE as LanguageType;

  const language =
    window.navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;

  return (language ? language.slice(0, 2) : DEFAULT_LANGUAGE) as LanguageType;
};

export const parseJSON = (data: string, defaultData: unknown): unknown => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return defaultData;
  }
};

export const getActiveBreakpoint = (
  currentRatio: Breakpoint,
  options: { [key: string]: string }
) => {
  switch (currentRatio) {
    case BreakpointsOptions.xl:
      return (
        options[BreakpointsOptions.xl] ??
        options[BreakpointsOptions.lg] ??
        options[BreakpointsOptions.md] ??
        options[BreakpointsOptions.sm] ??
        options[BreakpointsOptions.xs]
      );
    case BreakpointsOptions.lg:
      return (
        options[BreakpointsOptions.lg] ??
        options[BreakpointsOptions.md] ??
        options[BreakpointsOptions.sm] ??
        options[BreakpointsOptions.xs]
      );
    case BreakpointsOptions.md:
      return (
        options[BreakpointsOptions.md] ??
        options[BreakpointsOptions.sm] ??
        options[BreakpointsOptions.xs]
      );
    case BreakpointsOptions.sm:
      return options[BreakpointsOptions.sm] ?? options[BreakpointsOptions.xs];
    case BreakpointsOptions.xs:
      return options[BreakpointsOptions.xs];
    default:
      return;
  }
};
