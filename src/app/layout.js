import { StockProvider } from "@/context/StockContext";
import "./globals.css";

export const metadata = {
  title: "Stock market app",
  description:
    "Stay ahead of the financial curve with real-time data, expert insights, and powerful tools designed for the U.S. stock market. Our web application provides up-to-date stock prices, company performance charts, historical data, and market news across the New York Stock Exchange (NYSE), NASDAQ, and S&P 500. Whether you're a beginner investor or an experienced trader, our platform offers a simple, intuitive interface to help you track, analyze, and make informed decisions.✔️ Live stock market updates. ✔️ Financial news and expert analysis.✔️ Detailed stock profiles and historical charts. ✔️ Custom watchlists and alerts .✔️ Educational resources for beginners. Optimize your investing strategy with the best tools for understanding the American stock market. Join thousands of users already making smarter investment decisions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` w-full antialiased`}>
        <StockProvider>{children}</StockProvider>
      </body>
    </html>
  );
}
