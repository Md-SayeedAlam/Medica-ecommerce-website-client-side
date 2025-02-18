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
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import ManageCategories from "../Pages/Dashboard/ManageCategories";
import Payment from "../Pages/Dashboard/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import AdminHomepage from "../Pages/Dashboard/AdminHomepage";
import SellerHomepage from "../Pages/Dashboard/SellerHomepage";
import PaymentManagement from "../Pages/Dashboard/PaymentManagement";
import SalesReport from "../Pages/Dashboard/SalesReport";
import ManageAdvertise from "../Pages/Dashboard/ManageAdvertisement";
import SellerPaymentHistory from "../Pages/Dashboard/SellerPaymentHistory";
import AskForAdvertise from "../Pages/Dashboard/AskForAdvertise";
import UpdateProfile from "../Pages/Register & Login/UpdateProfile";
import Profile from "../Components/Profile";


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
        {
            path:'/updateProfile',
            element:<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
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
            {
                path:'payment',
                element:<Payment></Payment>
            },
            {
                path:'paymentHistory',
                element:<PaymentHistory></PaymentHistory>
            },
            {
                path:'profile',
                element:<Profile></Profile>
            },





            // admin routes
            {
                path:'users',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                
                // index:true,
                path:'adminHome',
                element:<AdminRoute><AdminHomepage></AdminHomepage></AdminRoute>
            },

            {
                path:'manageCategory',
                element:<AdminRoute><ManageCategories></ManageCategories></AdminRoute>
            },
            {
                path:'paymentManagement',
                element:<AdminRoute><PaymentManagement></PaymentManagement></AdminRoute>
            },
            {
                path:'report',
                element:<AdminRoute><SalesReport></SalesReport></AdminRoute>
            },
            {
                path:'manageAdvertise',
                element:<AdminRoute><ManageAdvertise></ManageAdvertise></AdminRoute>
            },



            // seller routes
            
            
            {
                path:'manageMedicine',
                element:<SellerRoute><ManageMedicines></ManageMedicines></SellerRoute>
            },
            {
                path:'sellerHome',
                element:<SellerRoute><SellerHomepage></SellerHomepage></SellerRoute>
            },
            {
                path:'sellerPaymentHistory',
                element:<SellerRoute><SellerPaymentHistory></SellerPaymentHistory></SellerRoute>
            },
            {
                path:'askForAdvertise',
                element:<SellerRoute><AskForAdvertise></AskForAdvertise></SellerRoute>
            },

        ]
    }
  ]);