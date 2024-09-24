import React, { useEffect, useState } from "react";

const PoolUniswapV2 = () => {
  const [action, setAction] = useState(false);
  const tooggleAction = () => {
    setAction(!action);
  };
  return (
    <div>
      <div className="bg-[#f4f5f6] dark:bg-[#142028] pt-[14px] px-[14px] pb-[7px] rounded-t-2xl">
        {/* Header */}
        <div className="flex flex-col mb-[16px] text-black dark:text-white">
          <div className="flex justify-between">
            <span className="text-[14px] font-[500] w-[250px]">
              POOL <font className="text-[#0ab8d8]">UNISWAP V2</font>
            </span>
            <div className="w-[100%] text-[#3d5170] dark:text-[#cacedb] hover:text-[#00b8d8] dark:hover:text-[#00b8d8] flex items-center justify-end">
              <svg
                className="svg-inline--fa fa-binoculars w-[16px]"
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="binoculars"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M128 32h32c17.7 0 32 14.3 32 32V96H96V64c0-17.7 14.3-32 32-32zm64 96V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V388.9c0-34.6 9.4-68.6 27.2-98.3C40.9 267.8 49.7 242.4 53 216L60.5 156c2-16 15.6-28 31.8-28H192zm227.8 0c16.1 0 29.8 12 31.8 28L459 216c3.3 26.4 12.1 51.8 25.8 74.6c17.8 29.7 27.2 63.7 27.2 98.3V448c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V128h99.8zM320 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V96H320V64zm-32 64V288H224V128h64z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-between max-w-[272px] mt-[10px]">
            <div className="flex text-[12px] font-[400]">
              <span>DEXT:</span>
              <span className="text-[#0ab8d8] ms-1">0XFB7...C75A</span>
              <svg
                className="svg-inline--fa fa-binoculars w-[11.5px] ms-1"
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="binoculars"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
                ></path>
              </svg>
            </div>
            <div className="flex text-[12px] font-[400]">
              <span>PAIR:</span>
              <span className="text-[#0ab8d8] ms-1">0XFB7...C75A</span>
              <svg
                className="svg-inline--fa fa-binoculars w-[11.5px] ms-1"
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="binoculars"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        {/* Container */}
        <div className="grid grid-cols-2 gap-[7px]">
          <div className="p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md">
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>
          <div className="p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md">
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden md:block"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>
          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden md:block"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>
          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden md:block"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>
          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden md:block"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>
          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden md:block"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>
          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden md:block"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>

          <div
            className={`p-[7px] text-center bg-white dark:bg-[#0b1217] rounded-md ${
              action ? "" : "hidden"
            }`}
          >
            <p className="text-[13px] font-[400] text-[#818ea3]">Market Cap</p>
            <span className="text-[16px] font-[400]">$77.42M</span>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        className="bg-[#e2e7ec] dark:bg-[#23323c] h-[30px] p-[6px] rounded-b-2xl text-center text-[12px] flex justify-center dark:text-[#cacedb] items-center"
        onClick={tooggleAction}
      >
        <span className="me-1">More info</span>
        <svg
          role="img"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="chevron-down"
          className={`svg-inline--fa fa-chevron-down w-[12px] h-[12px] ${
            action ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default PoolUniswapV2;
