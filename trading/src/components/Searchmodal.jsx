import React, { useEffect, useState } from "react";
import { useSharedState } from "../SharedStateProvider";

const Searchmodal = () => {
  const { searchbarValue } = useSharedState();
  const { updateSearchbarValue } = useSharedState();

  const toggleSearchVisibility = () => {
    updateSearchbarValue(!searchbarValue);
  };

  return (
    <div
      className={`absolute z-50 right-0 2xl:relative ${
        searchbarValue ? "" : "hidden"
      }`}
    >
      <div className="fixed w-screen bg-[#f4f5f6] dark:bg-[#142028]  h-screen py-[16px] lg:hidden top-0 left-0">
        <div
          className={`w-full py-[16px] lg:hidden flex items-center`}
        >
          <div className="w-auto md:w-[400px] xl:w-[700px] mx-auto">
            <div className="relative flex items-center w-full h-[41px] rounded-lg shadow-lg bg-white overflow-hidden dark:bg-[#23323C]">
              <div className="grid place-items-center h-full w-8 text-gray-300 bg-gray-200 dark:bg-[#3A4956]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-base text-gray-700 pl-2 dark:bg-[#23323C] dark:text-white bg-inherit"
                type="text"
                id="search"
                autoComplete="off"
                placeholder="Search something.."
              />
            </div>
          </div>
          <button
            className="ml-auto me-2 my-auto w-[28px] h-[28px] flex items-center justify-center bg-[#E2E7EC] dark:bg-[#23323C] rounded-full"
            onClick={toggleSearchVisibility}
          >
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="xmark"
              className="svg-inline--fa fa-xmark w-[14.25px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchmodal;
