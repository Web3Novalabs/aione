"use client";

import { useContext } from "react";
import Script from "next/script";
import Navbar from "./components/Navbar";
import { CoinContext } from "./context/coinContext";
import Image from "next/image";
import CandleChart from "./components/CandleChart";

export default function Home() {
  const { allCoin } = useContext(CoinContext);
  console.log(allCoin);

  // useEffect(() => {
  //   async function fetchCoin() {
  //     const response = await fetch(
  //       "https://pro-api.coingecko.com/api/v3/coins/markets"
  //     );
  //     const data = await response.json();
  //     setData(data);
  //     console.log("Coin gecko mounted", data);
  //   }

  //   fetchCoin();
  // }, []);

  return (
    <div className="">
      <Navbar />
      <div>
        <Script
          src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"
          strategy="lazyOnload"
        ></Script>
        <gecko-coin-price-chart-widget
          locale="en"
          width="500"
          dark-mode="true"
          outlined="true"
          coin-id="solana"
          initial-currency="usd"
        ></gecko-coin-price-chart-widget>
      </div>

      <div className="my-6">
        <CandleChart />
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-white">
          {allCoin.map((coin, i) => {
            return (
              <div
                key={i}
                className="flex flex-wrap rounded-xl m-3 bg-[#5ce1e9] p-6"
              >
                <div className=" text-[#000] flex text-lg items-center space-x-5 p-3">
                  <h1>{coin.market_cap_rank}</h1>
                  <Image
                    src={coin.image}
                    alt="coin image"
                    width={50}
                    height={50}
                  />
                  <h1>{coin.name}</h1>
                  <h1>{coin.current_price}</h1>
                </div>
              </div>
            );
          })}
        </h1>
      </div>
    </div>
  );
}
