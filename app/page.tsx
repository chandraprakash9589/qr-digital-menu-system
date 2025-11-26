"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, QrCode, RefreshCw } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f7f9fc] to-[#eef3fb] text-slate-900">
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* hero card */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden">
            <div className="md:flex md:items-center">
              {/* Text column */}
              <div className="px-6 py-10 md:w-2/3">
                <div className="inline-flex items-center gap-3 rounded-full bg-indigo-50 px-3 py-1 mb-4 w-max">
                  <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">DM</div>
                  <span className="text-sm text-indigo-700 font-medium">Digital Menu Management</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
                  Digital Menu Management System
                </h1>

                <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl">
                  Manage your restaurant menus digitally — share via QR codes or links. No printing, no hassle. Update items, prices, and availability in real time across every channel.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link href="/auth/login" aria-label="Sign in">
                    <Button size="lg" className="px-8 shadow-sm bg-indigo-600 hover:bg-indigo-700 border-0">
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/auth/register" aria-label="Create account">
                    <Button size="lg" variant="outline" className="px-8">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right small feature panel (visual only) */}
              <div className="px-6 py-8 md:w-1/3 bg-gradient-to-b from-white to-indigo-50">
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-900">Quick preview</h4>
                  <p className="mt-2 text-xs text-slate-500">Example menu snapshot — no action.</p>

                  <div className="mt-4 rounded-md border border-green-200 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Shriman Indore</div>
                        <div className="text-xs text-slate-500">Indore, India</div>
                      </div>
                      <div className="text-xs text-slate-600">2 categories</div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Paneer Tikka</div>
                        <div className="text-sm font-semibold">₹220</div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Link href="/dashboard">
                          <Button size="sm" className="px-3 bg-green-500 hover:bg-green-600 border-0">Manage</Button>
                        </Link>
                        <Link href="/menu/preview">
                          <Button size="sm" variant="outline" className="px-3">Preview</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2">
                  <Badge icon={<QrCode className="w-4 h-4" />} text="QR Ready" />
                  <Badge icon={<RefreshCw className="w-4 h-4" />} text="Real-time" />
                </div>
              </div>
            </div>
          </div>

          {/* features */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard
              title="Easy Setup"
              desc="Create restaurants and manage multiple menus in minutes. Clean UI, role-based access, and import/export support."
              icon={<Star className="w-5 h-5" />}
            />

            <FeatureCard
              title="QR Code Sharing"
              desc="Generate unique QR codes per menu — print or show on screens. Built-in short links for easy sharing."
              icon={<QrCode className="w-5 h-5" />}
            />

            <FeatureCard
              title="Real-Time Updates"
              desc="Change prices, availability, and descriptions instantly — reflected everywhere in seconds."
              icon={<RefreshCw className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

/* small helpers (visual only, same text/content as before) */

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-100 px-3 py-1 text-xs shadow-sm">
      <span className="text-slate-600">{icon}</span>
      <span className="text-slate-700">{text}</span>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  desc: string
  icon: React.ReactNode
}

function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>
        <div>
          <h3 className="text-md font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  )
}
