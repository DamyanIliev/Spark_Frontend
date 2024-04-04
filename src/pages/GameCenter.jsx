import React from 'react';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";

const GameCenter = () => {

  let navigate = useNavigate();

  const handleSparkman = () => {
    navigate('/sparkmangame')
  }
  const handleRaceGame = () => {
    navigate('/racegame')
  }

  return (
    <div className='w-full px-0 sm:px-20 pb-20 2xl:px-40 bg-oxford-blue-950 lg:rounded-lg h-screen overflow-hidden'>
      <TopBar/>
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
        <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <div className='pl-14  h-[120px] flex items-center text-4xl text-white8 bg-sparkman hover:border border-oxford-blue-400 rounded-2xl' onClick={handleSparkman}>
             SparkMan <span className='  mt-2 ml-16 text-2xl text-grey8'>Play with our SparkMan!</span>
          </div>
          <div className='pl-14  h-[120px] flex items-center text-4xl text-white8 bg-sparkman hover:border border-oxford-blue-400 rounded-2xl' onClick={handleRaceGame}>
             SparkMan <span className='  mt-2 ml-16 text-2xl text-grey8'>Play with our SparkMan!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCenter
