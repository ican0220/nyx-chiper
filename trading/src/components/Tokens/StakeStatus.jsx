import React, { useEffect, useState } from "react";

const TabsData = [
  {
    dayStatus: "5m",
    daypercent: -0.58,
    buys: 900.1,
    sells: 134.23,
    txsNum: 2,
    buysNum: 1,
    sellsNum: 1,
    vol: "1.03k",
    percent: 80,
  },
  {
    dayStatus: "1h",
    daypercent: -1.3,
    buys: 8156.71,
    sells: 1803.07,
    txsNum: 4,
    buysNum: 2,
    sellsNum: 2,
    vol: "9.96k",
    percent: 25,
  },
  {
    dayStatus: "6h",
    daypercent: -0.77,
    buys: 37937.31,
    sells: 29713.26,
    txsNum: 27,
    buysNum: 18,
    sellsNum: 9,
    vol: "67.65k",
    percent: 80,
  },
  {
    dayStatus: "24h",
    daypercent: -3.9,
    buys: 203629.42,
    sells: 277498.54,
    txsNum: 140,
    buysNum: 94,
    sellsNum: 46,
    vol: "481.12k",
    percent: 80,
  },
  {
    dayStatus: "7d",
    daypercent: 6.76,
    buys: null,
    sells: null,
    txsNum: null,
    buysNum: null,
    sellsNum: null,
    vol: null,
    percent: 25,
  },
];

const StakeStatus = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <div className="bg-[#f4f5f6] dark:bg-[#142028] rounded-2xl">
      <div className="flex justify-around py-[6px] px-[10px] text-[13px] bg-[#e2e7ec] dark:bg-[#23323c] rounded-2xl">
        {TabsData.map((tab, idx) => {
          return (
            <div
              className={`text-center px-[6px] py-[5px] rounded-md ${activeTabIndex == idx ? 'bg-white dark:bg-[#0b1217]' : ''}`}
              key={idx}
              onClick={() => setActiveTabIndex(idx)}
            >
              <p>{tab.dayStatus}</p>
              <span
                className={`font-bold ${
                  tab.daypercent >= 0 ? "text-[#17c671]" : "text-[#e73a44]"
                }`}
              >
                {tab.daypercent}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-4 py-[6px] px-[10px] text-[13px]">
        <div className="text-center px-[6px] py-[5px]">
          <p>Txs</p>
          <span>{TabsData[activeTabIndex].txsNum ? TabsData[activeTabIndex].txsNum : '-'}</span>
        </div>
        <div className="text-center px-[6px] py-[5px]">
          <p>Buys</p>
          <span>{TabsData[activeTabIndex].buysNum ? TabsData[activeTabIndex].buysNum : '-'}</span>
        </div>
        <div className="text-center px-[6px] py-[5px]">
          <p>Sells</p>
          <span>{TabsData[activeTabIndex].sellsNum ? TabsData[activeTabIndex].sellsNum : '-'}</span>
        </div>
        <div className="text-center px-[6px] py-[5px]">
          <p>Vol.</p>
          <span>{TabsData[activeTabIndex].vol ? `$${TabsData[activeTabIndex].vol}` : '-'}</span>
        </div>
      </div>
      <div className="my-[6px] mx-[10px] text-[13px] h-[5px] w-auto bg-[#e73a44] rounded text-left">
        <div className={'rounded h-full bg-[#17c671] w-[' + TabsData[activeTabIndex].percent + '%]'}></div>
      </div>
      <div className="flex justify-between px-[10px] text-[12px] pb-[8px]">
        <div className="text-left">
          <p>Buys</p>
          <span>{TabsData[activeTabIndex].buys ? `$${TabsData[activeTabIndex].buys}` : '-'}</span>
        </div>
        <div className="text-right">
          <p>Sells</p>
          <span>{TabsData[activeTabIndex].sells ? `$${TabsData[activeTabIndex].sells}` : '-'}</span>
        </div>
      </div>
    </div>
  );
};

export default StakeStatus;
