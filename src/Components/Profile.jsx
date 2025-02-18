import React from 'react';
import UseAuth from '../Hookos/UseAuth';
import { Link } from 'react-router-dom';

const Profile = () => {
    const {user} = UseAuth()
  
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <section className="max-w-lg mx-auto p-6  shadow-lg rounded-lg mt-10">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <img 
             src={user?.photoURL}
             alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
          />
          
          {/* Name & Email */}
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{user?.displayName}</h2>

          <p className="text-gray-600">{user?.metadata?.creationTime}</p>

          <p className="text-gray-500">{user?.email}</p>
  
          {/* Bio Section */}
          <p className="text-gray-700 text-center mt-4 px-4">
            MERN Stack Developer | React.js & Node.js Expert | Passionate about building scalable web apps 🚀
          </p>
  
          {/* Edit Button */}
          <Link to='/updateProfile' >
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Update Profile
          </button>
          </Link>
          
                     
                   



        </div>
      </section>
        </div>

    );
};

export default Profile;