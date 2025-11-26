import { db } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    // Fetch restaurant with all categories and their associated dishes
    const restaurant = await db.restaurant.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        location: true,
        categories: {
          select: {
            id: true,
            name: true,
            dishes: {
              select: {
                dishId: true,
              },
            },
          },
        },
      },
    })

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }

    // Fetch all dishes for this restaurant
    const allDishes = await db.dish.findMany({
      where: { restaurantId: id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        spiceLevel: true,
        categories: {
          select: {
            categoryId: true,
          },
        },
      },
    })

    // Build a map for quick lookup
    const dishMap = new Map(allDishes.map((d) => [d.id, d]))

    // Transform categories to include their dishes
    const categoriesWithDishes = restaurant.categories.map((category) => ({
      id: category.id,
      name: category.name,
      dishes: category.dishes
        .map((dc) => dishMap.get(dc.dishId))
        .filter((d) => d !== undefined) as typeof allDishes,
    }))

    return NextResponse.json({
      id: restaurant.id,
      name: restaurant.name,
      location: restaurant.location,
      categories: categoriesWithDishes,
    })
  } catch (error) {
    console.error("Fetch menu error:", error)
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 })
  }
}
