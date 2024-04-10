import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import  CustomButton  from "../CustomButton.jsx"
import { useForm } from "react-hook-form";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Logout } from "../../redux/userSlice.jsx";
import { IoGameController } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GiCrownCoin } from "react-icons/gi";
import { useState, useEffect } from 'react';
import { FaInfo } from "react-icons/fa";
import {  startMining, apiRequest } from '../../utils';
import CryptoInfo from '../CryptoInfo.jsx';

const TopBarNoSherch = () => {

    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [sparkCoins, setSparkCoins] = useState(user.sparkCoins || 0)
    const [mining, setMining] = useState(false);
    const [allreadyMining, setAllreadyMining] = useState("");
    const [isCryptoInfoVisible, setIsCryptoInfoVisible] = useState(false);
    const {
        formState: { errors },
      } = useForm();

      let navigate = useNavigate();
      const handleToGameCenter = () => {
        navigate("/gamecenter");
      };

      const handleToTest = () => {
        navigate("/cryptostore");
      };

      const handleMining = async () => {
        try {
          if(!mining){
            setMining(true);
            await startMining(user.token);
            setTimeout(() => {
              setMining(false);
            }, 3600000);
          }else{
            setAllreadyMining("Mining is in colldown");
          }
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

        const handleToggleCryptoInfo = () => {
          setIsCryptoInfoVisible(!isCryptoInfoVisible); // Toggle the visibility state
        };

  return (
    <>
    <div className='topbar w-full flex items-center justify-between py-3 sm:py-4 px-4 bg-oxford-blue-950'>
      <Link to= "/" className=" flex gap-2 items-center">
             <p className=' text-white8 font-serif font-bold text-2xl text-center'>Spark<span className='text-[50px] font-bold'>.</span></p>
      </Link>

      <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'>
        <button onClick={handleMining} className='lg:text-xl text-white8 p-2 bg-azure-radiance-600 hover:bg-azure-radiance-800 rounded-3xl border border-azure-radiance-600 hover:border-oxford-blue-50 mr-3'>Mine Spark Coins</button>
        <div className=' text-azure-radiance-600 cursor-pointer border border-azure-radiance-600 hover:border-oxford-blue-50 rounded-full p-1 '>
        <FaInfo onClick={handleToggleCryptoInfo}/>
        </div>
        <span className='text-[#f64949fe] text-sm'>{allreadyMining}</span>
        <div className='sm:text-2xl text-white8'>Spark coins: {sparkCoins} </div>
      </div>

      {/* ICONS */}
      <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'>
        <div className='text-2xl lg:flex mr-5 text-white8 cursor-pointer' onClick={handleToTest}>
        <GiCrownCoin />
        </div>
        <div className='text-2xl lg:flex mr-5 text-white8 cursor-pointer' onClick={handleToGameCenter}>
         <IoGameController />
        </div>
        <div className='text-2xl lg:flex mr-5 text-white8'>
          <IoMdNotificationsOutline />
        </div>

        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title='Log Out'
            containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full bg-azure-radiance-600 text-white8'
          />
        </div>
      </div>
    </div>
    {isCryptoInfoVisible && <CryptoInfo />}
    </>
  )
}

export default TopBarNoSherch
