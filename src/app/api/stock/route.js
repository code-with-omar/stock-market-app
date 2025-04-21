// app/api/stock/route.js
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");
    if (!symbol) {
      return new Response("Missing symbol parameter", { status: 400 });
    }

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      return new Response("API key not configured", { status: 500 });
    }

    // Build URL helper
    const avUrl = (fn) =>
      `https://www.alphavantage.co/query?function=${fn}&symbol=${symbol}&apikey=${API_KEY}`;

    // Fetch all in parallel
    const [ovrR, priceR, divR, chartR] = await Promise.all([
      fetch(avUrl("OVERVIEW")),
      fetch(avUrl("GLOBAL_QUOTE")),
      fetch(avUrl("TIME_SERIES_MONTHLY_ADJUSTED")),
      fetch(avUrl("TIME_SERIES_DAILY")),
    ]);

    if (![ovrR, priceR, divR, chartR].every((r) => r.ok)) {
      return new Response("Error fetching from Alpha Vantage", { status: 502 });
    }

    const [overview, priceData, divData, chartDataRaw] = await Promise.all([
      ovrR.json(),
      priceR.json(),
      divR.json(),
      chartR.json(),
    ]);

    // Process dividends: last 12 entries from "Monthly Adjusted Time Series"
    const monthlySeries = divData["Monthly Adjusted Time Series"] || {};
    const dividends = Object.entries(monthlySeries)
      .slice(0, 12)
      .map(([date, vals]) => ({
        date,
        dividend: vals["7. dividend amount"],
      }));

    // Process chart: last 30 entries from "Time Series (Daily)"
    const dailySeries = chartDataRaw["Time Series (Daily)"] || {};
    const chart = Object.entries(dailySeries)
      .slice(0, 30)
      .reverse()
      .map(([date, vals]) => ({
        date,
        price: parseFloat(vals["4. close"]),
      }));

    // Construct info object
    const info = {
      symbol: overview.Symbol || symbol,
      name: overview.Name || "N/A",
      cusip: overview.CUSIP || "N/A",
      price:
        priceData["Global Quote"]?.["05. price"] ??
        priceData["Global Quote"]?.["05. Price"] ??
        "N/A",
    };

    return new Response(
      JSON.stringify({
        info,
        chart,
        dividends,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err) {
    console.error("API route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
