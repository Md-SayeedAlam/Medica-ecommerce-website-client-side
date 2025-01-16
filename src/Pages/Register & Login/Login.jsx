import React, { useContext, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import UseAuth from '../../Hookos/UseAuth';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../Hookos/useAxiosPublic';


const Login = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const {googleSignIn,signIn,setUser}=UseAuth();
  const axiosPublic= useAxiosPublic()
const  from = location.state?.from?.pathname || '/'

 const handleSubmit = e =>{
    e.preventDefault();
    const email = e.target.email.value;
        
        const password = e.target.password.value;
      
        // console.log(email,password)

        
        signIn(email,password)
    .then(result=>{
      const user = result.user
      
      e.target.reset()
      setUser(user)
      toast.success('login successful' ,{position: "top-center",
        autoClose: 2000,})
    //   navigate('/')
      
    navigate(from,{replace:true})
    })
    .catch(err=>{
      
      toast.error(`Login failed: ${err.message}`, {
        position: "top-center",
        autoClose: 2000,
    })
    })
 }


 const setUserRole = async (user) => {
    try {
      const userData = {
        email: user.email,
        name: user.displayName || "Anonymous",
        image: user.photoURL || "",
        role: "User", // Default role for social login
      };

      // Send a request to your server to save the user in MongoDB

      const res = await axiosPublic.post("/users", userData);

      console.log("User role set or verified:", res.data);
      
    } catch (error) {
      console.error("Error setting user role:", error);
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn(); 
      await setUserRole(result.user); 
      console.log(result.user);
  
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 2000,
      });
  
      navigate(from,{replace:true})
    } catch (error) {
      console.error("ERROR:", error.message);
  
      toast.error(`Login Failed: ${error.message}`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };







//  const handleGoogleSignIn=()=>{
//   googleSignIn()
//   .then(result=>{
//     toast.success('login successful' ,{position: "top-center",
//       autoClose: 2000,})
//     // navigate(location?.state ? location.state : "/");
//     navigate('/')
//   })
//   .catch(err=>{
//     // console.log("ERROR",err.message)
//     toast.error(`Login failed: ${err.message}`, {
//       position: "top-center",
//       autoClose: 2000,
//   })
//   })
//  }


    return (
        <div className="min-h-screen flex justify-center items-center">
            <Helmet>
                    <title>Login || Medica</title>
                  </Helmet>
        <div className="card bg-base-100 w-full max-w-lg  shrink-0  p-10 border border-gray-400 mt-10 mb-10 rounded-lg">
          <h2 className="text-2xl font-semibold text-center">
            Login Your Account
          </h2>
          <form
           onSubmit={handleSubmit} 
           className="card-body">
  
  
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
  
  
          
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
  
  
              {/* <label className="label">
                <Link  to='/forgotPassword' className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label> */}
  
  
  
              <label className="label">
                <button
              
                  className="label-text-alt link link-hover">
                  Forgot password?
                </button>
              </label>
  
  
  
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral rounded-none">Login</button>
            </div>
  
           
            <div className=" *:w-full space-y-2 mt-5 ">
             
              <button 
              onClick={handleGoogleSignIn}
               className="btn bg-white border-gray-300 rounded-none ">
                <FcGoogle size={22} /> Login With Google
              </button>
  
              
            </div>
          </form>
          <p className="text-center font-semibold rounded-none">
            Don`t have an account? Please{" "}
            <Link className="text-red-500" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    );
};

export default Login;