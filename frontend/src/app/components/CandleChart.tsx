import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const options = {
  legend: "none",
  backgroundColor: {
    fill: "#11a",
  },
  candlestick: {
    fallingColor: { strokeWidth: 1, fill: "#FF4444", stroke: "#FF4444" },
    risingColor: { strokeWidth: 1, fill: "#00C853", stroke: "#00C853" },
  },
  hAxis: {
    textStyle: { color: "#808080" },
    gridlines: { color: "#333333" },
  },
  vAxis: {
    textStyle: { color: "#808080" },
    gridlines: { color: "#333333" },
  },
  chartArea: {
    width: "90%",
    height: "80%",
    backgroundColor: {
      fill: "#1a1a1a",
    },
  },
};

const CandleChart = () => {
  const [chartData, setChartData] = useState<{
    prices: [number, number][];
  } | null>(null);

  useEffect(() => {
    async function fetchChartData() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-HegMGgBnFAC7MhLyNewUBT5f",
        },
      };

      fetch(
        "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=45",
        options
      )
        .then((res) => res.json())
        .then((res) => {
          setChartData(res);
        })
        .catch((err) => console.error(err));
    }
    fetchChartData();
  }, []);

  const transformData = () => {
    if (!chartData?.prices) return [["Date", "Low", "Open", "Close", "High"]];

    const dailyData: { [key: string]: number[] } = {};

    chartData.prices.forEach(([timestamp, price]) => {
      const date = new Date(timestamp);
      const dateKey = date.toISOString().split("T")[0];

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = [price];
      } else {
        dailyData[dateKey].push(price);
      }
    });

    const formattedData = [["Date", "Low", "Open", "Close", "High"]];

    Object.entries(dailyData).forEach(([dateStr, prices]) => {
      formattedData.push([
        new Date(dateStr).toLocaleDateString(),
        Math.min(...prices),
        prices[0],
        prices[prices.length - 1],
        Math.max(...prices),
      ]);
    });

    return formattedData;
  };

  return (
    <div className="w-full h-[400px] bg-[#1a1a1a] p-4 rounded-lg">
      <Chart
        chartType="CandlestickChart"
        width="75%"
        height="100%"
        data={transformData()}
        options={options}
      />
    </div>
  );
};

export default CandleChart;
