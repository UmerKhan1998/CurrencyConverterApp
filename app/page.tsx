"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import SoftGradientLeft from "@/components/ui/soft-gradient-left"
import SoftGradientRight from "@/components/ui/soft-gradient-right"
import { ArrowUpDown, Clock, Loader2, RefreshCw } from "lucide-react"

interface Currency {
  code: string
  name: string
}

interface ConversionRecord {
  id: string
  fromCurrency: string
  toCurrency: string
  amount: number
  result: number
  rate: number
  timestamp: string
}

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [fromCurrency, setFromCurrency] = useState<string>("")
  const [toCurrency, setToCurrency] = useState<string>("")
  const [amount, setAmount] = useState<string>("1")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [currenciesLoading, setCurrenciesLoading] = useState<boolean>(true)
  const [conversionHistory, setConversionHistory] = useState<ConversionRecord[]>([])

  // Load currencies on component mount
  useEffect(() => {
    fetchCurrencies()
    loadConversionHistory()
  }, [])

  // Load conversion history from localStorage
  const loadConversionHistory = () => {
    try {
      const saved = localStorage.getItem("conversionHistory")
      if (saved) {
        setConversionHistory(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Error loading conversion history:", error)
    }
  }

  // Save conversion history to localStorage
  const saveConversionHistory = (history: ConversionRecord[]) => {
    try {
      localStorage.setItem("conversionHistory", JSON.stringify(history))
    } catch (error) {
      console.error("Error saving conversion history:", error)
    }
  }

  // Fetch available currencies
  const fetchCurrencies = async () => {
    try {
      setCurrenciesLoading(true)
      const response = await fetch("/api/currencies")
      const data = await response.json()

      if (data.success) {
        const currencyList = Object.entries(data.data).map(([code, details]: [string, any]) => ({
          code,
          name: details.name || details.name_plural || code,
        }))
        setCurrencies(currencyList)

        // Set default currencies
        if (currencyList.length > 0) {
          setFromCurrency("USD")
          setToCurrency("EUR")
        }
      }
    } catch (error) {
      console.error("Error fetching currencies:", error)
    } finally {
      setCurrenciesLoading(false)
    }
  }

  // Convert currency
  const convertCurrency = async () => {
    if (!fromCurrency || !toCurrency || !amount || Number.parseFloat(amount) <= 0) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromCurrency,
          to: toCurrency,
          amount: Number.parseFloat(amount),
        }),
      })

      const data = await response.json()

      if (data.success) {
        const convertedAmount = data.result
        const rate = data.rate
        setResult(convertedAmount)

        // Add to conversion history
        const newRecord: ConversionRecord = {
          id: Date.now().toString(),
          fromCurrency,
          toCurrency,
          amount: Number.parseFloat(amount),
          result: convertedAmount,
          rate,
          timestamp: new Date().toISOString(),
        }

        const updatedHistory = [newRecord, ...conversionHistory].slice(0, 20) // Keep last 20 records
        setConversionHistory(updatedHistory)
        saveConversionHistory(updatedHistory)
      }
    } catch (error) {
      console.error("Error converting currency:", error)
    } finally {
      setLoading(false)
    }
  }

  // Swap currencies
  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    setResult(null)
  }

  // Format date for display
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  // Format currency for display
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <SoftGradientLeft />
      <SoftGradientRight />
      <div className="relative z-1 mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Currency Converter</h1>
          <p className="text-gray-600">Convert currencies with real-time exchange rates</p>
        </div>

        {/* Main Converter Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Convert Currency
            </CardTitle>
            <CardDescription>Enter an amount and select currencies to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                className="text-lg"
              />
            </div>

            {/* Currency Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* From Currency */}
              <div className="space-y-2">
                <Label htmlFor="from-currency">From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency} disabled={currenciesLoading}>
                  <SelectTrigger id="from-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCurrencies}
                  disabled={currenciesLoading}
                  className="h-10 w-10 bg-transparent"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              {/* To Currency */}
              <div className="space-y-2">
                <Label htmlFor="to-currency">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency} disabled={currenciesLoading}>
                  <SelectTrigger id="to-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Convert Button */}
            <Button
              onClick={convertCurrency}
              disabled={loading || currenciesLoading || !fromCurrency || !toCurrency || !amount}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert"
              )}
            </Button>

            {/* Result Display */}
            {result !== null && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-center space-y-2">
                  <p className="text-sm text-green-600">Conversion Result</p>
                  <p className="text-2xl font-bold text-green-800">{formatCurrency(result, toCurrency)}</p>
                  <p className="text-sm text-green-600">
                    {amount} {fromCurrency} = {result.toFixed(6)} {toCurrency}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversion History */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Conversion History
            </CardTitle>
            <CardDescription>Your recent currency conversions</CardDescription>
          </CardHeader>
          <CardContent>
            {conversionHistory.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No conversions yet. Make your first conversion above!</p>
            ) : (
              <div className="space-y-3">
                {conversionHistory.map((record) => (
                  <div
                    key={record.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <Badge variant="outline" className="w-fit">
                        {record.fromCurrency} → {record.toCurrency}
                      </Badge>
                      <span className="text-sm font-medium">
                        {formatCurrency(record.amount, record.fromCurrency)} ={" "}
                        {formatCurrency(record.result, record.toCurrency)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{formatDate(record.timestamp)}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
