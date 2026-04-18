import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    company: '',
    agency: 'yes'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (!user.name || !user.email || !user.phone || !user.password) {
      setError("Please fill all required fields");
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    setError('');
    navigate('/profile');
  };

  return (
    <div className="screen-container">
      <h2 className="title">Create your<br />PopX account</h2>

      <CustomInput label="Full Name*" name="name" value={user.name} onChange={handleChange} />
      <CustomInput label="Phone number*" name="phone" value={user.phone} onChange={handleChange} />
      <CustomInput label="Email address*" name="email" type="email" value={user.email} onChange={handleChange} />
      <CustomInput label="Password*" name="password" type="password" value={user.password} onChange={handleChange} />
      <CustomInput label="Company name" name="company" value={user.company} onChange={handleChange} />

      <p className="radio-label">Are you an Agency?*</p>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="agency"
            value="yes"
            checked={user.agency === 'yes'}
            onChange={handleChange}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            name="agency"
            value="no"
            checked={user.agency === 'no'}
            onChange={handleChange}
          />
          No
        </label>
      </div>

      {error && <p className="error-text">{error}</p>}

      <button
        className="primary-btn"
        onClick={handleCreate}
        disabled={!user.name || !user.email || !user.phone || !user.password}
      >
        Create Account
      </button>
    </div>
  );
};

export default Signup;