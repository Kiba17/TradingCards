"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Trophy, Users, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("collection")

  const userStats = {
    name: "BitcoinMaxi",
    avatar: "/placeholder.svg?height=80&width=80",
    cardsOwned: 23,
    totalValue: "0.156 BTC",
    completedTrades: 12,
    reputation: 4.8,
  }

  const ownedCards = [
    {
      id: 1,
      name: "Satoshi Genesis",
      rarity: "Legendary",
      image: "/placeholder.svg?height=200&width=150",
      number: "#001",
      value: "0.025 BTC",
    },
    {
      id: 2,
      name: "Lightning Strike",
      rarity: "Epic",
      image: "/placeholder.svg?height=200&width=150",
      number: "#156",
      value: "0.015 BTC",
    },
    {
      id: 3,
      name: "HODL Master",
      rarity: "Rare",
      image: "/placeholder.svg?height=200&width=150",
      number: "#023",
      value: "0.008 BTC",
    },
    {
      id: 4,
      name: "Mining Rig",
      rarity: "Common",
      image: "/placeholder.svg?height=200&width=150",
      number: "#187",
      value: "0.003 BTC",
    },
  ]

  const activeTrades = [
    {
      id: 1,
      type: "Angebot erhalten",
      card: "Lightning Strike #156",
      offer: "HODL Master #089 + 0.002 BTC",
      user: "CardTrader",
      status: "pending",
    },
    {
      id: 2,
      type: "Angebot gesendet",
      card: "Mining Rig #187",
      offer: "Node Runner #045",
      user: "Collector21",
      status: "waiting",
    },
  ]

  const tradeHistory = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Verkauft",
      card: "Block Explorer #067",
      price: "0.007 BTC",
      buyer: "SatoshiFan",
    },
    {
      id: 2,
      date: "2024-01-10",
      type: "Getauscht",
      card: "Wallet Guardian #123",
      traded: "Hash Power #089",
      partner: "HODLer2024",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userStats.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{userStats.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userStats.name}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-orange-500">{userStats.cardsOwned}</div>
                  <div className="text-sm text-gray-600">Karten</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{userStats.totalValue}</div>
                  <div className="text-sm text-gray-600">Gesamtwert</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{userStats.completedTrades}</div>
                  <div className="text-sm text-gray-600">Trades</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{userStats.reputation}</div>
                  <div className="text-sm text-gray-600">Bewertung</div>
                </div>
              </div>
            </div>

            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Einstellungen
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="collection">
              <Trophy className="mr-2 h-4 w-4" />
              Sammlung
            </TabsTrigger>
            <TabsTrigger value="trades">
              <Users className="mr-2 h-4 w-4" />
              Trades
            </TabsTrigger>
            <TabsTrigger value="history">
              <TrendingUp className="mr-2 h-4 w-4" />
              Verlauf
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ownedCards.map((card) => (
                <Card key={card.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={card.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{card.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{card.number}</p>
                    <div className="flex justify-between items-center">
                      <Badge
                        variant="secondary"
                        className={`${
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
                      <span className="font-semibold text-orange-600">{card.value}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Card Placeholder */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[300px]">
                  <Plus className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">Neue Karte hinzufügen</p>
                  <Link href="/cards">
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Karten durchsuchen
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trades" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aktive Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeTrades.map((trade) => (
                      <div key={trade.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <Badge variant={trade.status === "pending" ? "default" : "secondary"}>{trade.type}</Badge>
                            <h4 className="font-semibold mt-2">{trade.card}</h4>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">von {trade.user}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Angebot:</strong> {trade.offer}
                        </p>
                        <div className="flex gap-2">
                          {trade.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                Akzeptieren
                              </Button>
                              <Button size="sm" variant="outline">
                                Ablehnen
                              </Button>
                            </>
                          )}
                          {trade.status === "waiting" && (
                            <Button size="sm" variant="outline" disabled>
                              Warte auf Antwort
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Trade Verlauf</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradeHistory.map((trade) => (
                    <div key={trade.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={trade.type === "Verkauft" ? "default" : "secondary"}>{trade.type}</Badge>
                          <span className="text-sm text-gray-500">{trade.date}</span>
                        </div>
                        <h4 className="font-semibold">{trade.card}</h4>
                        {trade.type === "Verkauft" ? (
                          <p className="text-sm text-gray-600">an {trade.buyer}</p>
                        ) : (
                          <p className="text-sm text-gray-600">
                            getauscht gegen {trade.traded} mit {trade.partner}
                          </p>
                        )}
                      </div>
                      {trade.price && (
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{trade.price}</div>
                        </div>
                      )}
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
