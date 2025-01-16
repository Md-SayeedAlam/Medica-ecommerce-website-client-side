import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Capsule from "../Components/Capsule";
import EyeDrop from "../Components/EyeDrop";
import Syrup from "../Components/Syrup";
import Tablet from "../Components/Tablet";
import Vitamin from "../Components/Vitamin";
import Injection from "../Components/Injection";
import Register from "../Pages/Register & Login/Register";
import Login from "../Pages/Register & Login/Login";
import Shop from "../Components/Shop";
import Error from "../Error/Error";

import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import Cart from "../Pages/Dashboard/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers";
import ManageMedicines from "../Pages/Dashboard/ManageMedicines";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/shop',
            element:<Shop></Shop>
        },
        {
            path:'/capsule',
            element:<Capsule></Capsule>
        },
        {
            path:'/eyedrop',
            element:<EyeDrop></EyeDrop>
        },
        {
            path:'/syrup',
            element:<Syrup></Syrup>
        },
        {
            path:'/tablet',
            element:<Tablet></Tablet>
        },
        {
            path:'/vitamin',
            element:<Vitamin></Vitamin>
        },
        {
            path:'/injection',
            element:<Injection></Injection>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
       
      ]
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'myCart',
                element:<Cart></Cart>
            },

            // admin routes
            {
                path:'users',
                element:<AllUsers></AllUsers>
            },



            // seller routes
            {
                path:'manageMedicine',
                element:<ManageMedicines></ManageMedicines>
            },

        ]
    }
  ]);