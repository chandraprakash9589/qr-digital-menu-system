"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditCategoryPage({ params }: { params: { id: string; categoryId: string } }) {
  const { id, categoryId } = params
  const router = useRouter()
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/restaurants/${id}/categories/${categoryId}`)
        if (!res.ok) {
          setError("Failed to load category")
          return
        }
        const data = await res.json()
        setName(data.name || "")
      } catch (err) {
        setError("Failed to load category")
      } finally {
        setLoading(false)
      }
    }

    fetchCategory()
  }, [id, categoryId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const response = await fetch(`/api/restaurants/${id}/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Failed to update category")
        return
      }

      router.push(`/dashboard/restaurants/${id}`)
    } catch (err) {
      setError("An error occurred")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Category</CardTitle>
          <CardDescription>Update category name</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name</label>
              <Input required value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
