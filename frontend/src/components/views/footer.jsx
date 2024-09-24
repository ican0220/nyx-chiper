import React from "react";

const Footer = () => {
  return (
    <div className="nyxBorderTop nyxContainer" id="footer">
      <div className="nyxBorderX text-center pt-[45px] sm:pt-[4px]">
        <div className="py-[29px] sm:py-[34px] grid sm:flex place-items-center justify-center gap-[16px]">
          <span className="cornered_icon_hover hidden sm:block">
            <img
              src="./assets/images/icon/twitter_cornered.png"
              className="mx-[47.5px] sm:mx-0"
            />
          </span>
          <span className="cornered_icon_hover hidden sm:block">
            <img
              src="./assets/images/icon/telegram_cornered.png"
              className="mx-[47.5px] sm:mx-0"
            />
          </span>
          <span className="cornered_icon block sm:hidden">
            <img
              src="./assets/images/icon/twitter_mini.png"
              className="mx-[47.5px] sm:mx-0"
            />
          </span>
          <span className="cornered_icon block sm:hidden">
            <img
              src="./assets/images/icon/telegram_mini.png"
              className="mx-[47.5px] sm:mx-0"
            />
          </span>
        </div>
        <p className="text-[12px] sm:text-[18px] text-[#A4A4A4] font-light pb-[8px] sm:pb-[18px] font-[RobotoMonoLight]">
          ©2024 NYX Cipher Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
