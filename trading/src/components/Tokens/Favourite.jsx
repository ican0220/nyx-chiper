import React, { useEffect, useState } from "react";
import { useSharedState } from "../../SharedStateProvider";

const Favourite = () => {
  const { navbarValue } = useSharedState();
  const { updateNavbarValue } = useSharedState();

  const toggleFavouriteVisibility = () => {
    updateNavbarValue(!navbarValue);
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`min-w-[370px] absolute z-50 right-0 2xl:relative ${
        navbarValue ? "hidden" : ""
      }`}
      id="favourite"
    >
      <div
        className={`w-[370px] bg-[#f4f5f6] dark:bg-[#142028] rounded-2xl min-h-[560px] h-screen py-[16px] hidden lg:block ${
          scrollPosition < 64
            ? `fixed top-0 2xl:top-[76px] 2xl:h-auto`
            : "fixed top-0 2xl:fixed 2xl:top-3 2xl:h-auto"
        }`}
      >
        <div className="flex justify-between px-4 text-[14px] text-black dark:text-white font-bold mb-[10px]">
          <span className="flex gap-2 items-center">
            FAVORITES
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="circle-info"
              className="svg-inline--fa fa-circle-info w-[14px] mt-[2px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
              ></path>
            </svg>
          </span>
          <span className="flex gap-2 items-center">
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chart-column"
              className="svg-inline--fa fa-chart-column w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z"
              ></path>
            </svg>
            <button
              className="w-[28px] h-[28px] flex items-center justify-center bg-[#E2E7EC] dark:bg-[#23323C] rounded-full"
              onClick={toggleFavouriteVisibility}
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
          </span>
        </div>

        <div className="py-[8.254px] px-[7px] rounded-lg w-[175px] flex justify-between ms-4 bg-[#e2e7ec] dark:bg-[#23323c] text-black dark:text-white">
          Last added
          <svg
            role="img"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chevron-down"
            className="svg-inline--fa fa-chevron-down w-[13px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            ></path>
          </svg>
        </div>

        <div className="mt-4 py-[8.254px] px-[7px] rounded-lg w-[65px] flex justify-between ms-4 bg-[#e2e7ec] dark:bg-[#23323c] text-black dark:text-white">
          <img
            className="w-[28px] h-[28px]"
            src="https://www.dextools.io/resources/chains/med/ether.png"
            alt="ether"
          />
          <svg
            role="img"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chevron-down"
            className="svg-inline--fa fa-chevron-down w-[13px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            ></path>
          </svg>
        </div>
        <div className="px-4 py-[20px]"></div>
        <div className="px-4">Your favorite list is empty for this chain.</div>
      </div>

      <div className="fixed w-screen bg-[#ffffff] dark:bg-[#000000] h-screen py-[16px] lg:hidden top-0 left-0">
        <button
          className="ml-auto me-2 mb-2 w-[28px] h-[28px] flex items-center justify-center bg-[#E2E7EC] dark:bg-[#23323C] rounded-full"
          onClick={toggleFavouriteVisibility}
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

        <div
          className={`w-full bg-[#f4f5f6] dark:bg-[#142028] rounded-2xl min-h-[560px] py-[16px] lg:hidden`}
        >
          <div className="flex justify-between px-4 text-[14px] text-black dark:text-white font-bold mb-[10px]">
            <span className="flex gap-2 items-center">
              FAVORITES
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-info"
                className="svg-inline--fa fa-circle-info w-[14px] mt-[2px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                ></path>
              </svg>
            </span>

            <span className="flex gap-2 items-center">
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chart-column"
                className="svg-inline--fa fa-chart-column w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z"
                ></path>
              </svg>
            </span>
          </div>

          <div className="py-[8.254px] px-[7px] rounded-lg w-[175px] flex justify-between ms-4 bg-[#e2e7ec] dark:bg-[#23323c] text-black dark:text-white">
            Last added
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chevron-down"
              className="svg-inline--fa fa-chevron-down w-[13px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              ></path>
            </svg>
          </div>

          <div className="mt-4 py-[8.254px] px-[7px] rounded-lg w-[65px] flex justify-between ms-4 bg-[#e2e7ec] dark:bg-[#23323c] text-black dark:text-white">
            <img
              className="w-[28px] h-[28px]"
              src="https://www.dextools.io/resources/chains/med/ether.png"
              alt="ether"
            />
            <svg
              role="img"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chevron-down"
              className="svg-inline--fa fa-chevron-down w-[13px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              ></path>
            </svg>
          </div>
          <div className="px-4 py-[20px]"></div>
          <div className="px-4">
            Your favorite list is empty for this chain.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
