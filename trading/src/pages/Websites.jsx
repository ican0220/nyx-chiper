import React from 'react';
import PoolUniswapContainer from '../components/Tokens/PoolUniswapContainer';
import Favourite from '../components/Tokens/Favourite';
import Searchmodal from '../components/Searchmodal';
import TradingView from '../components/Tradingview/TradingView';
import TabComponent from '../components/Tabs/TabComponent';
const Websites = () => {
  return (
    <div className='dark:text-white flex flex-col lg:flex-row pt-3'>
      <PoolUniswapContainer />
      <div className='w-full'>
        <TradingView className='w-full' />
        <div className='px-2 mt-3'>
          <TabComponent />
        </div>
      </div>
      <Favourite />
      <Searchmodal />
    </div>
  )
}

export default Websites