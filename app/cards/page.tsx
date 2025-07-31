"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CardsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Die echten 21 Karten der deutschen Bitcoin-Community
  const cards = [
    {
      id: 1,
      name: "Satoshi",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 2,
      name: "Niko Jilch",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 3,
      name: "Der Pleb",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 4,
      name: "Einundzwanzig Stammtisch",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 5,
      name: "Nodesignal",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 6,
      name: "Fab",
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
      id: 8,
      name: "Seedor Chris",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 9,
      name: "Plebrap",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 10,
      name: "Bitcoin Hotel",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 11,
      name: "Pioniere Münzweg",
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
      id: 13,
      name: "Markus Turm",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 14,
      name: "Jonas Nick",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 15,
      name: "Netdiver",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 16,
      name: "Dennis",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 17,
      name: "Paddepadde",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
    {
      id: 18,
      name: "Maurice-Effekt",
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
    {
      id: 21,
      name: "Einundzwanzig Magazin",
      image: "/placeholder.svg?height=300&width=200",
      total: 210,
    },
  ]

  const filteredCards = cards.filter((card) => {
    return card.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-brand text-gray-900 mb-4">Genesis Edition - Alle 21 Karten</h1>
          <p className="text-gray-600 mb-6">
            Die komplette Genesis Edition mit allen 21 Persönlichkeiten und Projekten der deutschen Bitcoin-Community.
            Jede Karte ist 210 mal nummeriert - die Seriennummer #21 jeder Karte ist eine besondere Holo-Version.
          </p>

          {/* Complete Collection Image */}
          <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-brand mb-4 text-center">Die komplette Sammlung</h2>
            <div className="flex justify-center">
              <img
                src="/images/einundzwanzig-complete-collection.png"
                alt="Alle 21 Einundzwanzig Karten der Genesis Edition"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              Alle 21 Karten der Genesis Edition - Legenden der deutschen Bitcoin-Community
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Karten durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-brand text-orange-500">21</div>
              <div className="text-sm text-gray-600">Community Legenden</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-brand text-purple-500">210</div>
              <div className="text-sm text-gray-600">Karten pro Motiv</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-brand text-blue-500">4,410</div>
              <div className="text-sm text-gray-600">Karten insgesamt</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-brand text-yellow-500">21</div>
              <div className="text-sm text-gray-600">Holo-Karten</div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredCards.map((card) => (
            <Link key={card.id} href={`/cards/${card.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-yellow-200 via-orange-200 to-purple-200">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-brand text-lg mb-2">{card.name}</h3>
                  <div className="text-xs text-gray-500 mb-2">#{card.id.toString().padStart(3, "0")}</div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">210 Exemplare</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      <Sparkles className="mr-1 h-3 w-3" />
                      #21 Holo
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Keine Karten gefunden.</p>
          </div>
        )}
      </div>
    </div>
  )
}
