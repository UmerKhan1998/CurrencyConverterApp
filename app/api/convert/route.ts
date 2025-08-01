import { type NextRequest, NextResponse } from "next/server"

const API_KEY = "4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2"
const BASE_URL = "https://api.freecurrencyapi.com/v1"

interface ConvertRequest {
  from: string
  to: string
  amount: number
}

export async function POST(request: NextRequest) {
  try {
    const body: ConvertRequest = await request.json()
    const { from, to, amount } = body

    if (!from || !to || !amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request parameters",
        },
        { status: 400 },
      )
    }

    // Get latest exchange rates
    const response = await fetch(`${BASE_URL}/latest?apikey=${API_KEY}&currencies=${to}&base_currency=${from}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.data || !data.data[to]) {
      throw new Error("Invalid currency conversion data")
    }

    const rate = data.data[to]
    const result = amount * rate

    return NextResponse.json({
      success: true,
      result: result,
      rate: rate,
      from: from,
      to: to,
      amount: amount,
    })
  } catch (error) {
    console.error("Error converting currency:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to convert currency",
      },
      { status: 500 },
    )
  }
}
