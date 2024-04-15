import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import  TextInput  from "../TextInput.jsx"
import  CustomButton  from "../CustomButton.jsx"
import { useForm } from "react-hook-form";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Logout } from "../../redux/userSlice.jsx";
import { fetchAllPosts } from '../../utils/index.jsx';
import { IoGameController } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GiCrownCoin } from "react-icons/gi";

const TopBar = () => {

    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const handleSearch = async (data) => {
        await fetchAllPosts(user.token, dispatch, "", data);
      };

      let navigate = useNavigate();
      const handleToGameCenter = () => {
        navigate("/gamecenter");
      };

      const handleToTest = () => {
        navigate("/cryptostore");
      };

  return (
    <div className='topbar w-full flex items-center justify-between py-3 sm:py-4 px-4 bg-oxford-blue-950'>
      <Link to= "/" className=" flex gap-2 items-center">
             <p className=' text-white8 font-serif font-bold text-2xl text-center'>Spark<span className='text-[50px] font-bold'>.</span></p>
      </Link>
      <form
        className='hidden sm:flex items-center justify-center'
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput 
          placeholder='Find a news...'
          styles=' hidden sm:hidden lg:inline-block lg:w-[580px] text-white8 rounded-l-full py-3 bg-oxford-blue-900'
          register={register("search")}
        />
        <CustomButton
          title='Find'
          type='submit'
          containerStyles='hidden sm:hidden lg:inline-block w-[70px] lg:w-[79px] bg-azure-radiance-600 text-white8 px-6 py-2.5 mt-2 rounded-r-full border border-[#66666690] outline-none'
        />
      </form>

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
  )
}

export default TopBar
