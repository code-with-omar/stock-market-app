"use client";
import Price from "@/components/Price";
import Chart from "@/components/Chart";
import Dividends from "@/components/Dividends";
import { useStockContext } from "@/context/StockContext";
import SearchBar from "@/components/InputForm";
import Link from "next/link";

export default function Home() {
  const { data, error, loading } = useStockContext();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stock Info Site</h1>
      <div>
        <SearchBar />
        <Link
          href="/cusip"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          CUSIP
        </Link>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
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
          <span className="ml-2 text-blue-600">Loading stock data...</span>
        </div>
      ) : (
        data && (
          <>
            <Price />
            <Chart />
            <Dividends />
          </>
        )
      )}
    </div>
  );
}
