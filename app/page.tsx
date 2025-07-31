import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Trophy, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  // Erste 5 Karten als Featured Cards
  const featuredCards = [
    {
      id: 1,
      name: "Satoshi",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 7,
      name: "Blocktrainer",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 12,
      name: "Christian Decker",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 19,
      name: "Zitadelle",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 20,
      name: "Gigi",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-brand text-foreground mb-6">
            Einund<span className="text-orange-500">zwanzig</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Das offizielle Sammelkartenspiel der deutschen Bitcoin Community. 21 einzigartige Karten mit den Legenden
            unserer Community, jeweils 210 mal nummeriert. Die Seriennummer #21 jeder Karte ist eine besondere
            Holo-Version.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cards">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-brand">
                <Trophy className="mr-2 h-5 w-5" />
                Alle 21 Legenden entdecken
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/50 font-brand bg-transparent"
              >
                <Zap className="mr-2 h-5 w-5" />
                Lightning Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Complete Collection Preview */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-brand mb-6">Die komplette Genesis Edition</h2>
          <div className="bg-gradient-to-r from-orange-100 to-purple-100 dark:from-orange-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-8">
            <img
              src="/images/einundzwanzig-complete-collection.png"
              alt="Alle 21 Einundzwanzig Karten"
              className="max-w-full h-auto rounded-lg shadow-xl mx-auto"
            />
          </div>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
            Von Satoshi bis Gigi - alle 21 Persönlichkeiten und Projekte, die die deutsche Bitcoin-Community geprägt
            haben. Jede Karte ist 210 mal nummeriert, wobei die Seriennummer #21 als besondere Holo-Version glänzt.
          </p>
          <Link href="/cards">
            <Button size="lg" variant="outline">
              <Sparkles className="mr-2 h-5 w-5" />
              Komplette Sammlung ansehen
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-brand text-orange-500 mb-2">21</div>
              <div className="text-muted-foreground">Community Legenden</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-brand text-purple-500 mb-2">210</div>
              <div className="text-muted-foreground">Karten pro Motiv</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-brand text-blue-500 mb-2">4,410</div>
              <div className="text-muted-foreground">Karten insgesamt</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-brand text-yellow-500 mb-2">21</div>
              <div className="text-muted-foreground">Holo-Karten</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-brand text-center mb-12">Community Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredCards.map((card) => (
              <Card key={card.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-yellow-200 via-orange-200 to-purple-200">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-brand text-lg mb-2">{card.name}</h3>
                  <div className="text-xs text-muted-foreground mb-2">#{card.id.toString().padStart(3, "0")}</div>
                  <div className="text-sm text-muted-foreground mb-2">210 Exemplare</div>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-400"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    #21 Holo
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/cards">
              <Button variant="outline" size="lg" className="font-brand bg-transparent">
                Alle Community Legenden anzeigen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-brand text-center mb-12">Warum Einundzwanzig?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-brand mb-3">Lightning Login</h3>
              <p className="text-muted-foreground">
                Sichere Anmeldung über das Lightning Network. Keine E-Mail, keine Passwörter - einfach und sicher.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-brand mb-3">Community Trading</h3>
              <p className="text-muted-foreground">
                Finde andere Sammler, tausche Karten und baue deine perfekte Sammlung der Bitcoin-Legenden auf.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-brand mb-3">Holo-Sammlerstücke</h3>
              <p className="text-muted-foreground">
                Jede Karte #21 ist eine besondere holographische Version - die ultimativen Sammlerstücke für echte Fans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
