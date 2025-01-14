import React, { useEffect, useState } from 'react';

const useMedicineCategory = () => {
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        fetch('http://localhost:5000/medicine')
        .then(res=>res.json())
        .then(data=>{
            setCategories(data)
            setLoading(false)
        })
    },[])
    return [categories,loading]
};

export default useMedicineCategory;