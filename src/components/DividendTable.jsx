"use client";

import { useStockContext } from "@/context/StockContext";

export default function DividendTable() {
  const { data } = useStockContext();

  if (!data?.dividends) return null;
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Dividend History</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b p-2">Date</th>
            <th className="border-b p-2">Dividend</th>
          </tr>
        </thead>
        <tbody>
          {dividends.map((entry, idx) => (
            <tr key={idx}>
              <td className="p-2 border-b">{entry.date}</td>
              <td className="p-2 border-b">${entry.dividend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
