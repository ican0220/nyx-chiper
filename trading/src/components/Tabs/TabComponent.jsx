import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContractTable from "../Datatable/Contracttable";

const TabComponent = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <div className="w-full p-2 bg-[#F4F5F6] rounded-2xl dark:bg-[#142028] sm:pr-0">
      <ul className="w-full grid grid-flow-col text-center bg-[#E2E7EC] rounded-lg p-[4px] sm:w-7/12 dark:bg-[#23323C]">
        <li>
          <Link
            href="#page1"
            className={`flex justify-center py-[6px] no-underline text-base font-medium hover:text-black hover:bg-white hover:rounded-md hover:dark:text-white hover:dark:bg-[#142028] ${openTab === 1 ? 'text-black bg-white rounded-md dark:text-white dark:bg-[#142028]' : 'text-[#828FA4]'}`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            role="tablist"
          >
            Contracts
          </Link>
        </li>
        <li>
          <Link
            href="#page2"
            className={`flex justify-center py-[6px] no-underline text-base font-medium hover:text-black hover:bg-white hover:rounded-md hover:dark:text-white hover:dark:bg-[#142028] ${openTab === 2 ? 'text-black bg-white rounded-md dark:text-white dark:bg-[#142028]' : 'text-[#828FA4]'}`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            data-toggle="tab"
            role="tablist"
          >
            Telegram
          </Link>
        </li>
        <li>
          <Link
            href="#page3"
            className={`flex justify-center py-[6px] no-underline text-base font-medium hover:text-black hover:bg-white hover:rounded-md hover:dark:text-white hover:dark:bg-[#142028] ${openTab === 3 ? 'text-black bg-white rounded-md dark:text-white dark:bg-[#142028]' : 'text-[#828FA4]'}`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(3);
            }}
            data-toggle="tab"
            role="tablist"
          >
            Youtube
          </Link>
        </li>
        <li>
          <Link
            href="#page4"
            className={`flex justify-center py-[6px] no-underline text-base font-medium hover:text-black hover:bg-white hover:rounded-md hover:dark:text-white hover:dark:bg-[#142028] ${openTab === 4 ? 'text-black bg-white rounded-md dark:text-white dark:bg-[#142028]' : 'text-[#828FA4]'}`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(4);
            }}
            data-toggle="tab"
            role="tablist"
          >
            Websites
          </Link>
        </li>
      </ul>
      <div className="relative flex flex-col min-w-0 break-words w-full">
        <div className="flex-auto">
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"} id="page1">
              <ContractTable />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="page2">
              <p>
                Completely synergize resource taxing relationships via
                premier niche markets. Professionally cultivate one-to-one
                customer service with robust ideas.
                <br />
                <br />
                Dynamically innovate resource-leveling customer service for
                state of the art customer service.
              </p>
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id="page3">
              <p>
                Efficiently unleash cross-media information without
                cross-media value. Quickly maximize timely deliverables for
                real-time schemas.
                <br />
                <br /> Dramatically maintain clicks-and-mortar solutions
                without functional solutions.
              </p>
            </div>
            <div className={openTab === 4 ? "block" : "hidden"} id="page4">
              <p>
                Collaboratively administrate empowered markets via
                plug-and-play networks. Dynamically procrastinate B2C users
                after installed base benefits.
                <br />
                <br /> Dramatically visualize customer directed convergence
                without revolutionary ROI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
