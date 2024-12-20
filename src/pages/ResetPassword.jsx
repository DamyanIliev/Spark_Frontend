import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import  Loading  from "../components/Loading"
import  TextInput  from "../components/TextInput"
import  CustomButton  from "../components/CustomButton.jsx"
import { apiRequest } from '../utils/index.jsx';

const ResetPassword = () => {

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) =>{
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "user/request-changepassword",
        data: data, 
        method: "POST",
      })
      if(res.status = false){
        console.log(res);
        setErrMsg(res);
      }else{
        console.log(res);
        setErrMsg(res)
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error)
      setIsSubmitting(false);
    }
  }
  return (
    <div className='w-full h-[100vh] bg-azure-radiance-500 flex items-center justify-center p-6'>
      <div className=' bg-azure-radiance-700 w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg'>
        <p className='text-white8 text-lg font-semibold'>Email Address</p>

        <span className='text-sm text-grey8'>
          Enter Your email
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='py-4 flex flex-col gap-5'
        >
          <TextInput
            name='email'
            placeholder='email@example.com'
            type='email'
            register={register("email", {
              required: "Email Address is required!",
            })}
            styles='w-full rounded-lg'
            labelStyle='ml-2'
            error={errors.email ? errors.email.message : ""}
          />
          {errMsg?.message && (
            <span
              role='alert'
              className={`text-sm ${
                errMsg?.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#d8d8d8fe]"
              } mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type='submit'
              containerStyles={`justify-center  text-sm font-medium text-white8 bg-azure-radiance-900 rounded-[100px] sm:mt-[10px] sm:mx-32 h-[45px] hover:bg-azure-radiance-800`}
              title='Submit'
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
