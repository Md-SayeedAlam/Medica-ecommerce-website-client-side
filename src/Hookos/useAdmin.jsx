
import React from 'react';


import UseAuth from './UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user,loading}=UseAuth()
    const axiosSecure = useAxiosSecure()
     const {data:isAdmin,isPending:isAdminLoading} = useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log(res.data)
            return res.data?.admin
        }
    })
    return[isAdmin,isAdminLoading]
};

export default useAdmin;