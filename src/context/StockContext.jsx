"use client";

import { createContext, useContext, useState } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cusipRecords, setCusipRecords] = useState("");
  return (
    <StockContext.Provider
      value={{
        symbol,
        setSymbol,
        cusipRecords,
        setCusipRecords,
        data,
        setData,
        error,
        setError,
        setLoading,
        loading,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStockContext must be used within a StockProvider");
  }
  return context;
};
