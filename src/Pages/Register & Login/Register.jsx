import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../Hookos/UseAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hookos/useAxiosPublic";

const Register = () => {
//   const [error, setError] = useState("");
const axiosPublic = useAxiosPublic()
const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {createUser,updateUserProfile,setUser,googleSignIn} = UseAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


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



  const onSubmit = (data) => {
    // console.log(data);

    createUser(data.email,data.password)
    .then(result=>{
        const loggedUser = result.user
        console.log(loggedUser)
        setUser(loggedUser)

        updateUserProfile(data.name,data.photoURL)
        .then(()=>{
            console.log('profile info updated')

            const userInfo = {
                name:data.name,
                email:data.email,
                image:data.photoURL,
                role:data.role
    
              }
    
    
              axiosPublic.post('/users',userInfo)
              .then(res=>{

                console.log(res.data)

                reset();

                if(res.data.insertedId){
    
                  reset()
                  Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "User Created Successfully",
                      showConfirmButton: false,
                      timer: 1500
                    });
                    navigate('/')
    
                }
              })



            
           

        })
    })

 
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
  
      navigate("/"); 
    } catch (error) {
      console.error("ERROR:", error.message);
  
      toast.error(`Login Failed: ${error.message}`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Register || Medica</title>
      </Helmet>

      <div className="card bg-base-100 w-full max-w-lg  shrink-0  p-10 border border-gray-400 mt-10 mb-10 rounded-lg">
        <h2 className="text-2xl font-semibold text-center">
          Register Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              {...register("name", { required: true })}
              type="text"
              placeholder="name"
              className="input input-bordered"
              //   required
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photo"
              {...register("photoURL", { required: true })}
              type="text"
              placeholder="photo"
             
              className="input input-bordered"
              //   required
            />
            {errors.photoURL && (
              <span className="text-red-600">Photo URL is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              {...register("email", { required: true })}
              type="email"
              placeholder="email"
              className="input input-bordered"
              //   required
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          <select
            {...register("role", {
              required: "Role is required",
              validate: (value) => value !== "" || "Please select a valid role",
            })}
            name="role"
            defaultValue=""
            className="select mt-2 select-bordered w-full max-w-xs"
          >
            <option value="" disabled>
              Choose A Role
            </option>
            <option value="User">User</option>
            <option value="Seller">Seller</option>
           
          </select>
          {errors.role && (
            <span className="text-red-600">{errors.role.message}</span>
          )}

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder="password"
              className="input input-bordered"
              //   required
            />
            {errors.password?.type === "required" && (
              <span className="text-red-600">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-600">
                Password must beat least 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-600">
                Password length can not greater than 20
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-600">
                Password must have one uppercase ,one lowercase,one special
                character
              </span>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-sm absolute right-2 top-11"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            <label className="label">
              <button className="label-text-alt link link-hover">
                Forgot password?
              </button>
            </label>
          </div>

          {/* {error && <p className="text-red-500">{error}</p>} */}

          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none">Register</button>
          </div>

          <div className=" *:w-full space-y-2 mt-5 ">
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white border-gray-300 rounded-none "
            >
              <FcGoogle size={22} /> Login With Google
            </button>
          </div>
        </form>

        <p className="text-center font-semibold ">
          Already have an account? Please{" "}
          <Link className="text-red-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
