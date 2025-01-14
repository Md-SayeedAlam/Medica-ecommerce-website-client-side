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


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
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
      ]
    },
  ]);