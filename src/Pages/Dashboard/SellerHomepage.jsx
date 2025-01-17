import React from 'react';
import useAxiosSecure from '../../Hookos/useAxiosSecure';
import UseAuth from '../../Hookos/UseAuth';

const SellerHomepage = () => {


    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();


    return (
        <div>
            <div>
            <h2 className="text-3xl">
        <span> Hi Welcome</span>

        {user?.displayName ? user.displayName : "Back"}
      </h2>
        </div>
        </div>
    );
};

export default SellerHomepage;