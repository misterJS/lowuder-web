"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import en from "@/locales/en.json"
import es from "@/locales/es.json"
import id from "@/locales/id.json"

export type Locale = "en" | "es" | "id"
const DICTS = { en, es, id } as const
type Messages = typeof en

// Deep key type for "a.b.c"
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never
type Paths<T> = T extends object
  ? { [K in keyof T]-?: K extends string ? (T[K] extends object ? Join<K, Paths<T[K]>> : K) : never }[keyof T]
  : never

type I18nCtx = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: Paths<Messages>) => string
}

const Ctx = createContext<I18nCtx | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "id"
    return (localStorage.getItem("lowuder:lang") as Locale) || "id"
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("lowuder:lang", locale)
    document.documentElement.lang = locale
  }, [locale])

  const dict = DICTS[locale]
  const t = useMemo(
    () => (key: Paths<Messages>) => {
      const val = key.split(".").reduce<any>((o, k) => (o ? o[k] : undefined), dict)
      return (val as string) ?? key
    },
    [dict]
  )

  const value = useMemo<I18nCtx>(() => ({ locale, setLocale, t }), [locale, t])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
