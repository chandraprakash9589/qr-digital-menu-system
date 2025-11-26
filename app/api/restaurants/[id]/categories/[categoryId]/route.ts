import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string; categoryId: string }> }) {
  const { id, categoryId } = await params

  try {
    const category = await db.category.findFirst({ where: { id: categoryId, restaurantId: id } })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Fetch category error:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string; categoryId: string }> }) {
  const { id, categoryId } = await params

  try {
    const user = await getSession()
    console.debug('[PUT] User session:', user?.id)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const restaurant = await db.restaurant.findUnique({ where: { id } })
    console.debug('[PUT] Restaurant lookup result:', JSON.stringify(restaurant))
    if (!restaurant || restaurant.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    let payload: any
    try {
      payload = await req.json()
      console.debug('[PUT] Parsed body:', JSON.stringify(payload))
    } catch (parseErr) {
      console.error('[PUT] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { name } = payload
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    try {
      const updated = await db.category.update({ where: { id: categoryId }, data: { name } })
      console.debug('[PUT] Update successful, result:', JSON.stringify(updated))
      return NextResponse.json(updated)
    } catch (dbErr) {
      console.error('[PUT] DB update error:', dbErr instanceof Error ? dbErr.stack ?? dbErr.message : dbErr)
      throw dbErr
    }
  } catch (error) {
    console.error("Update category error:", error instanceof Error ? error.stack ?? error.message : error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string; categoryId: string }> }) {
  const { id, categoryId } = await params
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const restaurant = await db.restaurant.findUnique({
      where: { id },
    })

    if (!restaurant || restaurant.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete associated dish-category relationships first
    await db.dishCategory.deleteMany({
      where: { categoryId },
    })

    await db.category.delete({
      where: { id: categoryId },
    })

    return NextResponse.json({ message: "Category deleted" })
  } catch (error) {
    console.error("Delete category error:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
