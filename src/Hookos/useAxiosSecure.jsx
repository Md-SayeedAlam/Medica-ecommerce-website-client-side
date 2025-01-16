import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UseAuth from './UseAuth';



const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const{logOut}=UseAuth()

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('ACCESS TOKEN')
        // console.log('request stopped by interceptors',token)
        config.headers.authorization= `Bearer ${token}`
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
)

// intercepts 401 and 403 status
axiosSecure.interceptors.response.use(function(response){
    return response
},async(error)=>{
    const status = error.response.status
    console.log('status error',status)
    // for 401 or 403 logout the user and move the user to the login page
    if(status === 401 ||403 ){
        await logOut()
        navigate('/login')
    }
    return Promise.reject(error)
})



   return axiosSecure
};

export default useAxiosSecure;