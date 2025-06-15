// app/api/cusip/route.js
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const pageSize = searchParams.get("pageSize") || "5";
    const page = searchParams.get("page") || "1";

    if (!query) {
      return new Response(JSON.stringify({ error: "Missing 'q' query parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.CUSIP_API_KEY; // Add this in your .env.local

    const cusipRes = await fetch(
      `https://api.cusip.com/api/cusip/search?q=${encodeURIComponent(query)}&pageSize=${pageSize}&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": apiKey,
        },
      }
    );

    if (!cusipRes.ok) {
      const errorText = await cusipRes.text();
      return new Response(JSON.stringify({ error: "CUSIP API error", details: errorText }), {
        status: cusipRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await cusipRes.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
