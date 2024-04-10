import React from 'react'
import { MdClose } from "react-icons/md";
import { useState } from 'react';

const CryptoInfo = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false); // Set the state to false to hide the overlay
    };


  return (
    <>
    {isVisible && (
        <div className='fixed z-50 inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='absolute inset-0 bg-oxford-blue-950 opacity-70'></div>

                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
                <div
                    className='inline-block align-bottom bg-oxford-blue-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby='modal-headline'
                >
                    <div className='flex justify-between px-6 py-3'>
                        <label htmlFor='name' className='block font-medium text-2xl text-white8 text-left'> Information </label>

                            <button className='text-white8' onClick={handleClose}>
                                <MdClose size={22} />
                            </button>
                    </div>
                    <div className='border border-grey8 rounded-lg py-3 mx-2 mb-3 '>
                        <div className='text-xl text-white8 px-6 mb-1'>About Spark Coins</div>
                        <div className='text text-white8 px-6'>Current Price:<span className='text-sm text-azure-radiance-600'> 0.00USD</span></div>
                        <div className='text text-white8 px-6'>Usability:<span className='text-sm text-grey8'> You can use it to bay and sale items in our store</span></div>
                    </div>
                    <div className='border border-grey8 rounded-lg py-3 mx-2 mb-3'>
                        <div className='text-xl text-white8 px-6 mb-1'>Mining Rules</div>
                        <div className='text text-white8 px-6'>Mining Rate:<span className='text-sm text-grey8'> 1200/hour</span></div>
                        <div className='text text-white8 px-6'>Mining Session:<span className='text-sm text-grey8'> Mining sesion length is 1 hour</span></div>
                        <div className='text text-white8 px-6'>Mining Colldown:<span className='text-sm text-grey8'> You are in a colldown while you are mining</span></div>
                        <div className='text text-white8 px-6'>Mining Limit:<span className='text-sm text-grey8'> You can make up to 24 mining sesions a day</span></div>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
  )
}

export default CryptoInfo
