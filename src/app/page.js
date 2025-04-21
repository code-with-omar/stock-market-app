"use client";
import StockInfo from "@/components/StockInfo";
import StockChart from "@/components/StockChart";
import DividendTable from "@/components/DividendTable";
import { useStockContext } from "@/context/StockContext";
import SearchBar from "@/components/InputForm";

export default function Home() {
  const { data, error } = useStockContext();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stock Info Site</h1>
      <SearchBar></SearchBar>
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <>
          <StockInfo />
          <StockChart />
          <DividendTable />
        </>
      )}
    </div>
  );
}
