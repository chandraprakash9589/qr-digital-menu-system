"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/auth/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-pulse text-xl font-medium text-gray-700">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => pathname === href;
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top nav */}
      <header className="w-full bg-white shadow-sm  sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  DM
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-semibold">DigitalMenu</div>
                  <div className="text-xs text-gray-500">
                    Digital Menu Management
                  </div>
                </div>
              </Link>

              {/* Desktop nav links */}
              <nav className="hidden md:flex items-center gap-6 ml-6">
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium ${isActive("/dashboard") ? "text-gray-900" : "text-gray-600 hover:text-gray-800"}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={`text-sm font-medium ${isActive("/dashboard/settings") ? "text-gray-900" : "text-gray-600 hover:text-gray-800"}`}
                >
                  Settings
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 bg-white p-6 border-r border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <Link href="/dashboard" className="font-semibold text-lg">
                DigiMenu
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setMobileOpen(false)}
              >
                <Button variant="ghost" className="w-full justify-start">
                  Settings
                </Button>
              </Link>
            </nav>

            <div className="mt-6">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Page content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back — here's what's happening with your menus today.
              </p>
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
