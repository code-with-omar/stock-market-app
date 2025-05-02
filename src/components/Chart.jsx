"use client";

import {
  LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,
} from "recharts";
import { useStockContext } from "@/context/StockContext";

export default function Chart() {
  const { data } = useStockContext();

  if (!data?.chart) return null;
  const chartData = data.chart; // <-- this line was missing

  return (
    <div className="mb-6 border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
