"use client"

import { useState, type PropsWithChildren } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Check, Shield, PhoneCall, MapPinned, BellRing, Send, Lock, Users, Brain, Layers, LineChart, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import { LanguageSwitch } from "@/components/ui/LanguageSwitch"
import Image from "next/image"

// ---- Types ----
type SectionProps = PropsWithChildren<{ id?: string; className?: string }>
type FeatureItemProps = { icon: LucideIcon; title: string; desc: string }
type StepProps = { n: number; title: string; desc: string }

// ---- Helper UI ----
const Section = ({ id, children, className = "" }: SectionProps) => (
  <section id={id} className={`w-full max-w-6xl mx-auto px-5 ${className}`}>{children}</section>
)

const FeatureItem = ({ icon: Icon, title, desc }: FeatureItemProps) => (
  <Card className="border-none shadow-sm">
    <CardHeader className="space-y-2">
      <div className="w-12 h-12 rounded-2xl bg-muted grid place-items-center">
        <Icon className="w-6 h-6" />
      </div>
      <CardTitle className="text-base">{title}</CardTitle>
      <CardDescription>{desc}</CardDescription>
    </CardHeader>
  </Card>
)

const Step = ({ n, title, desc }: StepProps) => (
  <div className="relative pl-12">
    <div className="absolute left-0 top-0 w-8 h-8 rounded-full border grid place-items-center text-sm font-semibold">{n}</div>
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </div>
)

