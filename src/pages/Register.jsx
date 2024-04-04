import React from 'react'
import  Loading  from "../components/Loading"
import  TextInput  from "../components/TextInput"
import  CustomButton  from "../components/CustomButton.jsx"
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { apiRequest } from '../utils/index.jsx';
// reCAPTCHA Site Key: 6LdQJZYpAAAAAPs04TU83VBtloaYgZfvVP4BMcsA


const Register = () => {

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const[reCap,setReCap] = useState("null")

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });


  const onSubmit = async (data) => {

    setIsSubmitting(true);

    const res = await apiRequest({
      url: "/auth/register",
      data: data,
      method: "POST", 
    });
  
    if (res?.success === "PENDING"){
      console.log(res);
      setErrMsg(res);
      setTimeout(() =>{
        window.location.replace("/login");
      }, 6000)
    }else{
      console.log(res);
      setErrMsg(res);
    }
    setIsSubmitting(false);
  };

  return (
  <div className='sm:relative sm:h-[100vh] bg-black'>
    <div className=' bg-cherry8  w-screen h-screen absolute bg-center sm:w-[100vh] sm:h-[100vh] sm:inset-x-1/4'>
      <div className=' inset-x-10 inset-y-2 sm:inset-y-10 absolute sm:inset-x-20 '>
        <div className=''>
          <div className=''>
          <div className='sm:w-20 sm:h-20 sm:' >
             <img src="/logo/logo.png" alt="Logo" className='h-0 w-0 sm:absolute sm:inset-x-52 sm:h-40 sm:w-40'></img>
             <p className='sm:hidden text-white8 font-serif font-bold text-2xl text-center'>Spark<span className='text-[50px] font-bold'>.</span></p>
            </div>
          </div>

          <p className='mt-1 sm:mt-20 text-center text-white8 sm:text-2xl'>
            Create Your Account
          </p>
          <form
            className='py-1 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          > 
          <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
          <TextInput
            name='firstName'
            label='First Name'
            placeholder='First Name'
            type='text'
            styles='w-full focus:outline-none focus:ring focus:ring-violet-300'
            register={register("firstName", {
              required: "First Name is required!",
            })}
            error={errors.firstName ? errors.firstName?.message : ""}
          />

          <TextInput
            label='Last Name'
            placeholder='Last Name'
            type='lastName'
            styles='w-full focus:outline-none focus:ring focus:ring-violet-300'
            register={register("lastName", {
              required: "Last Name do no match",
            })}
            error={errors.lastName ? errors.lastName?.message : ""}
          />
        </div>
            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full focus:outline-none focus:ring focus:ring-violet-300'
              error={errors.email ? errors.email.message : ""}
            />
             <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
            <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
              styles='w-full text-balck focus:outline-none focus:ring focus:ring-violet-300'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            />

            <TextInput
                label='Confirm Password'
                placeholder='Password'
                type='password'
                styles='w-full text-balck focus:outline-none focus:ring focus:ring-violet-300'
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();

                    if (password != value) {
                      return "Passwords do no match";
                    }
                  },
                })}
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
              </div>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#d43232fe]"
                    : "text-[#d4d4d4fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
               disabled={!reCap}
                type='submit'
                containerStyles={`justify-center px-2 text-sm font-medium text-white8 bg-azure-radiance-900 rounded-[100px] sm:mt-[40px] sm:mx-32 h-[45px] hover:bg-azure-radiance-800`}
                title='Register'
                
              />
            )}
          </form>
          <div className=' mt-5 text-ascent-2 text-sm text-center text-white8'>
            Already has an account?{" "}
            <Link
              to='/login'
              className=' ml-2 p-2 text-white8 font-semibold border-none rounded-[30px] bg-[#26a126] cursor-pointer'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register