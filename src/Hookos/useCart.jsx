import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import UseAuth from './UseAuth';

const useCart = () => {
    const {user} = UseAuth()
    const axiosSecure = useAxiosSecure()
    const {data:cart = [],refetch}= useQuery({
        queryKey:['carts',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/carts?email=${user.email}`)

            
            console.log(res.data)
            return res.data
        }
    })


    return [cart,refetch]
};

export default useCart;