"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, Share2, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CardDetailPage({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)

  // Alle 21 echten Community-Karten
  const allCards = [
    {
      id: 1,
      name: "Satoshi",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Der mysteriöse Erfinder von Bitcoin. Diese Karte ehrt den Pseudonym-Träger, der die Welt für immer verändert hat. Die Seriennummer #21 ist als Holo-Version besonders begehrt.",
    },
    {
      id: 2,
      name: "Niko Jilch",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Journalist und Bitcoin-Experte aus Österreich. Bekannt für seine verständlichen Erklärungen und seinen Beitrag zur Bitcoin-Aufklärung im deutschsprachigen Raum.",
    },
    {
      id: 3,
      name: "Der Pleb",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Repräsentiert jeden einzelnen Bitcoin-Enthusiasten in der Community. Der Pleb steht für die Dezentralisierung und die Macht des Einzelnen im Bitcoin-Netzwerk.",
    },
    {
      id: 4,
      name: "Einundzwanzig Stammtisch",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Das Herzstück der lokalen Bitcoin-Community. Stammtische bringen Bitcoiner zusammen und fördern den Austausch von Wissen und Erfahrungen.",
    },
    {
      id: 5,
      name: "Nodesignal",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Technischer Bitcoin-Experte und Node-Betreiber. Steht für die technische Infrastruktur und das Verständnis der Bitcoin-Technologie in der Community.",
    },
    {
      id: 6,
      name: "Fab",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Bekannte Persönlichkeit der deutschen Bitcoin-Szene. Trägt durch Content und Community-Arbeit zur Verbreitung von Bitcoin-Wissen bei.",
    },
    {
      id: 7,
      name: "Blocktrainer",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Einer der bekanntesten deutschen Bitcoin-Educator. Roman Reher hat Tausenden Menschen Bitcoin nähergebracht und ist eine Legende der deutschen Bitcoin-Szene.",
    },
    {
      id: 8,
      name: "Seedor Chris",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Experte für Bitcoin-Sicherheit und Seed-Phrase-Backup-Lösungen. Hilft der Community dabei, ihre Bitcoin sicher zu verwahren.",
    },
    {
      id: 9,
      name: "Plebrap",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Bitcoin-Rapper und Musiker der Community. Bringt Bitcoin-Themen in die Musikwelt und erreicht neue Zielgruppen durch seine kreativen Inhalte.",
    },
    {
      id: 10,
      name: "Bitcoin Hotel",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Pionier-Projekt für Bitcoin-Akzeptanz im Tourismus. Zeigt, wie Bitcoin in der realen Wirtschaft eingesetzt werden kann.",
    },
    {
      id: 11,
      name: "Pioniere Münzweg",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Frühe Bitcoin-Adopter und Community-Builder. Haben den Grundstein für die deutsche Bitcoin-Community gelegt.",
    },
    {
      id: 12,
      name: "Christian Decker",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Lightning Network Entwickler und Forscher bei Blockstream. Einer der technischen Köpfe hinter dem Lightning Network.",
    },
    {
      id: 13,
      name: "Markus Turm",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Bitcoin-Enthusiast und Community-Mitglied. Steht für die Vielfalt und das Engagement der deutschen Bitcoin-Community.",
    },
    {
      id: 14,
      name: "Jonas Nick",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Bitcoin Core Entwickler und Kryptographie-Experte. Arbeitet an wichtigen Bitcoin-Verbesserungen und Sicherheitsfeatures.",
    },
    {
      id: 15,
      name: "Netdiver",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Technischer Bitcoin-Experte mit Fokus auf Netzwerk-Infrastruktur. Trägt zum technischen Verständnis der Community bei.",
    },
    {
      id: 16,
      name: "Dennis",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Aktives Community-Mitglied und Bitcoin-Enthusiast. Repräsentiert die Basis der deutschen Bitcoin-Community.",
    },
    {
      id: 17,
      name: "Paddepadde",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description: "Kreativer Kopf der Bitcoin-Community. Bekannt für innovative Ideen und Community-Projekte.",
    },
    {
      id: 18,
      name: "Maurice-Effekt",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Einflussreicher Bitcoin-Content-Creator. Bekannt für seine analytischen Beiträge und Markteinschätzungen.",
    },
    {
      id: 19,
      name: "Zitadelle",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Symbol für die Bitcoin-Maximalisten-Bewegung. Die Zitadelle repräsentiert die Vision einer Bitcoin-dominierten Zukunft.",
    },
    {
      id: 20,
      name: "Gigi",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Philosoph und Autor der Bitcoin-Community. Bekannt für tiefgreifende Gedanken über Bitcoin und dessen gesellschaftliche Auswirkungen.",
    },
    {
      id: 21,
      name: "Einundzwanzig Magazin",
      image: "/placeholder.svg?height=600&width=400",
      total: 210,
      description:
        "Das führende deutschsprachige Bitcoin-Magazin. Quelle für News, Analysen und Bildungsinhalte rund um Bitcoin.",
    },
  ]

  const card = allCards.find((c) => c.id === Number.parseInt(params.id)) || allCards[0]

  const attributes = [
    { trait: "Edition", value: "Genesis" },
    { trait: "Community", value: "Deutsche Bitcoin-Szene" },
    { trait: "Year", value: "2024" },
    { trait: "Auflage", value: "210 Exemplare" },
    { trait: "Holo-Version", value: "Seriennummer #21" },
  ]

  const owners = [
    {
      id: 1,
      name: "BitcoinMaxi",
      avatar: "/placeholder.svg?height=40&width=40",
      cardNumber: "#001",
      isHolo: false,
    },
    {
      id: 2,
      name: "SatoshiFan",
      avatar: "/placeholder.svg?height=40&width=40",
      cardNumber: "#021",
      isHolo: true,
    },
    {
      id: 3,
      name: "HODLer2024",
      avatar: "/placeholder.svg?height=40&width=40",
      cardNumber: "#089",
      isHolo: false,
    },
  ]

  const tradeOffers = [
    {
      id: 1,
      user: "CardTrader",
      avatar: "/placeholder.svg?height=40&width=40",
      offering: "Blocktrainer #156 + Gigi #042",
      wants: card.name,
    },
    {
      id: 2,
      user: "Collector21",
      avatar: "/placeholder.svg?height=40&width=40",
      offering: "Satoshi #023 (Holo #21 Version!)",
      wants: card.name + " #21 (Holo)",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/cards">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zu den Karten
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Card Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-yellow-200 via-orange-200 to-purple-200 shadow-lg">
              <img src={card.image || "/placeholder.svg"} alt={card.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Card Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-300">
                  Genesis Edition
                </Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsFavorited(!isFavorited)}>
                    <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h1 className="text-3xl font-brand text-gray-900 mb-2">{card.name}</h1>
              <div className="text-sm text-gray-500 mb-4">#{card.id.toString().padStart(3, "0")}</div>
              <p className="text-gray-600 mb-4">{card.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-500">Auflage</div>
                <div className="text-2xl font-bold">{card.total}</div>
                <div className="text-xs text-gray-400">Exemplare</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-500">Holo-Version</div>
                <div className="text-2xl font-bold text-yellow-600">#21</div>
                <div className="text-xs text-gray-400">Besonders selten</div>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                <Users className="mr-2 h-4 w-4" />
                Trade anbieten
              </Button>
            </div>

            {/* Attributes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eigenschaften</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {attributes.map((attr, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">{attr.trait}</div>
                      <div className="font-semibold">{attr.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="owners" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="owners">Besitzer</TabsTrigger>
            <TabsTrigger value="trades">Trade Angebote</TabsTrigger>
          </TabsList>

          <TabsContent value="owners" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Aktuelle Besitzer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {owners.map((owner) => (
                    <div key={owner.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{owner.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{owner.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            {owner.cardNumber}
                            {owner.isHolo && (
                              <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs"
                              >
                                <Sparkles className="mr-1 h-2 w-2" />
                                Holo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button size="sm" variant="outline">
                          Trade anfragen
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trades" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Trade Angebote</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradeOffers.map((offer) => (
                    <div key={offer.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={offer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{offer.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="font-semibold">{offer.user}</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <strong>Bietet:</strong> {offer.offering}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <strong>Möchte:</strong> {offer.wants}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          Akzeptieren
                        </Button>
                        <Button size="sm" variant="outline">
                          Gegenangebot
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
