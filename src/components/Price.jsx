"use client";
import { useStockContext } from "@/context/StockContext";
export default function Price() {
  const { data } = useStockContext();
  if (!data?.info) return null;
  const { symbol, name, cusip, price } = data.info;
  return (
    <div className="mb-6 border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Info</h2>
      <p>
        <strong>Symbol:</strong> {symbol}
      </p>
      <p>
        <strong>Company Name:</strong> {name}
      </p>
      <p>
        <strong>CUSIP:</strong> {cusip}
      </p>
      <p>
        <strong>Current Price:</strong> ${price}
      </p>
    </div>
  );
}
