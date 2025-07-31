"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, QrCode, Smartphone, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"lightning" | "demo">("lightning")
  const router = useRouter()

  const handleLightningLogin = async () => {
    setIsConnecting(true)
    // Simulate Lightning login process
    setTimeout(() => {
      setIsConnecting(false)
      router.push("/profile")
    }, 2000)
  }

  const handleDemoLogin = () => {
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Willkommen zurück</h1>
          <p className="text-gray-600">Melde dich mit Lightning an oder nutze den Demo-Modus</p>
        </div>

        <div className="space-y-4">
          {/* Lightning Login */}
          <Card
            className={`cursor-pointer transition-all ${loginMethod === "lightning" ? "ring-2 ring-orange-500" : ""}`}
            onClick={() => setLoginMethod("lightning")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Lightning Login</CardTitle>
                  <CardDescription>Sichere Anmeldung über das Lightning Network</CardDescription>
                </div>
              </div>
            </CardHeader>
            {loginMethod === "lightning" && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <QrCode className="h-24 w-24 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Scanne den QR-Code mit deiner Lightning Wallet</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-3">Oder öffne den Link in deiner Lightning App</p>
                    <Button
                      onClick={handleLightningLogin}
                      disabled={isConnecting}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      {isConnecting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Verbinde...
                        </>
                      ) : (
                        <>
                          <Smartphone className="mr-2 h-4 w-4" />
                          Lightning App öffnen
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Demo Login */}
          <Card
            className={`cursor-pointer transition-all ${loginMethod === "demo" ? "ring-2 ring-orange-500" : ""}`}
            onClick={() => setLoginMethod("demo")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Demo Modus</CardTitle>
                  <CardDescription>Teste die Plattform ohne Lightning Wallet</CardDescription>
                </div>
              </div>
            </CardHeader>
            {loginMethod === "demo" && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Demo Benutzername</Label>
                    <Input id="username" placeholder="Gib einen Benutzernamen ein" defaultValue="DemoUser" />
                  </div>
                  <Button onClick={handleDemoLogin} className="w-full bg-transparent" variant="outline">
                    Demo starten
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Neu hier?{" "}
            <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
              Erfahre mehr über Lightning Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
