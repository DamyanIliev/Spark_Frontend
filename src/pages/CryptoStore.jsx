import React from 'react'
import {  startMining, apiRequest } from '../utils';
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';

const CryptoStore = () => {
  const { user } = useSelector(state => state.user);
  const [sparkCoins, setSparkCoins] = useState(user.sparkCoins || 0)
  

  const handleMining = async () => {
    try {
      const res = await startMining(user.token);
    } catch (error) {
      console.log(error)
    }
  };
  
  const fetchSparkCoins = async (token) => {
    const res = await apiRequest({
        url:"/user/get-spark-coins",
        token: token,
        method: "POST",
    })
    setSparkCoins(res.data)
}

  useEffect( () => {
      const intervalFetch = setInterval(async () => {
      try {
        await fetchSparkCoins(user.token);
    } catch (error) {
        console.error("Error fetching Spark Coins:", error);
    }
}, 3000);
      return () => clearInterval(intervalFetch);
    },[]);

  return (
    <div className=' w-screen h-screen bg-oxford-blue-950 '>
      <div>
        <button onClick={handleMining} className=' text-4xl text-white8  border border-oxford-blue-50 hover:border-oxford-blue-600'>Mine Spark Coins</button>
        <div className=' text-2xl text-white8'>Spark coins:{sparkCoins} </div>
      </div>
    </div>
  )
}

export default CryptoStore
