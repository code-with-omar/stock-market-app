"use client";

import { useStockContext } from "@/context/StockContext";
import { useState } from "react";

export default function SearchBarForCusip() {
  const {
    setSymbol,
    setError,
    loading,
    setLoading,
    cusipRecords,
    setCusipRecords,
  } = useStockContext();

  const [userInput, setUserInput] = useState("");

  const handleSearch = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/cusip?q=${encodeURIComponent(trimmedInput)}&pageSize=5&page=1`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch CUSIP data");
      }

      setCusipRecords(data?.response?.cusipRecords);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter company name"
          className="border rounded p-2 w-full"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
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
