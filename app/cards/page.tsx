"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import Link from "next/link"

export default function CardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [rarityFilter, setRarityFilter] = useState("all")

  const cards = [
    {
      id: 1,
      name: "Satoshi Genesis",
      rarity: "Legendary",
      image: "/placeholder.svg?height=300&width=200",
      owned: 5,
      total: 210,
      price: "0.021 BTC",
    },
    {
      id: 2,
      name: "Lightning Strike",
      rarity: "Epic",
      image: "/placeholder.svg?height=300&width=200",
      owned: 12,
      total: 210,
      price: "0.015 BTC",
    },
    {
      id: 3,
      name: "HODL Master",
      rarity: "Rare",
      image: "/placeholder.svg?height=300&width=200",
      owned: 23,
      total: 210,
      price: "0.008 BTC",
    },
    {
      id: 4,
      name: "Mining Rig",
      rarity: "Common",
      image: "/placeholder.svg?height=300&width=200",
      owned: 45,
      total: 210,
      price: "0.003 BTC",
    },
    {
      id: 5,
      name: "Block Explorer",
      rarity: "Rare",
      image: "/placeholder.svg?height=300&width=200",
      owned: 18,
      total: 210,
      price: "0.007 BTC",
    },
    {
      id: 6,
      name: "Wallet Guardian",
      rarity: "Epic",
      image: "/placeholder.svg?height=300&width=200",
      owned: 9,
      total: 210,
      price: "0.012 BTC",
    },
    {
      id: 7,
      name: "Node Runner",
      rarity: "Common",
      image: "/placeholder.svg?height=300&width=200",
      owned: 67,
      total: 210,
      price: "0.004 BTC",
    },
    {
      id: 8,
      name: "Hash Power",
      rarity: "Rare",
      image: "/placeholder.svg?height=300&width=200",
      owned: 31,
      total: 210,
      price: "0.009 BTC",
    },
    {
      id: 9,
      name: "Proof of Work",
      rarity: "Epic",
      image: "/placeholder.svg?height=300&width=200",
      owned: 7,
      total: 210,
      price: "0.016 BTC",
    },
  ]

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = rarityFilter === "all" || card.rarity.toLowerCase() === rarityFilter
    return matchesSearch && matchesRarity
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Genesis Edition Karten</h1>
          <p className="text-gray-600 mb-6">
            Entdecke alle 21 einzigartigen Motive der Genesis Edition. Jede Karte ist 210 mal verfügbar.
          </p>

          {/* Filters */}
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
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Seltenheit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Seltenheiten</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="common">Common</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <Link key={card.id} href={`/cards/${card.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
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
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {card.owned}/{card.total} im Umlauf
                    </span>
                    <span className="font-semibold text-orange-600">{card.price}</span>
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
