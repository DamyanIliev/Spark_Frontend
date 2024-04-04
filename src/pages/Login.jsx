import React from 'react'
import  Loading  from "../components/Loading"
import  TextInput  from "../components/TextInput"
import  CustomButton  from "../components/CustomButton.jsx"
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Link } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import ReCAPTCHA from 'react-google-recaptcha';
import { apiRequest } from '../utils/index.jsx';
import { UserLogin } from '../redux/userSlice.jsx';
// reCAPTCHA Site Key: 6LdQJZYpAAAAAPs04TU83VBtloaYgZfvVP4BMcsA


const Login = () => {

  const [reCap,setReCap] = useState("null")
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting (true);
    try {
      const res = await apiRequest({
        url: "auth/login",
        data: data,
         method:"POST",
      });

      if (res.status === false){
        console.log(res);
        setErrMsg(res);
      }else{
        console.log(res);
        setErrMsg("")
        const newData = { token: res?.jsonWebToken, ...res?.foundUser };
        console.log(newData);
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error)
    }
  };

  return (
  <div className='sm:relative sm:h-[100vh] bg-black'>
    <div className='absolute inset-0 z-0'>
        {/* Spline 3D content */}
        <Spline className='w-full h-full' scene="https://prod.spline.design/LKrPIFOG6IY0mkkw/scene.splinecode" />
      </div>
    <div className=' bg-cherry8  w-screen h-screen absolute bg-center sm:w-[100vh] sm:h-[100vh] sm:w-2/8 sm:right-0'>
      <div className=' inset-x-10  inset-y-10 absolute sm:inset-x-20 '>
        {/* LEFT */}
        <div className=''>
          <div className=''>

            {/* //change logo here */}
          <div className='sm:w-20 sm:h-20 sm:' >
             <img src="/logo/logo.png" alt="Logo" className='h-0 w-0 sm:absolute sm:inset-x-52 sm:h-40 sm:w-40'></img>
             <p className='sm:hidden text-white8 font-serif font-bold text-2xl text-center'>Spark<span className='text-[50px] font-bold'>.</span></p>
            </div>
          </div>

          <p className='mt-4 sm:mt-20 text-center text-white8 sm:text-2xl'>
            Log in
          </p>
          <form
            className='py-1 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full rounded-full'
              labelStyle='ml-2'
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
              styles='w-full rounded-full text-balck'
              labelStyle='ml-2'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
              to='/reset-password'
              className='text-sm text-right text-white8 font-semibold cursor-pointer'
            >
              Forgot Password ?
            </Link>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#d43232fe]"
                    : "text-[#e3e3e3fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            <ReCAPTCHA
            sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            onChange={(val) => setReCap(val)}>
            </ReCAPTCHA>

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
               disabled={!reCap}
                type='submit'
                containerStyles={`justify-center px-2 text-sm font-medium text-white8 bg-azure-radiance-900 rounded-[100px] sm:mx-44 h-[35px] cursor-pointer`}
                title='Login'
              />
            )}
          </form>

          <p className='mt-3 text-center text-white8 font-semibold '>
            Don't have an account?
            <Link
            href="/register"
              to='/register'
              className='ml-2 text-white8 font-semibold border-none cursor-pointer hover:underline'
            >
              Create Account
            </Link>
          </p>
        </div>
        <div className='mt-4 sm:mt-4 bg-cherry8'>
          <div className=''>
            <p className='font-bold text-center text-white8 sm:text-2xl'>
              Connect with friedns & share your joy
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
