import React from 'react';

import UseAuth from '../Hookos/UseAuth';
import Loading from '../Components/Loading';
import { Navigate, useLocation } from 'react-router-dom';
import useSeller from '../Hookos/useSeller';


const SellerRoute = ({children}) => {
    const [isSeller,isSellerLoading]= useSeller()
    const {user,loading}= UseAuth()
    const location = useLocation()



    
    if(loading || isSellerLoading) {
        return <Loading />;
      }


    if(user && isSeller){
        return children
    }
    return <Navigate state={{from:location}} replace to='/login'></Navigate>



  
};

export default SellerRoute;