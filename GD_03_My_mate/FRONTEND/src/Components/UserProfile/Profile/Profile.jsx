import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import UserImage from '../UserImage/UserImage';
import About from '../About/About';
import UserPost from '../UserPost/UserPost';
import Education from '../Education/Education';
import Projects from '../Project/Project';
import WebLinks from '../WebLinks/WebLink';
import Followers from "../Followers/Followers"
import Followings from "../Following/Following"
import './Profile.css';

const Profile = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [userData, setUserData] = useState(null); // Store user data
  const [currentComponent, setCurrentComponent] = useState('About'); // Track the selected component
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userId) {
          console.error('User ID not found in URL params');
          return;
        }

        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/getuser/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();
        if (data && data.user) {
          setUserData(data.user);
        } else {
          console.error('No user data found in response');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userData) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="sidebar-container">
        <ProfileSidebar setCurrentComponent={setCurrentComponent} />
      </div>
      <div className="center-container">
        {currentComponent === 'About' && <About user={userData} />}
        {currentComponent === 'UserPost' && <UserPost />}
        {currentComponent === 'Education' && <Education education={userData.education} />}
        {currentComponent === 'Projects' && <Projects projects={userData.projects} />}
        {currentComponent === 'WebLinks' && <WebLinks weblinks={userData.weblinks} />}
        {currentComponent === 'Followers' && <Followers user={userData} />}
        {currentComponent === 'Followings' && <Followings user={userData} />}
      </div>
      <div className="photo-container">
        <UserImage user={userData} />
      </div>
    </div>
  );
};

export default Profile;
