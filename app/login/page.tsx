"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, QrCode, ArrowRight, CheckCircle, AlertCircle, Copy, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

// Mock Lightning Invoice für Demo
const generateMockInvoice = () => {
  return "lnbc1500n1pn2s39kpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5vdhkven9v5sxyetpdeessp5zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zygs9q5sqqqqqqqqqqqqqqqpqsq67gye39hfg3zd8rgc80k32tvy9xk2xunpwd5xzmnwvycz6atv9kkernvqwdvh8xtpdpskjepq3dqrwkvsp5zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zygs9q5sqqqqqqqqqqqqqqqpqsqjrwfn3p9278ttzzpe0e00uhyxhned3j5d9acqak5emwfpflp8z2cnflc7jtzrcazrra7wwgzxqc8u7754cdlpfrmccae92qgzqvzq2ps8pqqqqqqqqqqqq9qqqvpeuqafqxu92d8lr6fvg0r5gv0heeeqgcrqlnm6jhphu9y00rrhy4grqszsvpcgpy9qqqqqqgqqqqq7qqzq"
}

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"lightning" | "demo">("lightning")
  const [lightningInvoice, setLightningInvoice] = useState("")
  const [qrCodeData, setQrCodeData] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid" | "expired" | null>(null)
  const [webLNAvailable, setWebLNAvailable] = useState(false)
  const [copied, setCopied] = useState(false)
  const [demoUsername, setDemoUsername] = useState("DemoUser")
  const router = useRouter()
  const { login } = useAuth()

  // Check for WebLN availability
  useEffect(() => {
    if (typeof window !== "undefined" && window.webln) {
      setWebLNAvailable(true)
    }
  }, [])

  const generateLightningInvoice = async () => {
    setIsConnecting(true)

    // Simulate API call to generate Lightning invoice
    setTimeout(() => {
      const invoice = generateMockInvoice()
      setLightningInvoice(invoice)
      setQrCodeData(`lightning:${invoice}`)
      setPaymentStatus("pending")
      setIsConnecting(false)

      // Simulate payment detection after 10 seconds for demo
      setTimeout(() => {
        setPaymentStatus("paid")
        // Login with Lightning method
        login("lightning", {
          username: "Lightning User",
          lightningAddress: "user@lightning.node",
        })
        setTimeout(() => {
          router.push("/profile")
        }, 2000)
      }, 10000)
    }, 1500)
  }

  const handleWebLNPayment = async () => {
    if (!window.webln) {
      alert("WebLN ist nicht verfügbar. Bitte installiere eine Lightning Wallet mit WebLN Support.")
      return
    }

    try {
      await window.webln.enable()
      const invoice = generateMockInvoice()
      await window.webln.sendPayment(invoice)
      setPaymentStatus("paid")
      // Login with Lightning method
      login("lightning", {
        username: "WebLN User",
        lightningAddress: "webln@user.node",
      })
      setTimeout(() => {
        router.push("/profile")
      }, 1000)
    } catch (error) {
      console.error("WebLN payment failed:", error)
      alert("Lightning Zahlung fehlgeschlagen. Bitte versuche es erneut.")
    }
  }

  const copyInvoice = async () => {
    if (lightningInvoice) {
      await navigator.clipboard.writeText(lightningInvoice)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDemoLogin = () => {
    login("demo", {
      username: demoUsername || "Demo User",
      email: "demo@einundzwanzig.space",
    })
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/20 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Willkommen zurück</h1>
          <p className="text-muted-foreground">Melde dich mit Lightning an oder nutze den Demo-Modus</p>
        </div>

        <div className="space-y-4">
          {/* Lightning Login */}
          <Card
            className={`cursor-pointer transition-all ${loginMethod === "lightning" ? "ring-2 ring-orange-500" : ""}`}
            onClick={() => setLoginMethod("lightning")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
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
                  {!lightningInvoice ? (
                    <>
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <QrCode className="h-24 w-24 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Klicke auf "Lightning Invoice erstellen" um zu beginnen
                        </p>
                      </div>
                      <div className="space-y-2">
                        {webLNAvailable && (
                          <Button
                            onClick={handleWebLNPayment}
                            disabled={isConnecting}
                            className="w-full bg-orange-500 hover:bg-orange-600"
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            Mit WebLN bezahlen
                          </Button>
                        )}
                        <Button
                          onClick={generateLightningInvoice}
                          disabled={isConnecting}
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          {isConnecting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                              Erstelle Invoice...
                            </>
                          ) : (
                            <>
                              <QrCode className="mr-2 h-4 w-4" />
                              Lightning Invoice erstellen
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      {paymentStatus === "pending" && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Warte auf Lightning Zahlung... (Demo: automatisch in 10 Sekunden)
                          </AlertDescription>
                        </Alert>
                      )}

                      {paymentStatus === "paid" && (
                        <Alert className="border-green-500 bg-green-50 dark:bg-green-950/50">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertDescription className="text-green-700 dark:text-green-400">
                            Zahlung erfolgreich! Weiterleitung...
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* QR Code Display */}
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                        <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                          {/* In a real app, you'd use a QR code library like qrcode.js */}
                          <div className="text-xs text-center p-4 border-2 border-dashed border-gray-300 rounded">
                            QR Code für
                            <br />
                            Lightning Invoice
                            <br />
                            <small className="text-gray-500">{lightningInvoice.substring(0, 20)}...</small>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Scanne mit deiner Lightning Wallet</p>
                      </div>

                      {/* Invoice Actions */}
                      <div className="space-y-2">
                        <Button onClick={copyInvoice} variant="outline" className="w-full bg-transparent">
                          <Copy className="mr-2 h-4 w-4" />
                          {copied ? "Kopiert!" : "Invoice kopieren"}
                        </Button>

                        <Button
                          onClick={() => window.open(`lightning:${lightningInvoice}`, "_blank")}
                          variant="outline"
                          className="w-full"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          In Lightning App öffnen
                        </Button>
                      </div>

                      {/* Invoice Details */}
                      <div className="text-xs text-muted-foreground bg-muted p-3 rounded font-mono break-all">
                        {lightningInvoice}
                      </div>
                    </div>
                  )}
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
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
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
                    <Input
                      id="username"
                      placeholder="Gib einen Benutzernamen ein"
                      value={demoUsername}
                      onChange={(e) => setDemoUsername(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleDemoLogin} className="w-full bg-transparent" variant="outline">
                    Demo starten
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
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
