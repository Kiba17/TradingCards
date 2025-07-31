"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Settings,
  Trophy,
  Users,
  TrendingUp,
  Plus,
  Zap,
  Shield,
  Calendar,
  User,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "collection"
  const [activeTab, setActiveTab] = useState(initialTab)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const { user, isLoggedIn, updateProfile } = useAuth()
  const router = useRouter()

  // Form state for profile editing
  const [profileForm, setProfileForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: "",
    lightningAddress: user?.lightningAddress || "",
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || "",
        email: user.email || "",
        bio: "",
        lightningAddress: user.lightningAddress || "",
      })
    }
  }, [user])

  // Update tab from URL
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleSaveProfile = async () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      updateProfile({
        username: profileForm.username,
        email: profileForm.email,
        lightningAddress: profileForm.lightningAddress,
      })
      setSaving(false)
      setSaveSuccess(true)
      setIsEditing(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Nicht angemeldet</h1>
          <p className="text-muted-foreground mb-4">Du musst angemeldet sein, um dein Profil zu sehen.</p>
          <Link href="/login">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Zap className="mr-2 h-4 w-4" />
              Jetzt anmelden
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const ownedCards = [
    {
      id: 1,
      name: "Satoshi Genesis",
      image: "/placeholder.svg?height=200&width=150",
      number: "#001",
      serialNumber: 42,
      isHolo: false,
    },
    {
      id: 2,
      name: "Lightning Strike",
      image: "/placeholder.svg?height=200&width=150",
      number: "#156",
      serialNumber: 21,
      isHolo: true,
    },
    {
      id: 3,
      name: "HODL Master",
      image: "/placeholder.svg?height=200&width=150",
      number: "#023",
      serialNumber: 89,
      isHolo: false,
    },
  ]

  const activeTrades = [
    {
      id: 1,
      type: "Angebot erhalten",
      card: "Lightning Strike #156",
      offer: "HODL Master #089 + Blocktrainer #045",
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
      type: "Getauscht",
      card: "Block Explorer #067",
      traded: "Hash Power #089",
      partner: "SatoshiFan",
    },
    {
      id: 2,
      date: "2024-01-10",
      type: "Getauscht",
      card: "Wallet Guardian #123",
      traded: "Node Runner #045",
      partner: "HODLer2024",
    },
  ]

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950/50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Profil erfolgreich aktualisiert!
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Header */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{user.username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{user.username}</h1>
                <Badge
                  variant="secondary"
                  className={
                    user.loginMethod === "lightning"
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400"
                  }
                >
                  <Zap className="mr-1 h-3 w-3" />
                  {user.loginMethod === "lightning" ? "Lightning" : "Demo"} Login
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-orange-500">{ownedCards.length}</div>
                  <div className="text-sm text-muted-foreground">Karten</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{ownedCards.filter((c) => c.isHolo).length}</div>
                  <div className="text-sm text-muted-foreground">Holo-Karten</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{tradeHistory.length}</div>
                  <div className="text-sm text-muted-foreground">Trades</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">4.8</div>
                  <div className="text-sm text-muted-foreground">Bewertung</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Dabei seit {user.joinedAt.toLocaleDateString("de-DE")}
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Letzter Login: {user.lastLogin.toLocaleDateString("de-DE")}
                </div>
              </div>
            </div>

            <Button variant="outline" onClick={() => setActiveTab("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Einstellungen
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
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
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Einstellungen
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
                    <p className="text-sm text-muted-foreground mb-2">{card.number}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">#{card.serialNumber}/210</span>
                      {card.isHolo && (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-400"
                        >
                          Holo
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Card Placeholder */}
              <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-orange-500 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[300px]">
                  <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">Neue Karte hinzufügen</p>
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
                            <p className="text-sm text-muted-foreground">von {trade.user}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
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
                          <Badge variant="secondary">{trade.type}</Badge>
                          <span className="text-sm text-muted-foreground">{trade.date}</span>
                        </div>
                        <h4 className="font-semibold">{trade.card}</h4>
                        <p className="text-sm text-muted-foreground">
                          getauscht gegen {trade.traded} mit {trade.partner}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Profil bearbeiten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Benutzername</Label>
                    <Input
                      id="username"
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lightning">Lightning Adresse</Label>
                    <Input
                      id="lightning"
                      value={profileForm.lightningAddress}
                      onChange={(e) => setProfileForm({ ...profileForm, lightningAddress: e.target.value })}
                      disabled={!isEditing}
                      placeholder="user@lightning.node"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Erzähle etwas über dich..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline">
                        <User className="mr-2 h-4 w-4" />
                        Bearbeiten
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleSaveProfile} disabled={isSaving}>
                          {isSaving ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Speichern...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Speichern
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Abbrechen
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Informationen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Login Methode</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        user.loginMethod === "lightning"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400"
                      }
                    >
                      <Zap className="mr-1 h-3 w-3" />
                      {user.loginMethod === "lightning" ? "Lightning Network" : "Demo Modus"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Mitglied seit</span>
                    </div>
                    <span className="text-sm font-medium">{user.joinedAt.toLocaleDateString("de-DE")}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Letzter Login</span>
                    </div>
                    <span className="text-sm font-medium">{user.lastLogin.toLocaleDateString("de-DE")}</span>
                  </div>

                  {user.lightningAddress && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Lightning Adresse</span>
                      </div>
                      <span className="text-sm font-medium font-mono">{user.lightningAddress}</span>
                    </div>
                  )}

                  {user.loginMethod === "lightning" && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Du bist über das Lightning Network angemeldet. Deine Identität ist durch kryptographische
                        Signaturen gesichert.
                      </AlertDescription>
                    </Alert>
                  )}

                  {user.loginMethod === "demo" && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Du nutzt den Demo-Modus. Für vollständige Funktionen melde dich mit Lightning an.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
