"use client";

import { useStockContext } from "@/context/StockContext";

export default function SearchBar() {
  const { symbol, setSymbol, setData, setError } = useStockContext(); // Assuming these are set in your context

  const handleSearch = async () => {
    try {
      // Make a GET request to the Next.js API route
      const res = await fetch(`/api/stock?symbol=${symbol}`);
      const data = await res.json();

      // Check if the response contains the required data
      if (data.info && data.chart && data.dividends) {
        setData({
          info: data.info,
          chart: data.chart,
          dividends: data.dividends,
        });
        setError(null); // Clear any previous errors
      } else {
        setError("No data found for the given symbol.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching stock data.");
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter symbol..."
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Search
      </button>
    </div>
  );
}
