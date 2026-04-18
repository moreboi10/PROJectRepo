import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="screen-container welcome-container">
      <div className="welcome-content">
        <h2 className="title">Welcome to PopX</h2>

        <p className="subtitle">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate('/signup')}
        >
          Create Account
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate('/login')}
        >
          Already Registered? Login
        </button>
      </div>
    </div>
  );
};

export default Welcome;