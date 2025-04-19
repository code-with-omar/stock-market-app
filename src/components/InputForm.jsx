"use client";

import React from "react";
import { useStockContext } from "@/context/StockContext";
import axios from "axios";

// const API_KEY = "AJWUIVKDE9JXWVAE"; owner
const API_KEY = "7XLWCEG0ZMTXC8M";

export default function SearchBar() {
  const { symbol, setSymbol, setData, setError } = useStockContext();

  const handleSearch = async () => {
    try {
      const overview = await axios.get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
      );
      const price = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );
      const dividend = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
      );
      const chart = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
      );

      const dividendHistory = Object.entries(
        dividend.data["Monthly Adjusted Time Series"] || {}
      )
        .slice(0, 12)
        .map(([date, values]) => ({
          date,
          dividend: values["7. dividend amount"],
        }));

      const chartData = Object.entries(chart.data["Time Series (Daily)"] || {})
        .slice(0, 30)
        .reverse()
        .map(([date, values]) => ({
          date,
          price: parseFloat(values["4. close"]),
        }));

      setData({
        info: {
          symbol: overview.data.Symbol,
          name: overview.data.Name,
          cusip: overview.data.CUSIP || "N/A",
          price: price.data["Global Quote"]["05. price"],
        },
        chart: chartData,
        dividends: dividendHistory,
      });
      setError(null);
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
