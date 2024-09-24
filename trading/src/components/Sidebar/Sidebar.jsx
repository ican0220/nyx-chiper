import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdGeneratingTokens } from "react-icons/md";
import { RiProjectorFill } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import Logo from "../../assets/images/logo.svg";
import HamburgerButton from "./HamburgerButton";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const Menus = [
    { title: "Home", path: "/home", src: <FaHome /> },
    {
      title: "Shared Projects",
      path: "/projects",
      src: <RiProjectorFill />,
    },
    { title: "Website Explorer", path: "/websites", src: <MdGeneratingTokens /> },
    // { title: "Subscription", path: "/subscription", src: <MdSubscriptions /> },
    { title: "More", path: "/more", src: <FiMoreHorizontal /> },
  ];

  return (
    <>
      <div
        className={`hidden sm:block h-screen bg-gray-100 border-gray-200 shadow-gray-500 dark:border-gray-600 dark:bg-[#142028] dark:shadow-black fixed shadow-lg z-50`}
        style={{
          width: open ? "190px" : "50px",
          overflow: "hidden",
          transition: "width 0.3s ease-in-out", // Changed to 0.3s duration
        }}
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setOpen(false)}
      >
        <Link to="/">
          <div className={`flex items-center p-2 pt-6`}>
            <img src={Logo} alt="" className="" width={40} />
          </div>
        </Link>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index} className="no-underline">
              <li
                className={`flex items-center gap-x-3 p-3.5 text-base font-normal cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white
                        ${menu.gap ? "mt-9" : "mt-0"} ${location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  }`}
              >
                <span className="text-2xl">{menu.src}</span>
                <span
                  className={`${!open && "hidden"
                    } origin-left delay-300 hover:block overflow-hidden text-ellipsis whitespace-nowrap`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${mobileMenu ? "flex" : "hidden"
            } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-0 right-0 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
              className="no-underline"
            >
              <span
                className={` ${location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                  } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
