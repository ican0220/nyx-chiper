import React from 'react';
import PoolUniswapContainer from '../components/Tokens/PoolUniswapContainer';
import Favourite from '../components/Tokens/Favourite';
import TradingView from '../components/Tradingview/TradingView';
import Searchmodal from '../components/Searchmodal';
const Tokens = () => {
  
  return (
    <div className='dark:text-white flex flex-col lg:flex-row gap-2 pt-3'>
      <PoolUniswapContainer />

      <div className='w-full'>
        <TradingView />
      </div>
      <Favourite />
      <Searchmodal />
    </div>
  )
}

export default Tokens