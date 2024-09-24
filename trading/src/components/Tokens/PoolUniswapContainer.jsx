import React from 'react';
import PoolUniswapV2 from './PoolUniswapV2';
import StakeStatus from './StakeStatus';
import DextScore from './DextScore'
const PoolUniswapContainer = () => {

  return (
    <div className="w-full min-w-[300px] lg:max-w-[300px] font-[Poppins, Roboto, sans-serif] flex flex-col gap-2">
        <PoolUniswapV2 />
        <StakeStatus />
        <DextScore />
    </div>
  );
};

export default PoolUniswapContainer;
