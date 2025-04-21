"use client";

import { useState } from "react";
import axios from "axios";
import StockInfo from "@/components/StockInfo";
import StockChart from "@/components/StockChart";
import DividendTable from "@/components/DividendTable";

// const API_KEY = "AJWUIVKDE9JXWVAE"; owner
const API_KEY = "7XLWCEG0ZMTXC8M";

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const overview = await axios.get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`
      );
      //   const overview = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
      // );
      const price = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
      );
      // const price = await axios.get(
      //   `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      // );
      const dividend = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IBM&apikey=demo`
      );
      // const dividend = await axios.get(
      //   `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
      // );

      // const chart = await axios.get(
      //   `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
      // );
      const chart = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stock Info Site</h1>
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
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <>
          <StockInfo info={data.info} />
          <StockChart chartData={data.chart} />
          <DividendTable dividends={data.dividends} />
        </>
      )}
    </div>
  );
}
