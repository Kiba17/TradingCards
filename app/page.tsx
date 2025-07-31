import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredCards = [
    {
      id: 1,
      name: "Satoshi Genesis",
      rarity: "Legendary",
      image: "/placeholder.svg?height=300&width=200",
      owned: 5,
      total: 210,
    },
    {
      id: 2,
      name: "Lightning Strike",
      rarity: "Epic",
      image: "/placeholder.svg?height=300&width=200",
      owned: 12,
      total: 210,
    },
    {
      id: 3,
      name: "HODL Master",
      rarity: "Rare",
      image: "/placeholder.svg?height=300&width=200",
      owned: 23,
      total: 210,
    },
    {
      id: 4,
      name: "Mining Rig",
      rarity: "Common",
      image: "/placeholder.svg?height=300&width=200",
      owned: 45,
      total: 210,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Einund<span className="text-orange-500">zwanzig</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Das offizielle Sammelkartenspiel der Bitcoin Community. 21 einzigartige Motive, jeweils 210 mal nummeriert.
            Sammle, tausche und werde Teil der Community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cards">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Trophy className="mr-2 h-5 w-5" />
                Karten entdecken
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
              >
                <Zap className="mr-2 h-5 w-5" />
                Lightning Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">21</div>
              <div className="text-gray-600">Einzigartige Motive</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">210</div>
              <div className="text-gray-600">Karten pro Motiv</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">4,410</div>
              <div className="text-gray-600">Karten insgesamt</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Genesis Edition Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCards.map((card) => (
              <Card key={card.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{card.name}</h3>
                  <Badge
                    variant="secondary"
                    className={`mb-3 ${
                      card.rarity === "Legendary"
                        ? "bg-yellow-100 text-yellow-800"
                        : card.rarity === "Epic"
                          ? "bg-purple-100 text-purple-800"
                          : card.rarity === "Rare"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {card.rarity}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    {card.owned}/{card.total} im Umlauf
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/cards">
              <Button variant="outline" size="lg">
                Alle Karten anzeigen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Warum Einundzwanzig?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Login</h3>
              <p className="text-gray-600">
                Sichere Anmeldung über das Lightning Network. Keine E-Mail, keine Passwörter - einfach und sicher.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Trading</h3>
              <p className="text-gray-600">
                Finde andere Sammler, tausche Karten und baue deine perfekte Sammlung auf.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Echte Sammlerstücke</h3>
              <p className="text-gray-600">
                Jede Karte ist physisch vorhanden und nummeriert. Authentizität garantiert.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
