import { useStockContext } from "@/context/StockContext";
import React from "react";

export default function CusipData() {
  const { cusipRecords, error, loading } = useStockContext();
  console.log(cusipRecords);
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Bond Listings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">CUSIP</th>
                <th className="px-3 py-2 border">Issuer Name</th>
                <th className="px-3 py-2 border">ISIN</th>
                <th className="px-3 py-2 border">Issue Type</th>
                <th className="px-3 py-2 border">Description</th>
                <th className="px-3 py-2 border">Rate (%)</th>
                <th className="px-3 py-2 border">Currency</th>
                <th className="px-3 py-2 border">Maturity Date</th>
              </tr>
            </thead>
            <tbody>
              {cusipRecords.map((bond, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{bond.cusip || "N/A"}</td>
                  <td className="px-3 py-2 border">
                    {bond.issuerName || "N/A"}
                  </td>
                  <td className="px-3 py-2 border">{bond.isin || "N/A"}</td>
                  <td className="px-3 py-2 border">
                    {bond.issueType || "N/A"}
                  </td>
                  <td className="px-3 py-2 border">
                    {bond.issueDescAdl || "N/A"}
                  </td>
                  <td className="px-3 py-2 border">{bond.rate ?? "N/A"}</td>
                  <td className="px-3 py-2 border">
                    {bond.currencyCode || "N/A"}
                  </td>
                  <td className="px-3 py-2 border">
                    {bond.maturityDate || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
