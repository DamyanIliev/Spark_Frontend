import React from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from 'react';


const ListingCard= ({ listing , user, deletelisting, sold, errMsg }) => {

  const [showAll, setShowAll] = useState(0);
  const profilepicUrl = `http://localhost:8080/user/public/`;


  return (
    <div className='mb-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4'>
      <div className='bg-oxford-blue-900 p-4 rounded-xl'>
        <div className=' border-b border-[#bcb9b945]'>
        <p className=' text-center text-white8 text-2xl'>
          {showAll === listing?._id ? listing?.description : listing?.description.slice(0, 300)}
          {listing?.description?.length > 10 && (
            showAll === listing?._id ? (
              <span className='text-blue-600 ml-2 font-mediu cursor-pointer' onClick={() => setShowAll(0)}>Show Less</span>
            ) : (
              <span className='text-blue-600 ml-2 font-mediu cursor-pointer' onClick={() => setShowAll(listing?._id)}>Show More</span>
            )
          )}
        </p>
        {listing?.image && (
          <img
            src={profilepicUrl + listing?.image}
            alt='listing image'
            className='block mx-auto mt-2 rounded-lg h-[160px] w-[170px]'
          />
        )}
        {listing?.price && (
          <p className='mb-2 text-center text-white8 mt-2 text-xl'>Price: <span className='text'>${listing?.price} Spark Coins</span></p>
        )}
        </div>
        <div className='mt-1 flex justify-end'>
          {user._id === listing.userId && (
            <div
              className='flex gap-1 items-center text-base text-white8 cursor-pointer'
              onClick={() => deletelisting("/" + listing?._id)}
            >
              <MdOutlineDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          )}
          </div>
          {user._id !== listing.userId && (
            <>
              <div className=' mx-7 h-8 mt-1 flex justify-center border rounded-2xl bg-green-600 cursor-pointer'>
                <div
                  className='flex gap-1 items-center text-base text-white8 cursor-pointer'
                  onClick={() => sold("/" + listing._id)}
                >
                  <button>Buy</button>
                </div>
              </div>
              <div className=' text-center text-sm'>
              {errMsg?.message && errMsg.id === listing._id && (
                  <span
                    role='alert'
                    className={`text-sm ${ errMsg?.success === false ? "text-[#f64949fe]" : "text-[#2ba150fe]" } mt-0.5`}
                  >
                    {errMsg?.message}
                    {console.log(errMsg)}
                  </span> 
                )}
          </div>
          </>
          )}
      </div>
    </div>
  )
}
export default ListingCard
