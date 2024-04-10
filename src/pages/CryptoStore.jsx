import React from 'react'
import {  apiRequest, fetchAllListings, deleteListing } from '../utils';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../components/CustomButton';
import  TextInput  from "../components/TextInput";
import  Loading  from "../components/Loading";
import { BiImages } from "react-icons/bi";
import { handleUploadImages } from '../utils';
import ListingCard from '../components/ListingCard';
import TopBarNoSherch from '../components/TopBars/TopBarNoSherch';

const CryptoStore = () => {
  const { user } = useSelector(state => state.user);
  const [sparkCoins, setSparkCoins] = useState(user.sparkCoins || 0)
  const [isListing, setIsListing] = useState(false);
  const [loading, setLoading] = useState("");
  const [image, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const { listings } = useSelector((state) => state.listings)
  const dispatch = useDispatch()
  const profilepicUrl = `http://localhost:8080/user/public/`;

  const { register, reset, handleSubmit, formState: { errors }, } = useForm();

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

    const handleListingSubmit = async (data) =>{
      setIsListing(true);
      setErrMsg(" ");
      try{
      const uploadedImage = image && (await handleUploadImages(image));
      const newListing = { ...data, image: uploadedImage };
      const res = await apiRequest({
      url: "/store/list-item",
      data: newListing , 
      token: user.token,
      method: "POST",
    });
      reset({
        description: "",
      });
      setFile(null);
      setErrMsg(res);
      await fetchListings();
      setIsListing(false);
    }catch (error){
      console.log(error);
    }
  }


    const fetchListings = async () => {
      await fetchAllListings(user.token, dispatch);
      setLoading(false);
    }

    const handleDelete = async (id) => {
      try{
      await deleteListing(id, user.token);
      await fetchAllListings(user.token, dispatch);
      }catch(error){
        console.log(error);
      }
    };

    const handleSold = async (id) => {
      try{
          const res = await apiRequest({
              url: "/store/" + id,
              token: user.token,
              method: "POST",
          })
          setErrMsg2(res);
          await fetchSparkCoins(user.token);
        await fetchAllListings(user.token, dispatch);
      }catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      setLoading(true);
      fetchListings();
    }, []);

  return (
    <>
    <div className='w-full px-0 sm:px-20 pb-20 2xl:px-40 bg-oxford-blue-950 lg:rounded-lg h-screen overflow-hidden'>
      <TopBarNoSherch/>
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
       <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <form onSubmit={handleSubmit(handleListingSubmit)} className='mx-5 bg-oxford-blue-900 px-4 rounded-lg'>
            <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
            <img
                  src={`${profilepicUrl + user?.profileUrl}`}
                  alt='User Image'
                  className='mx-2 w-14 h-14 rounded-full object-cover'
                />
                <TextInput
                  styles=' mx-8 w-11/12 rounded-full py-5'
                  placeholder="Describe your listing"
                  name='description'
                  register={register("description", {
                    required: "We can't list nothing 😂",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
                <TextInput
                  styles=' w-11/12 rounded-full py-5'
                  placeholder="Price"
                  name='price'
                  register={register("price", {
                  required: "Price is required",
                })}
                  error={errors.price ? errors.price.message : ""}
                />
                <label htmlFor = "imgUpload" className='mx-8 flex items-center gap-1 text-grey8 hover:text-white8 cursor-pointer'>
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='imgUpload'
                    data-max-size='5120'
                    accept='.jpg, .png, .jpeg'
                  />
                  <BiImages/>
                  <span>Image</span>
                  </label>
                  
                  <div className='mx-8'>
                  {isListing ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type='submit'
                      title='List It'
                      containerStyles=' w-[85px] bg-azure-radiance-600 text-white py-1 px-6 rounded-full font-semibold text-sm'
                    />
                  )}
                </div>
            </div>
            <div className=' text-center'>
            {errMsg?.message && (
                <span
                  role='alert'
                  className={`text-sm ${ errMsg?.status === false ? "text-[#f64949fe]" : "text-[#2ba150fe]" } mt-0.5`}
                >
                  {errMsg?.message}
                </span> 
                )}
            </div>
          </form>
          <div className="flex flex-wrap justify-center ">
          {loading ? (
              <Loading />
            ) : listings?.length > 0 ? (
              listings?.map((listing) => (
                <ListingCard
                  key={listing?._id}
                  listing={listing}
                  user={user}
                  deletelisting={handleDelete}
                  sold={handleSold}
                  errMsg={errMsg2}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-grey8'>No Listings At The Moment</p>
              </div>
            )}
          </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default CryptoStore
