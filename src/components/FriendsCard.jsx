import React from 'react'
import { Link } from "react-router-dom";

const FriendsCard = ({ friends }) => {

  const profilepicUrl = `http://localhost:8080/user/public/`; 

  return (
    <div>
      <div className='w-full bg-oxford-blue-900 shadow-sm rounded-lg px-6 py-5'>
        <div className='flex items-center justify-between text-white8 pb-2 border-b border-[#66666645]'>
          <span> Friends</span>
          <span>{friends?.length}</span>
        </div>
        <div className='w-full flex flex-col gap-4 pt-4'>
          {friends?.map((friend) => (
            <Link
              to={"/profile/" + friend?._id}
              key={friend?._id}
              className='w-full flex gap-4 items-center cursor-pointer'
            >
              <img
                src={profilepicUrl + friend?.profileUrl}
                alt={friend?.firstName}
                className='w-10 h-10 object-cover rounded-full'
              />
              <div className='flex-1'>
                <p className='text-base font-medium text-white8'>
                  {friend?.firstName} {friend?.lastName}
                </p>
                <span className='text-sm text-grey8'>
                  {friend?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FriendsCard
