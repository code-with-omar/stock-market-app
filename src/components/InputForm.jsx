"use client";

import { useStockContext } from "@/context/StockContext";
import { useState } from "react";

const usStocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc.(Google class A)" },
  { symbol: "GOOG", name: "Alphabet Inc.(Google class C)" },
  { symbol: "AMZN", name: "Amazon.com, Inc." },
  { symbol: "TSLA", name: "Tesla, Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NFLX", name: "Netflix Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "INTC", name: "Intel Corporation" },
  { symbol: "AMD", name: "Advanced Micro Devices" },
  { symbol: "BRK.B", name: "Brakshire Hathaway Inc" },
  { symbol: "BAC", name: "Bank of America" },
  { symbol: "V", name: "Visa Inc" },
  { symbol: "MA", name: "Mastercard Inc" },
  { symbol: "DIS", name: "The Walt Disney Company" },
  { symbol: "WMT", name: "Walmart Inc" },
  { symbol: "NKE", name: "Nike Inc" },
];

export default function SearchBar() {
  const { setSymbol, setData, setError, loading, setLoading } =
    useStockContext();
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const handleSearch = async () => {
    if (!selectedSymbol) {
      setError("Please select a stock symbol.");
      return;
    }

    setLoading(true);
    try {
      setError("");
      const res = await fetch(`/api/stock?symbol=${selectedSymbol}`);
      const data = await res.json();

      if (data.info && data.chart && data.dividends) {
        setSymbol(selectedSymbol);
        setData({
          info: data.info,
          chart: data.chart,
          dividends: data.dividends,
        });
        setError(null);
      } else {
        setError("No data found for the selected symbol.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching stock data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <select
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
          className="border rounded p-2 w-full"
          disabled={loading}
        >
          <option value="" className="">
            Search your symbol
          </option>
          {usStocks.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol} - {stock.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded cursor-pointer ${
            loading ? "opacity-60" : ""
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 text-white mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </div>
  );
}
