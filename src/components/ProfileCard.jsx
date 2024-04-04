import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import {
    BsBriefcase,
    BsFacebook,
    BsInstagram,
    BsPersonFillAdd,
  } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { UpdateProfile } from "../redux/userSlice";
import moment from "moment";


const ProfileCard = ({ user }) => {
        
    const { user: data, edit } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const profilepicUrl = `http://localhost:8080/user/public/`;
      

  return (
    <div>
     <div className='w-full bg-oxford-blue-900 flrc flex-col items-center shadow-sm rounded-xl px-6 py-4 '>
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645] '>
        <Link to={"/profile/"+user?._id} className='flex gap-2'>
            <img src={profilepicUrl + user?.profileUrl} alt={user?.email} className='w-14 h-14 object-cover rounded-full'/>
            <div className='flex flex-col justify-center'>
            <p className='text-lg font-medium text-white8'>
              {user?.firstName} {user?.lastName}</p>
              <span className='text-grey8'>{user?.profession ?? "No Profession"}</span>
              </div>
        </Link>
        <div className=''>
        {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className='text-blue-600 cursor-pointer'
                onClick={() => dispatch(UpdateProfile(true))}
              />
            ) : (
              <button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                onClick={() => {}}
              >
                <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
              </button>
            )}
        </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <div className='flex gap-2 items-center text-white8'>
            <CiLocationOn className='text-xl text-white8' />
            <span>{user?.location ?? "Add Location"}</span>
          </div>
          <div className='flex gap-2 items center text-white8'>
            <BsBriefcase className=' text-lg text-white8' />
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <p className='text-xl text-white8 font-semibold'>
            {user?.friends?.length} Friends
          </p>
          <div className='flex items-center justify-between'>
            <span className='text-grey8'>Profile visits</span>
            <span className='text-grey8 text-lg'>{user?.views?.length}</span>
          </div>
          <span className='text-base text-blue-700'>
            {user?.verified ? "Verified Account" : "Not Verified"}
          </span>

          <div className='flex items-center justify-between'>
            <span className='text-grey8'>Joined</span>
            <span className='text-grey8 text-base'>
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div className=" w-full flex flex-col gap-4 py-4 pb-6 ">
          <p className='text-white8 text-lg font-semibold'>Social Profile</p>

          <div className='flex gap-2 items-center text-grey8'>
            <BsInstagram className=' text-xl text-grey8' />
            <span>Instagram</span>
          </div>
          <div className='flex gap-2 items-center text-grey8'>
            <FaTwitterSquare className=' text-xl text-grey8' />
            <span>Twitter</span>
          </div>
          <div className='flex gap-2 items-center text-grey8'>
            <BsFacebook className=' text-xl text-grey8' />
            <span>Facebook</span>
          </div>
        </div>
     </div>
    </div>
  )
}

export default ProfileCard
