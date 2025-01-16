
import React from 'react';
import lottieLoading from '../assets/lottie/loading.json'
import Lottie from 'lottie-react';
const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
                <Lottie animationData={lottieLoading} />
                {/* <span className="loading loading-spinner size-20 text-accent"></span> */}
                <h2 className='text-green-600 font-bold text-5xl'>Loading</h2>
            </div>
    );
};

export default Loading;