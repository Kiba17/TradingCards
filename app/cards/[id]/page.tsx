"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, Share2, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"

export default function CardDetailPage({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)

  // Mock data - in real app this would come from API
  const card = {
    id: Number.parseInt(params.id),
    name: "Satoshi Genesis",
    rarity: "Legendary",
    image: "/placeholder.svg?height=600&width=400",
    description:
      "Die legendäre Satoshi Genesis Karte ehrt den mysteriösen Schöpfer von Bitcoin. Diese seltene Karte zeigt das ikonische Bitcoin-Symbol in goldener Prägung.",
    owned: 5,
    total: 210,
    floorPrice: "0.021 BTC",
    attributes: [
      { trait: "Edition", value: "Genesis" },
      { trait: "Artist", value: "Einundzwanzig Team" },
      { trait: "Year", value: "2024" },
      { trait: "Material", value: "Premium Cardstock" },
    ],
  }

  const owners = [
    {
      id: 1,
      name: "BitcoinMaxi",
      avatar: "/placeholder.svg?height=40&width=40",
      cardNumber: "#001",
      price: "0.025 BTC",
    },
    {
      id: 2,
      name: "SatoshiFan",
      avatar: "/placeholder.svg?height=40&width=40",
      cardNumber: "#042",
      price: "0.023 BTC",
    },
    {
      id: 3,
      name: "HODLer2024",
      avatar: "/placeholder.svg?height=40&width=40",
      cardNumber: "#089",
      price: "0.022 BTC",
    },
  ]

  const tradeOffers = [
    {
      id: 1,
      user: "CardTrader",
      avatar: "/placeholder.svg?height=40&width=40",
      offering: "Lightning Strike #156 + 0.005 BTC",
      wants: "Satoshi Genesis",
    },
    {
      id: 2,
      user: "Collector21",
      avatar: "/placeholder.svg?height=40&width=40",
      offering: "HODL Master #023 + Mining Rig #187",
      wants: "Satoshi Genesis",
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
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-white shadow-lg">
              <img src={card.image || "/placeholder.svg"} alt={card.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Card Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {card.rarity}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{card.name}</h1>
              <p className="text-gray-600 mb-4">{card.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-500">Im Umlauf</div>
                <div className="text-2xl font-bold">
                  {card.owned}/{card.total}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-500">Floor Price</div>
                <div className="text-2xl font-bold text-orange-600">{card.floorPrice}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Kaufen
              </Button>
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
                <div className="grid grid-cols-2 gap-4">
                  {card.attributes.map((attr, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
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
                          <div className="text-sm text-gray-500">{owner.cardNumber}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-orange-600">{owner.price}</div>
                        <Button size="sm" variant="outline">
                          Kaufen
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
