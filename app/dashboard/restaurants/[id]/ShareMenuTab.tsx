"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ShareMenuProps {
  restaurantId: string
  baseUrl: string
}

export default function ShareMenuTab({ restaurantId, baseUrl }: ShareMenuProps) {
  const menuUrl = `${baseUrl}/menu/${restaurantId}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(menuUrl)}`

  const handleDownloadQR = () => {
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `menu-qr-${restaurantId}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl)
    alert("Link copied to clipboard!")
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-6 max-w-3xl">
        {/* QR Code Card */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <p className="text-sm text-muted-foreground">Customers can scan this QR code to view your menu</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center p-6 bg-muted rounded-lg border">
              <img 
                src={qrCodeUrl}
                alt="Menu QR Code" 
                className="w-64 h-64" 
              />
            </div>
            <Button onClick={handleDownloadQR} className="w-full">
              Download QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Shared Link Card */}
        <Card>
          <CardHeader>
            <CardTitle>Shareable Link</CardTitle>
            <p className="text-sm text-muted-foreground">Share this link directly with your customers</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg break-all text-sm font-mono">
              {menuUrl}
            </div>
            <Button onClick={handleCopyLink} className="w-full">
              Copy Link
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
