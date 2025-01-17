import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useMedicineCategory = () => {
    // const [categories,setCategories] = useState([])
    // const [loading,setLoading] = useState(true)
   
    // useEffect(()=>{
    //     fetch('http://localhost:5000/medicine')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setCategories(data)
    //         setLoading(false)
    //     })
    // },[])
    const axiosPublic = useAxiosPublic()
    const {data:categories=[],refetch,isLoading}=useQuery({
        queryKey:['categories'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/medicine')
            return res.data
        }
        
    })









    return [categories,refetch,isLoading]


};

export default useMedicineCategory;