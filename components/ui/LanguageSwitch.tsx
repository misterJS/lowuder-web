"use client"

import { useI18n, type Locale } from "@/lib/i18n"

export function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n()
  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="h-9 rounded-md border bg-background px-2 text-sm"
    >
      <option value="en">{t("lang.en")}</option>
      <option value="es">{t("lang.es")}</option>
      <option value="id">{t("lang.id")}</option>
    </select>
  )
}
