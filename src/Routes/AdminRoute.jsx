import React from 'react';
import useAdmin from '../Hookos/useAdmin';
import UseAuth from '../Hookos/UseAuth';
import Loading from '../Components/Loading';
import { Navigate, useLocation } from 'react-router-dom';


const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading]= useAdmin()
    const {user,loading}= UseAuth()
    const location = useLocation()



    
    if (loading || isAdminLoading) {
        return <Loading />;
      }


    if(user && isAdmin){
        return children
    }
    return <Navigate state={{from:location}} replace to='/login'></Navigate>



  
};

export default AdminRoute;