export default function LowuderLanding() {
  const { t } = useI18n()
  const [email, setEmail] = useState<string>("")

  const handleWaitlistSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`${t("waitlist.alert")} ${email}.`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl grid place-items-center">
              <Image src={"/L.png"} width={50} height={50} alt="logo" />
            </div>
            <span className="font-semibold tracking-tight">Lowuder</span>
            <Badge variant="secondary" className="ml-2">Beta</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#fitur" className="hover:opacity-80">{t("nav.features")}</a>
            <a href="#cara-kerja" className="hover:opacity-80">{t("nav.how")}</a>
            <a href="#privasi" className="hover:opacity-80">{t("nav.privacy")}</a>
            <a href="#harga" className="hover:opacity-80">{t("nav.pricing")}</a>
            <a href="#faq" className="hover:opacity-80">{t("nav.faq")}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
              <a href="#waitlist">{t("nav.waitlist")}</a>
            </Button>
            <Button asChild>
              <a href="#download">{t("nav.demo")}</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section className="pt-14 pb-10 bg-gradient-to-b from-[hsl(var(--primary))]/10 via-[hsl(var(--secondary))]/10 to-[hsl(var(--accent))]/10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="text-3xl md:text-5xl font-semibold leading-tight">
              {t("hero.title")}
            </motion.h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              {t("hero.desc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="gap-1" variant="outline"><Shield className="w-3.5 h-3.5"/> {t("hero.badge1")}</Badge>
              <Badge className="gap-1" variant="outline"><Brain className="w-3.5 h-3.5"/> {t("hero.badge2")}</Badge>
              <Badge className="gap-1" variant="outline"><MapPinned className="w-3.5 h-3.5"/> {t("hero.badge3")}</Badge>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <a href="#waitlist"><BellRing className="w-4 h-4 mr-2"/>{t("hero.ctaWaitlist")}</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#download"><PhoneCall className="w-4 h-4 mr-2"/>{t("hero.ctaDemo")}</a>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t("hero.note")}</p>
          </div>

          {/* Visual mock */}
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6, delay:0.1}} className="md:justify-self-end">
            <Card className="overflow-hidden shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2"><PhoneCall className="w-4 h-4"/> {t("mock.title")}</CardTitle>
                <CardDescription>{t("mock.desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[9/16] w-full rounded-xl border bg-gradient-to-b from-muted/60 to-muted grid place-items-center">
                  <div className="w-[85%] space-y-3 text-center">
                    <div className="h-40 rounded-xl bg-background/70 border grid place-items-center">
                      <span className="text-sm text-muted-foreground">{t("mock.preview")}</span>
                    </div>
                    <div className="text-left text-sm space-y-2">
                      <div className="flex items-center gap-2"><Lock className="w-4 h-4"/><span>{t("mock.geojitter")}</span></div>
                      <div className="flex items-center gap-2"><Brain className="w-4 h-4"/><span>{t("mock.moderation")}</span></div>
                      <div className="flex items-center gap-2"><Send className="w-4 h-4"/><span>{t("mock.status")}</span></div>
                    </div>
                    <Button className="w-full">{t("mock.button")}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Social proof */}
      <Section className="py-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="uppercase tracking-widest">{t("designed.title")}</span>
          <Badge variant="outline" className="rounded-full px-3 py-1">{t("designed.rt")}</Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">{t("designed.campus")}</Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">{t("designed.volunteers")}</Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">{t("designed.events")}</Badge>
        </div>
      </Section>

      {/* Fitur */}
      <Section id="fitur" className="py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("features.title")}</h2>
          <p className="text-muted-foreground mt-2">{t("features.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <FeatureItem icon={Shield} title={t("features.privacy.title")} desc={t("features.privacy.desc")} />
          <FeatureItem icon={Brain} title={t("features.ai.title")} desc={t("features.ai.desc")} />
          <FeatureItem icon={MapPinned} title={t("features.heatmap.title")} desc={t("features.heatmap.desc")} />
          <FeatureItem icon={BellRing} title={t("features.sms.title")} desc={t("features.sms.desc")} />
          <FeatureItem icon={Users} title={t("features.contacts.title")} desc={t("features.contacts.desc")} />
          <FeatureItem icon={Layers} title={t("features.audit.title")} desc={t("features.audit.desc")} />
        </div>
      </Section>

      {/* Cara Kerja */}
      <Section id="cara-kerja" className="py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("how.title")}</h2>
          <p className="text-muted-foreground mt-2">{t("how.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <Step n={1} title={t("how.1.title")} desc={t("how.1.desc")} />
            <Step n={2} title={t("how.2.title")} desc={t("how.2.desc")} />
            <Step n={3} title={t("how.3.title")} desc={t("how.3.desc")} />
            <Step n={4} title={t("how.4.title")} desc={t("how.4.desc")} />
            <Step n={5} title={t("how.5.title")} desc={t("how.5.desc")} />
          </div>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">{t("flow.title")}</CardTitle>
              <CardDescription>{t("flow.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border bg-muted/50 p-6">
                <svg viewBox="0 0 600 300" className="w-full h-[260px]">
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" />
                    </marker>
                  </defs>
                  <rect x="20" y="30" width="140" height="60" rx="12" className="fill-white" />
                  <text x="90" y="65" textAnchor="middle" className="text-[12px]">{t("flow.box1")}</text>

                  <rect x="220" y="30" width="160" height="60" rx="12" className="fill-white" />
                  <text x="300" y="56" textAnchor="middle" className="text-[12px]">{t("flow.box2")}</text>
                  <text x="300" y="72" textAnchor="middle" className="text-[10px]">{t("flow.box2b")}</text>

                  <rect x="440" y="30" width="140" height="60" rx="12" className="fill-white" />
                  <text x="510" y="56" textAnchor="middle" className="text-[12px]">{t("flow.box3")}</text>

                  <rect x="220" y="180" width="160" height="60" rx="12" className="fill-white" />
                  <text x="300" y="207" textAnchor="middle" className="text-[12px]">{t("flow.box4")}</text>
                  <text x="300" y="223" textAnchor="middle" className="text-[10px]">{t("flow.box4b")}</text>

                  <line x1="160" y1="60" x2="220" y2="60" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="380" y1="60" x2="440" y2="60" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="300" y1="90" x2="300" y2="180" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow)" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Privasi & Keamanan */}
      <Section id="privasi" className="py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("privacy.title")}</h2>
          <p className="text-muted-foreground mt-2">{t("privacy.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Lock className="w-4 h-4"/> {t("privacy.min.title")}</CardTitle>
              <CardDescription>{t("privacy.min.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.min.b1")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.min.b2")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.min.b3")}</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Shield className="w-4 h-4"/> {t("privacy.abuse.title")}</CardTitle>
              <CardDescription>{t("privacy.abuse.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.abuse.b1")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.abuse.b2")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.abuse.b3")}</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><LineChart className="w-4 h-4"/> {t("privacy.transp.title")}</CardTitle>
              <CardDescription>{t("privacy.transp.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.transp.b1")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.transp.b2")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("privacy.transp.b3")}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Harga */}
      <Section id="harga" className="py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("pricing.title")}</h2>
          <p className="text-muted-foreground mt-2">{t("pricing.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle>{t("pricing.starter.name")}</CardTitle>
              <CardDescription>{t("pricing.starter.desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-semibold">{t("pricing.starter.price")}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.starter.b1")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.starter.b2")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.starter.b3")}</li>
              </ul>
              <Button className="w-full" variant="outline">{t("pricing.starter.cta")}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("pricing.comm.name")}</CardTitle>
              <CardDescription>{t("pricing.comm.desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div><span className="text-3xl font-semibold">{t("pricing.comm.price")}</span><span className="text-sm text-muted-foreground">{t("pricing.comm.per")}</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.comm.b1")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.comm.b2")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.comm.b3")}</li>
              </ul>
              <Button className="w-full">{t("pricing.comm.cta")}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("pricing.inst.name")}</CardTitle>
              <CardDescription>{t("pricing.inst.desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-semibold">{t("pricing.inst.price")}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.inst.b1")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.inst.b2")}</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5"/> {t("pricing.inst.b3")}</li>
              </ul>
              <Button className="w-full" variant="outline">{t("pricing.inst.cta")}</Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Waitlist */}
      <Section id="waitlist" className="py-14">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("waitlist.title")}</h2>
          <p className="text-muted-foreground mt-2">{t("waitlist.subtitle")}</p>
        </div>
        <div className="max-w-xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleWaitlistSubmit}>
                <Input placeholder={t("waitlist.placeholder")} type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Button type="submit" className="gap-2"><Mail className="w-4 h-4"/> {t("waitlist.cta")}</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">{t("waitlist.note")}</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("faq.title")}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("faq.q1")}</CardTitle>
              <CardDescription>{t("faq.a1")}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("faq.q2")}</CardTitle>
              <CardDescription>{t("faq.a2")}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("faq.q3")}</CardTitle>
              <CardDescription>{t("faq.a3")}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("faq.q4")}</CardTitle>
              <CardDescription>{t("faq.a4")}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Section>

      {/* CTA Footer */}
      <footer className="border-t">
        <Section className="py-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold">{t("footer.ctaTitle")}</h3>
              <p className="text-muted-foreground mt-2">{t("footer.ctaSub")}</p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <Button asChild><a href="#waitlist"><BellRing className="w-4 h-4 mr-2"/>{t("footer.join")}</a></Button>
              <Button variant="outline" asChild><a href="#download"><Github className="w-4 h-4 mr-2"/>{t("footer.demo")}</a></Button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Lowuder</span>
            <div className="flex gap-4">
              <a href="#privasi" className="hover:opacity-80">{t("footer.privacy")}</a>
              <a href="#" className="hover:opacity-80">{t("footer.terms")}</a>
              <a href="#" className="hover:opacity-80">{t("footer.contact")}</a>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  )
}
