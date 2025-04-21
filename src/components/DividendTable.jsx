"use client";

import { useRef, useEffect, useState } from "react";
import { useStockContext } from "@/context/StockContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DividendTable() {
  const { data } = useStockContext();
  const tableRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!data?.dividends || !isMounted) return null;
  const dividends = data.dividends;

  const handleDownload = async () => {
    try {
      const element = tableRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dividend-history.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    }
  };

  return (
    <div
      className="border p-4 rounded shadow"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Dividend History</h2>
        <button
          onClick={handleDownload}
          className="text-sm text-blue-600 cursor-pointer hover:underline"
        >
          📥 Download
        </button>
      </div>

      <div
        ref={tableRef}
        style={{ backgroundColor: "#ffffff", color: "#000000" }}
      >
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th className="border p-2">Date</th>
              <th className="border p-2">Dividend</th>
            </tr>
          </thead>
          <tbody>
            {dividends.map((entry, idx) => (
              <tr key={idx}>
                <td className="p-2 border">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="p-2 border font-semibold">
                  ${parseFloat(entry.dividend).toFixed(2)} Dividend
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
