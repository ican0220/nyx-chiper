import React, { useEffect, useState } from "react";
import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const DextScore = () => {
  return (
    <div className="bg-[#f4f5f6] dark:bg-[#142028] rounded-2xl p-[20px]">
      <div className="md:flex flex-row-reverse lg:flex-col">
        <div className="w-[140px] h-[90px] relative mx-auto mt-auto">
          <Progress.Circle
            gapDegree={150}
            gapPosition="right"
            strokeLinecap="round"
            percent={90}
            strokeColor="#00b8d8"
            showInfo={false}
            className="rotate-90"
          />
          <div className="absolute top-[25%] flex items-center justify-center w-full text-black dark:text-white">
            <strong className="text-[32px]">99</strong>
            <span className="text-[16px]">/99</span>
          </div>
        </div>

        <div className="text-center md:text-left lg:text-center text-black dark:text-white">
          <p className="text-[14px] mb-1 font-bold">DEXTscore</p>
          <span className="text-[12px] py-[5px] font-bold">
            Project reliability score based on:
          </span>
          <div className="flex justify-around md:flex-col lg:flex-row text-center text-[11px] mt-1 font-[400]">
            <span className="flex">
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-info"
                className="svg-inline--fa fa-circle-info w-[11px] me-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                ></path>
              </svg>
              <font className="md:hidden lg:block">99pt</font>
              <font className="hidden md:block lg:hidden">Information: 99 points</font>
            </span>
            <span className="flex">
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-info"
                className="svg-inline--fa fa-circle-info w-[11px] me-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z"
                ></path>
              </svg>
              <font className="md:hidden lg:block">99pt</font>
              <font className="hidden md:block lg:hidden">Transactions: 99 points</font>
            </span>
            <span className="flex">
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-info"
                className="svg-inline--fa fa-circle-info w-[11px] me-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
                ></path>
              </svg>
              <font className="md:hidden lg:block">99pt</font>
              <font className="hidden md:block lg:hidden">Holders: 99 points</font>
            </span>
            <span className="flex">
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-info"
                className="svg-inline--fa fa-circle-info w-[11px] me-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"
                ></path>
              </svg>
              <font className="md:hidden lg:block">99pt</font>
              <font className="hidden md:block lg:hidden">Audit: 99 points</font>
            </span>
            <span className="flex">
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-info"
                className="svg-inline--fa fa-circle-info w-[11px] me-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"
                ></path>
              </svg>
              <font className="md:hidden lg:block">99pt</font>
              <font className="hidden md:block lg:hidden">Pool: 99 points</font>
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="flex justify-between border-b border-black dark:border-[#23323c] py-3">
          <span className="text-[14px] font-bold flex items-center gap-2">
            Audit
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="circle-info"
              className="svg-inline--fa fa-circle-info fa-lg w-[16.25px] h-[16.25px] my-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208 352c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V240c0-8.8-7.2-16-16-16H216c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96H208zm48-168a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
              ></path>
            </svg>
          </span>
          <span className="text-[12px] flex gap-1 items-center">
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="triangle-exclamation"
              className="svg-inline--fa fa-triangle-exclamation w-[12px] h-[12px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M248.4 84.3c1.6-2.7 4.5-4.3 7.6-4.3s6 1.6 7.6 4.3L461.9 410c1.4 2.3 2.1 4.9 2.1 7.5c0 8-6.5 14.5-14.5 14.5H62.5c-8 0-14.5-6.5-14.5-14.5c0-2.7 .7-5.3 2.1-7.5L248.4 84.3zm-41-25L9.1 385c-6 9.8-9.1 21-9.1 32.5C0 452 28 480 62.5 480h387c34.5 0 62.5-28 62.5-62.5c0-11.5-3.2-22.7-9.1-32.5L304.6 59.3C294.3 42.4 275.9 32 256 32s-38.3 10.4-48.6 27.3zM288 368a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-8-184c0-13.3-10.7-24-24-24s-24 10.7-24 24v96c0 13.3 10.7 24 24 24s24-10.7 24-24V184z"
              ></path>
            </svg>
            Verify external audits
          </span>
        </p>

        <p className="flex justify-between border-b border-black dark:border-[#23323c] py-3">
          <span className="text-[13px] flex items-center gap-2">
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="circle-info"
              className="svg-inline--fa fa-circle-info fa-lg w-[16.25px] h-[16.25px] my-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208 352c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V240c0-8.8-7.2-16-16-16H216c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96H208zm48-168a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
              ></path>
            </svg>
            <font className="text-black dark:text-white">
              Contract Verified
            </font>
          </span>
          <span className="text-[13px] flex gap-2 items-center text-[#17c671]">
            Yes
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="shield-check"
              className="svg-inline--fa fa-shield-check fa-xl w-[19.5px] h-[19.5px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M243.5 37.3c8-3.4 17-3.4 25 0l176.7 75c11.3 4.8 18.9 15.5 18.8 27.6c-.5 94-39.4 259.8-195.5 334.5c-7.9 3.8-17.2 3.8-25.1 0C87.3 399.6 48.5 233.8 48 139.8c-.1-12.1 7.5-22.8 18.8-27.6l176.7-75zM281 7.8c-16-6.8-34-6.8-50 0L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L281 7.8zm82.3 195.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"
              ></path>
            </svg>
          </span>
        </p>
        <p className="flex justify-between border-b border-black dark:border-[#23323c] py-3">
          <span className="text-[13px] flex items-center gap-2">
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="circle-info"
              className="svg-inline--fa fa-circle-info fa-lg w-[16.25px] h-[16.25px] my-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208 352c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V240c0-8.8-7.2-16-16-16H216c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96H208zm48-168a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
              ></path>
            </svg>
            <font className="text-black dark:text-white">Honeypot</font>
          </span>
          <span className="text-[13px] flex gap-2 items-center text-[#17c671]">
            No
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="check"
              className="svg-inline--fa fa-check fa-xl w-[17.06px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M443.3 100.7c6.2 6.2 6.2 16.4 0 22.6l-272 272c-6.2 6.2-16.4 6.2-22.6 0l-144-144c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L160 361.4 420.7 100.7c6.2-6.2 16.4-6.2 22.6 0z"
              ></path>
            </svg>
          </span>
        </p>
        <p className="flex justify-between border-b border-black dark:border-[#23323c] py-3">
          <span className="text-[13px] flex items-center gap-2">
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="circle-info"
              className="svg-inline--fa fa-circle-info fa-lg w-[16.25px] h-[16.25px] my-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208 352c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V240c0-8.8-7.2-16-16-16H216c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96H208zm48-168a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
              ></path>
            </svg>
            <font className="text-black dark:text-white">Buy Tax</font>
          </span>
          <span className="text-[13px] flex gap-2 items-center text-[#17c671]">
            0%
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="check"
              className="svg-inline--fa fa-check fa-xl w-[17.06px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M443.3 100.7c6.2 6.2 6.2 16.4 0 22.6l-272 272c-6.2 6.2-16.4 6.2-22.6 0l-144-144c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L160 361.4 420.7 100.7c6.2-6.2 16.4-6.2 22.6 0z"
              ></path>
            </svg>
          </span>
        </p>
        <p className="flex justify-between border-b border-black dark:border-[#23323c] py-3">
          <span className="text-[13px] flex items-center gap-2">
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="circle-info"
              className="svg-inline--fa fa-circle-info fa-lg w-[16.25px] h-[16.25px] my-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208 352c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V240c0-8.8-7.2-16-16-16H216c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96H208zm48-168a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
              ></path>
            </svg>
            <font className="text-black dark:text-white">Sell Tax</font>
          </span>
          <span className="text-[13px] flex gap-2 items-center text-[#17c671]">
            0%
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="check"
              className="svg-inline--fa fa-check fa-xl w-[17.06px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M443.3 100.7c6.2 6.2 6.2 16.4 0 22.6l-272 272c-6.2 6.2-16.4 6.2-22.6 0l-144-144c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L160 361.4 420.7 100.7c6.2-6.2 16.4-6.2 22.6 0z"
              ></path>
            </svg>
          </span>
        </p>
      </div>

      <button className="w-full bg-[#17c671] py-[9px] px-[16px] my-[24px] rounded-lg text-[13px] flex items-center justify-center gap-2 text-black">
        <svg
          role="img"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="shield-check"
          className="svg-inline--fa fa-shield-check w-[15px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
          ></path>
        </svg>
        Check Audits
      </button>
      <p className="flex justify-between items-center text-[14px] pt-[3px] font-bold text-black dark:text-white mb-[16px]">
        <span>COMMUNITY TRUST</span>
        <span>(2579 votes)</span>
        <svg
          role="img"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="circle-info"
          className="svg-inline--fa fa-circle-info w-[14px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
          ></path>
        </svg>
      </p>

      <div className="flex justify-between items-center text-[13px]">
        <div className="text-[#17c671] flex flex-col gap-1 items-center">
          <svg
            role="img"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="thumbs-up"
            className="svg-inline--fa fa-thumbs-up w-[18px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
            ></path>
          </svg>
          93.1%
        </div>
        <div className="w-full mx-[10px]">
          <div className="my-[6px] text-[13px] h-[6px] w-[100%] bg-[#EA394380] rounded text-left">
            <div className="rounded h-full w-[20%] bg-[#17c671]"></div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 items-center text-black dark:text-white">
          <svg
            role="img"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="thumbs-up"
            className="svg-inline--fa fa-thumbs-up w-[18px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path fill="#EA394380" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"></path>
          </svg>
          6.9%
        </div>
      </div>
      
      <div className="pt-[9px] mb-[6px] text-black dark:text-white">
        <p className="mb-[8px] text-[14px] font-bold">TOKEN DESCRIPTION</p>
        <p className="text-[12px]"><b>Dext</b> is the utility token of <b>dextools,</b> which you can use to access all features and tiers of the app.</p>
      </div>
      <a className="px-[6px] rounded-full bg-[#00B8D833] text-[#00B8D8] text-[12px] hover:bg-[#00B8D8] hover:text-white hover:no-underline">Update</a>
    </div>
  );
};

export default DextScore;
