import React, { useState, createContext } from "react";
import CurrencyData from "./CurrencyData";
export const AppContext = createContext();
const TradingView = () => {
  const [currency, setCurrency] = useState("bitcoin");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [showCapSide, setShowCapSide] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        vsCurrency,
        setVsCurrency,
        showCapSide,
        setShowCapSide,
      }}
    >
      <div className="flex w-full">
        <div className="grid grid-cols-1 gap-0 w-full">
          <div className="col-span-1 pr-4">
            <CurrencyData coinName={currency} />
            <div className="flex items-center justify-center h-[4px] bg-[#818EA3] w-full rounded-b-2xl ml-2">
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="arrows-up-down"
                className="svg-inline--fa fa-arrows-up-down h-5 w-5 z-40 text-[#818EA3] cursor-row-resize pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M177 7c-9.4-9.4-24.6-9.4-33.9 0L47 103c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55V430.1L81 375c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l96 96c9.4 9.4 24.6 9.4 33.9 0l96-96c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55V81.9l55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L177 7z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default TradingView;
