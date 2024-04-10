import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import  Loading  from "../components/Loading"
import PostCard from '../components/PostCard';
import FriendsCard from '../components/FriendsCard';
import ProfileCard from '../components/ProfileCard';
import TopBar from '../components/TopBars/TopBar';
import { deletePost, fetchAllPosts, getUserInfo, likePost, profileVisitors } from '../utils';


const Profile = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);
  const url = "/posts/get-user-post/" +id;

  const getUserr = async () => {
    const res = await getUserInfo(id, user?.token);
    setUserInfo(res);
  }

  const getPostt = async () => {
    await fetchAllPosts(user?.token, dispatch, url);
    setLoading(false);
  }

  const handleDelete = async (id) => {
    try{
      await deletePost(id, user.token);
      await getPostt();
      }catch(error){
        console.log(error);
      }
  };

  const handleLikePost = async (url) => {
    try{
      await likePost({ url: url, token: user?.token });
      await getPostt();
      }catch(error){
        console.log(error);
      }
  };

  const profileVisit = async () => {
    try {
      await profileVisitors(id, user?.token);
    } catch (error) {
      console.log(error);
    }
  }

   useEffect(() =>{
    setLoading(true);
    getUserr();
    getPostt();
    profileVisit();
   }, [id]);

  return (
    <>
     <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-oxford-blue-950 lg:rounded-lg h-screen overflow-hidden'>
        <TopBar />
        <div className='w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full'>
          {/* LEFT */}
          <div className='hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <ProfileCard user={userInfo} />

            <div className='block lg:hidden'>
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>
          <div className=' flex-1 h-full bg-oxford-blue-950 px-4 flex flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]s'>
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  post={post}
                  key={post?._id}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-xl text-grey8'>There are no posts at the moment</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
     </div>
    </>
  )
}

export default Profile