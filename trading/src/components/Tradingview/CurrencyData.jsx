import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./TradingView";
import { getCoinData } from "../service/CurrencyService";
import Loading from "../Loading";
import { ThemeContext } from "../Themecomponent/ThemeContext";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { Link } from "react-router-dom";
import { Resizable } from "re-resizable";
import { EmailLogo, TwitterLogo, TelegramLogo, DiscordLogo, WebLogo, InstagramLogo, TiktokLogo, YoutubeLogo } from "../../images";


const CurrencyData = () => {
  const { theme } = useContext(ThemeContext);
  const { currency, vsCurrency } = useContext(AppContext);
  const [coinData, setCoinData] = useState([]);
  let supplyPercent = useRef(0);
  let marketCapToBTC = useRef(0);
  let volume24ToBtc = useRef(0);

  useEffect(() => {
    setCoinData([]);
    const coin = async () => {
      const data = await getCoinData(currency);
      setCoinData(data);
      supplyPercent.current = Number(
        (data.market_data.total_supply / data.market_data.max_supply) * 100
      ).toFixed(0);
      marketCapToBTC.current = 0;
      volume24ToBtc.current = 0;
      data.tickers.forEach((item) => {
        marketCapToBTC.current += item.converted_volume.btc;
        volume24ToBtc.current += item.converted_last.btc;
      });
    };
    coin();
  }, [currency]);

  if (coinData.length === 0) return <Loading />;
  return (
    <Resizable className={`flex flex-col rounded-t-2xl overflow-hidden ${theme === "dark" ? "bg-[#142028]" : "bg-gray-100"
  } mx-2`} defaultSize={{ width: "100%", height: "700px" }} minHeight={"300px"} maxHeight={"700px"} enable={{ top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}>
        <div
          className={"flex items-center justify-between p-4"}
        >
          <div className="flex items-center">
            <img src={coinData.image.small} className="mr-2 h-9 w-9" />
            <div
              className={`flex flex-col ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
            >
              <h3
                className={`font-semibold text-lg flex items-center`}
              >
                {coinData.name}
                <span className="ml-1">
                  ({coinData.symbol.toUpperCase()})
                </span>
              </h3>
            </div>
          </div>
          <div className="hidden grid-cols-9 gap-3 border border-[#CACEDB] rounded-xl px-4 py-2 dark:border-[#3A4956] md:grid" >
            <Link to="/coinData">
              <WebLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <TwitterLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <TelegramLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <DiscordLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <YoutubeLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <TiktokLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <InstagramLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <EmailLogo className="w-5 h-5" />
            </Link>
            <Link to="https://etherscan.io/">
              <img src='./images/ether-scan.png' width="20px" height="20px" alt="" />
            </Link>
          </div>
          <div className="flex items-center">
            <p
              className={`text-2xl font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                } mr-4 bg-[#23323C] px-4 py-2 rounded-xl`}
            >
              {coinData.market_data.current_price[vsCurrency].toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: `${vsCurrency}`,
                  minimumFractionDigits: 0,
                }
              )}
            </p>
            <div className="flex items-center">
              <span
                className={`ml-1 text-sm font-bold ${coinData.market_data.price_change_percentage_24h >= 1
                  ? "text-green-500"
                  : "text-red-500"
                  }`}
              >
                {Math.abs(
                  coinData.market_data.price_change_percentage_24h_in_currency[
                  vsCurrency
                  ]
                ).toFixed(2)}
                %
              </span>
              <span className="ml-1">24h</span>
            </div>
          </div>
        </div>
        <div
          className={"text-center w-80 mx-auto md:hidden"}
        >
          <div className="grid grid-cols-9 border border-[#CACEDB] rounded-xl px-4 py-2 dark:border-[#3A4956]">
            <Link to="/coinData">
              <WebLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <TwitterLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <TelegramLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <DiscordLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <YoutubeLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <TiktokLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <InstagramLogo className="w-5 h-5" />
            </Link>
            <Link to="/coinData">
              <EmailLogo className="w-5 h-5" />
            </Link>
            <Link to="https://etherscan.io/">
              <img src='./images/ether-scan.png' width="20px" height="20px" alt="" />
            </Link>
          </div>
        </div>
        <div className="flex-grow">
          <iframe 
          title="DEXTools Trading Chart"
          width="100%" height="100%"
          src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x619a6b75b0b56e6638a194c84a26ebeaf4a55381?theme=dark&chartType=1&chartResolution=1&drawingToolbars=true"></iframe>
          {/* <AdvancedRealTimeChart
            symbol={`${coinData.symbol}usdt`}
            theme={theme}
            autosize
            height={"100%"}
            width={"100%"}
            timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            copyrightStyles={{ parent: { display: "none" } }}
            interval="1D"
          ></AdvancedRealTimeChart> */}
        </div>
    </Resizable>
  );
};

export default CurrencyData;
