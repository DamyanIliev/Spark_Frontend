import axios from "axios";
import { SetPosts } from "../redux/postSlice";
import { useDispatch } from 'react-redux';



const API_URL= "http://localhost:8080";

export const API = axios.create({
    baseURL: API_URL, 
    responceType: "json", 
});

export const apiRequest = async ({ url, token, data, method }) => {
    try {
        const result = await API(url, { method: method || "GET", data: data,
         headers:{
            "Content-Type": "application/json", Authorization: token ? `Bearer ${token}`: "",
            },
        })

    return result?.data;
    } catch (error) {
        const err = error.response.data;
        console.log(err);
        return { status: err.success, message: err.message };
    }
}

export const handleUploadImages = async(uploadImage) => {
    
    const formData = new FormData();
    formData.append("image", uploadImage);
    try{
        const result = await axios.post(
            "http://localhost:8080/user/upload-image",
            formData,
            {
                headers: { "Content-Type": "multipart/from-data"}
            }
        )   
        console.log (result.data);
        return result.data;
    }catch (error){
        console.log(error);
    }
}

export const fetchAllPosts = async(token, dispatch, url, data) => {
    try {
        const res = await apiRequest({
            url: url || "/posts",
            token: token,
            method: "POST",
            data: data || {},
        });

        dispatch(SetPosts(res?.data));
        return;
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async({url, token}) => {
    try {
        const res = await apiRequest({
            url: url,
            token: token, 
            method: "POST",
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (id, token) => {
    try {
        const res = await apiRequest({
            url: "/posts" + id,
            token: token,
            method: "DELETE",
        });
        return;
    } catch (error) {
        console.log(error);
    }
}

export const getUserInfo = async (id, token) => {
    try {
        const url = id === undefined ? "/user/get-user" : "user/get-user/" + id;

        const res = await apiRequest({
            url: url,
            token: token, 
            method: "POST",
        })

        if (res?.message === "Authentication failed"){
            localStorage.removeItem("user");
            window.alert("Sesion expired.");
            window,location.replace("/login");
        }

        return res?.user
    } catch (error) {
        console.log(error)
    }
};

export const sendFriendRequest = async (id, token) => {
    const res = await apiRequest({
        url:"user/friend-request",
        token: token,
        method: "POST",
        data:{ requestTo: id }
    })
    return;
}

export const profileVisitors = async (id, token) =>{
    const res = await apiRequest({
        url: "/user/profile-visitors",
        token: token,
        method: "POST",
        data: { id },
    })
    return;
}