import { NextResponse } from "next/server"

const API_KEY = "4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2"
const BASE_URL = "https://api.freecurrencyapi.com/v1"

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/currencies?apikey=${API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Transform the data to extract currency names properly
    const transformedData: Record<string, string> = {}

    if (data.data) {
      Object.entries(data.data).forEach(([code, details]: [string, any]) => {
        transformedData[code] = details.name || details.name_plural || code
      })
    }

    return NextResponse.json({
      success: true,
      data: transformedData,
    })
  } catch (error) {
    console.error("Error fetching currencies:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch currencies",
      },
      { status: 500 },
    )
  }
}
