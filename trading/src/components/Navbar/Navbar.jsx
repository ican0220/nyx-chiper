import React from "react";
import Toggle from "../Themecomponent/ThemeToggle";
import { AiFillStar } from "react-icons/ai";
import ConnectWallet from "./ConnectWallet";
import { useSharedState } from "../../SharedStateProvider";

const Navbar = () => {
  const { navbarValue, searchbarValue } = useSharedState();
  console.log(searchbarValue)
  const { updateNavbarValue, updateSearchbarValue } = useSharedState();
  const toggleFavouriteVisibility = () => {
    updateNavbarValue(!navbarValue);
  };
  const toggleSearchVisibility = () => {
    updateSearchbarValue(!searchbarValue);
  };
  return (
    <nav className="bg-[#F4F5F6] shadow-grey shadow-lg px-2 py-3 rounded dark:bg-[#142028] h-[64px]">
      <div className="container flex justify-between items-center ml-auto">
        <div className="flex items-center mx-auto">
          <div className="w-auto md:w-[400px] xl:w-[700px] mx-auto">
            <div className="relative hidden lg:flex items-center w-full h-[41px] rounded-lg shadow-lg bg-white overflow-hidden dark:bg-[#23323C]">
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
        </div>
        <div className="flex lg:hidden justify-end pr-2 sm:pr-4">
          <button
            className="w-[28px] h-[28px] flex items-center justify-center bg-[#E2E7EC] dark:bg-[#23323C] rounded-full"
            onClick={toggleSearchVisibility}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 bg-inherit text-gray-500 dark:text-white"
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
          </button>
        </div>
        <div className="flex justify-end pr-2 sm:pr-4">
          <Toggle />
        </div>
        <div className="flex justify-end pr-2 sm:pr-4 text-xl font-normal cursor-pointer dark:text-white"
          onClick={toggleFavouriteVisibility}
        >
          <AiFillStar
            className={`${
              navbarValue ? "text-gray-500" : "text-white"
            } text-2xl`}
          />
        </div>
        <div className="flex justify-end">
          <ConnectWallet className="pr-2 sm:pr-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
