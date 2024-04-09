import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../components/TopBar';
import ProfileCard from '../components/ProfileCard';
import FriendsCard from '../components/FriendsCard';
import { Link } from "react-router-dom";
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import  TextInput  from "../components/TextInput";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import  Loading  from "../components/Loading";
import PostCard from '../components/PostCard';
import EditProfile from '../components/EditProfile';
import { apiRequest, deletePost, fetchAllPosts, getUserInfo, handleUploadImages, likePost, sendFriendRequest } from '../utils';
import { UserLogin } from '../redux/userSlice';

const Home = () => {
  
  const { user, edit } = useSelector(state => state.user);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("")
  const [image, setFile] = useState(null)
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.posts)
  const profilepicUrl = `http://localhost:8080/user/public/`;

  const { register, reset, handleSubmit, formState: { errors }, } = useForm();

  const handlePostSubmit = async(data)=>{
    setPosting(true);
    setErrMsg(" ");
    try {
      const imagecheck = image &&( await handleUploadImages(image))
      const newPost = imagecheck ? { ...data, image: imagecheck } : data;
      const res = await apiRequest({
        url: "/posts/create-post",
        data: newPost,
        token: user.token,
        method: "POST",
      });
      reset({
        description: "",
      });
      setFile(null);
      setErrMsg(res);
      await fetchPost();
      setPosting(false);
    } catch (error) {
      console.log(error)
    }
  };

  const fetchPost = async () => {
    await fetchAllPosts(user.token, dispatch)
    setLoading(false);
  };

  const handleLikePost = async (url) => {
    try{
    await likePost({ url: url, token: user?.token });
    await fetchAllPosts(user.token, dispatch);
    }catch(error){
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try{
    await deletePost(id, user.token);
    await fetchAllPosts(user.token, dispatch);
    }catch(error){
      console.log(error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const res = await apiRequest({
        url:"/user/get-friend-request",
        token: user.token,
        method: "POST",
      });
      setFriendRequest(res?.data)
    } catch (error) {
      console.log(error)
    }
  };

  const fetchFriendSuggestions = async () => {
    try {
      const res = await apiRequest({
        url:"/user/friend-suggestions",
        token: user?.token,
        method: "POST",
      });
      setSuggestedFriends(res?.data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleFriendRequest = async (id)=> {
    try {
      console.log(user)
      const res = await sendFriendRequest(id, user?.token);
      await fetchFriendSuggestions();
    } catch (error) {
      console.log(error)
    }
  };
  const answerFriendRequest = async (id, status)=> {
    try {
        const res = await apiRequest({
        url:"/user/answer-request",
        token: user?.token,
        method: "POST",
        data: { requestId: id, status },
      });
      setFriendRequest(res?.data)
    } catch (error) {
      console.log(error)
    }
  };

  const getUser = async ()=> {
    const res = await getUserInfo(user.id, user?.token);
    const updatedUser = { token: user?.token, ... res };
    dispatch(UserLogin(updatedUser));
  };
  
  useEffect(()=>{
    setLoading(true);
    getUser();
    fetchPost();
    fetchFriendRequests();
    fetchFriendSuggestions();
  }, []);

  return (
    <>
    <div className='w-full px-0 sm:px-20 pb-20 2xl:px-40 bg-oxford-blue-950 lg:rounded-lg h-screen overflow-hidden'>
      <TopBar/>
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>

        {/* LEFT */}
        <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <ProfileCard user={user}/>
          <FriendsCard friends={user?.friends}/>
        </div>

        {/* Center */}
        <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <form onSubmit={handleSubmit(handlePostSubmit)} className='bg-oxford-blue-900 px-4 rounded-lg'>
            <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
            <img
                  src={`${profilepicUrl + user?.profileUrl}`}
                  alt='User Image'
                  className='w-14 h-14 rounded-full object-cover'
                />
                <TextInput
                  styles='w-full rounded-full py-5'
                  placeholder="What's on your mind...."
                  name='description'
                  register={register("description", {
                    required: "We can't post nothing 😂",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
            </div>
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

                <div className='flex items-center justify-between py-4'>
                  <label htmlFor = "imgUpload" className='flex  items-center gap-1 text-grey8 hover:text-white8 cursor-pointer'>
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
                  <label htmlFor = "videoUpload" className='flex  items-center gap-1 text-grey8 hover:text-white8 cursor-pointer'> 
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    accept='.mp4, .wav'
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                  </label>
                  <label htmlFor = "vgifUpload" className='flex  items-center gap-1 text-grey8 hover:text-white8 cursor-pointer'>
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    accept='.gif'
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                  </label>

                  <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type='submit'
                      title='Post'
                      containerStyles='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm'
                    />
                  )}
                </div>
              </div>
          </form>
          {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-grey8'>No Post Available</p>
              </div>
            )}

        </div>

        {/* RAIGHT */}
        <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>

          {/*FRIEND REQUEST*/}
          <div className='w-full bg-oxford-blue-900 shadow-sm rounded-lg px-6 py-5'>
            <div className=' flex items-center justify-between text-xl text-white8 pb-2 border-b border-[#66666645]'>
              <span> Friend Request</span>
              <span>{friendRequest?.length}</span>

            </div>
            <div className='w-full flex-col gap-4 pt-4'>
              {
                friendRequest?.map(({_id, requestFrom:from}) => (
                  <div key={_id} className='flex items-center justify-between'>
                    <Link to={"/profile/"+ from?._id} className=" w-full flex gap-4 items-center cursor-pointer ">
                      <img src={profilepicUrl + from?.profileUrl} 
                      alt={from?.firstName} className='w-10 h-10 object-cover rounded-full'/>
                      <div className='flex-1'>
                      <p className='text-base font-medium text-white8'>
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className='text-sm text-grey8'>
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>
                    <div className='flex gap-1'>
                    <CustomButton
                        title='Accept'
                        onClick={()=> answerFriendRequest(_id, "Accepted")}
                        containerStyles='bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full'
                      />
                      <CustomButton
                        title='Deny'
                        onClick={()=> answerFriendRequest(_id, "Denied")}
                        containerStyles='border border-oxford-blue-900 bg-oxford-blue-950  text-xs text-white8 px-1.5 py-1 rounded-full'
                      />
                    </div>

                  </div>
                ))
              }
            </div>
          </div>

          {/*SUGGESTED FRIENDS*/}
          <div className='w-full bg-oxford-blue-900 shadow-sm rounded-lg px-5 py-5'>
            <div className='flex items-center justify-between text-lg text-white8 borrder-b border-[#66666645]'>
              <span> Friends Suggestions</span>
            </div>
            <div className='w-full flex flex-col gap-4 pt-4'>
              {
                suggestedFriends?.map((friend)=>(
                  <div className=' flex items-center justify-between'
                  key = {friend.id}>
                    <Link to = {"/profile/" + friend?._id}
                    key= {friend?._id}
                    className='w-full flex gap-4 items-center cursor-pointer'>
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
                    <div className='flex gap-1'>
                      <button
                        className='bg-[#0444a430] text-sm text-white p-1 rounded'
                        onClick={()=>handleFriendRequest(friend._id)}
                      >
                        <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                      </button>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    </div>
    { edit && <EditProfile/> }
    </>
  )
}

export default Home
