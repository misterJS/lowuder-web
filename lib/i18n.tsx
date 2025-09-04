"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import en from "@/locales/en.json"
import es from "@/locales/es.json"
import id from "@/locales/id.json"

export type Locale = "en" | "es" | "id"

/** Tipe kamus diambil dari en.json (harus jadi source of truth) */
type Messages = typeof en

// ----- util: type untuk key bertingkat "a.b.c"
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never
type Paths<T> = T extends object
  ? { [K in keyof T]-?: K extends string
      ? (T[K] extends object ? Join<K, Paths<T[K]>> : K)
      : never
    }[keyof T]
  : never

type I18nCtx = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: Paths<Messages>) => string
}

const Ctx = createContext<I18nCtx | null>(null)

// Pastikan semua locale punya bentuk yang sama dengan en.json
const DICTS = {
  en,
  es,
  id,
} satisfies Record<Locale, Messages>

/** Ambil nilai dari object berdasarkan path ["a","b","c"] tanpa any */
function getByPath(obj: unknown, path: string[]): unknown {
  let cur: unknown = obj
  for (const seg of path) {
    if (cur && typeof cur === "object" && seg in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[seg]
    } else {
      return undefined
    }
  }
  return cur
}

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
      const val = getByPath(dict, key.split("."))
      return typeof val === "string" ? val : key
    },
    [dict]
  )

  const value: I18nCtx = useMemo(() => ({ locale, setLocale, t }), [locale, t])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
