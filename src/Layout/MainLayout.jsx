import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
// import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
           
            <Navbar></Navbar>
            
            <Outlet></Outlet>
            
            <Footer></Footer>
            {/* <div>
            <Toaster />
            </div> */}
        </div>
    );
};

export default MainLayout;