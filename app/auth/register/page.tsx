"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    country: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        return
      }

      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f7fafc] to-[#eef2f7] p-6">
      <div className="w-full max-w-2xl transform transition-all duration-300 ease-out">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">Create your Digital Menu account</h2>
          <p className="mt-2 text-sm text-slate-600">Sign up to manage menus, generate QR codes and update items in real time.</p>
        </div>

        <Card className="overflow-hidden">
          <div className="">
            <div className="hidden md:block bg-[url('/assets/register-illustration.svg')] bg-cover bg-center" />

            <CardContent className="p-8 py-0">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Create Account</CardTitle>
                <CardDescription>Join Digital Menu to manage your restaurant</CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <Input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="India"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>

                {error && <div className="text-sm text-destructive">{error}</div>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 font-semibold rounded-lg shadow-md"
                  style={{ backgroundColor: '#0f766e', borderColor: '#0f766e', color: 'white' }}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>

                <div className="flex items-center gap-2 justify-center">
                  <span className="h-px w-24 bg-slate-200" />
                  <span className="text-xs text-slate-400">or</span>
                  <span className="h-px w-24 bg-slate-200" />
                </div>

                <Link href="/auth/login" className="block text-center text-sm text-[#0f766e] hover:underline" >Already have an account? Sign in</Link>
              </form>
            </CardContent>
          </div>
        </Card>

        <p className="mt-4 text-xs text-slate-500 text-center">By creating an account you agree to our Terms and Privacy Policy.</p>
      </div>
    </div>
  )
}
