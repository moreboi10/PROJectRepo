import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/user-avatar.jpeg';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      navigate('/login');
    } else {
      setUserData(storedUser);
    }
  }, [navigate]);

  // Prevent render until data is ready
  if (!userData) return null;

  return (
    <div className="screen-container">
      <div style={{ height: '100%' }}>
        
        {/* Header */}
        <div style={{ 
          padding: '15px 20px',
          background: '#FFFFFF',
          margin: '-20px',
          marginBottom: '20px',
          borderBottom: '1px solid #EAEAEA'
        }}>
          <h3>Account Settings</h3>
        </div>

        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          <div className="profile-image-wrapper">
            <img src={avatar} alt="User" className="profile-img" />
            
            <div className="camera-icon">
              <svg viewBox="0 0 24 24" fill="white" width="12px" height="12px">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path d="M1.3 6.3a2.3 2.3 0 012.3-2.3h3.5a1 1 0 00.8-.4l1-1.3a2.3 2.3 0 011.8-.8h2.6c.7 0 1.4.3 1.8.8l1 1.3a1 1 0 00.8.4h3.5a2.3 2.3 0 012.3 2.3v10.4a2.3 2.3 0 01-2.3 2.3H3.6a2.3 2.3 0 01-2.3-2.3V6.3z" />
              </svg>
            </div>
          </div>

          <div>
            <h4 style={{ margin: 0 }}>{userData.name}</h4>
            <p style={{ margin: 0, color: '#666' }}>{userData.email}</p>
          </div>
        </div>

        {/* Description */}
        <p style={{ marginTop: '25px', fontSize: '14px', lineHeight: '1.5' }}>
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr...
        </p>

        <div style={{ borderBottom: '1px dashed #CBC3E3', marginTop: '30px' }} />

        {/* Logout Button */}
        <button 
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}
          className="primary-btn"
          style={{ marginTop: '30px' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;