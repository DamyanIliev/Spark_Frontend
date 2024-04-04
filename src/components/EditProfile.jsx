import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../components/TextInput";
import  Loading  from "../components/Loading"
import CustomButton from "./CustomButton";
import { UpdateProfile, UserLogin } from "../redux/userSlice";
import { apiRequest, handleUploadImages } from "../utils";
const EditProfile = () => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState(null);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "onChange",
      defaultValues: { ...user },
    });
  
    const onSubmit = async (data) => {
      setIsSubmitting(true);
      setErrMsg("");
      try {
        const fileName= await handleUploadImages(image);
        const { firstName, lastName, location, profession } = data;
        console.log(fileName);
        
        const res = await apiRequest({ 
          url: "/user/updateUser",
          data: { firstName, lastName, location, profession, profileUrl: fileName},
          method: "PUT",
          token: user.token
        })
        if (res.success === true){
          console.log(res);
          setErrMsg(res);
          const updateUser = { token: res?.newToken, ...res?.newUser };
          console.log(updateUser);
          dispatch(UserLogin(updateUser));
          setTimeout(()=>{
            dispatch(UpdateProfile(false));
          }, 500);
        }else{
          console.log(res);
          setErrMsg(res);
        }
        setIsSubmitting(false)
      } catch (error) {
        console.log(error);
      }
      setIsSubmitting(false);
    };
  
    const handleClose = () => {
      dispatch(UpdateProfile(false));
    };
    const handleSelectImage = (e) => {
      console.log(e.target.files[0])
      setImage(e.target.files[0]);
    };
  
  return (
    <>
    <div className='fixed z-50 inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-oxford-blue-950 opacity-70'></div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
          &#8203;
          <div
            className='inline-block align-bottom bg-oxford-blue-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div className='flex justify-between px-6 pt-5 pb-2'>
              <label
                htmlFor='name'
                className='block font-medium text-xl text-white8 text-left'
              >
                Edit Profile
              </label>

              <button className='text-white8' onClick={handleClose}>
                <MdClose size={22} />
              </button>
            </div>
            <form
              className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                name='firstName'
                label='First Name'
                placeholder='First Name'
                type='text'
                styles='w-full'
                register={register("firstName", {
                  required: "First Name is required!",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />

              <TextInput
                label='Last Name'
                placeholder='Last Name'
                type='lastName'
                styles='w-full'
                register={register("lastName", {
                  required: "Last Name do no match",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />

              <TextInput
                name='profession'
                label='Profession'
                placeholder='Profession'
                type='text'
                styles='w-full'
                register={register("profession", {
                  required: "Profession is required!",
                })}
                error={errors.profession ? errors.profession?.message : ""}
              />

              <TextInput
                label='Location'
                placeholder='Location'
                type='text'
                styles='w-full'
                register={register("location", {
                  required: "Location do no match",
                })}
                error={errors.location ? errors.location?.message : ""}
              />

              <label
                className='flex items-center gap-1 text-base text-ascent-2 hover:text-white8 cursor-pointer my-4'
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className=''
                  id='imgUpload'
                  onChange={(e) => handleSelectImage(e)}
                  accept="image/*"
                />
              </label>

              {errMsg?.message && (
                <span
                  role='alert'
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className='py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]'>
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type='submit'
                    containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                    title='Submit'
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
        
      
    </>
  )
}

export default EditProfile
