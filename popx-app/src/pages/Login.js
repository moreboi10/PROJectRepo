import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!storedUser) {
      setError("No account found. Please sign up.");
      return;
    }

    if (
      storedUser.email === form.email &&
      storedUser.password === form.password
    ) {
      setError('');
      navigate('/profile');
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="screen-container">
      <h2 className="title">Signin to your<br />PopX account</h2>

      <p className="subtitle">
        Lorem ipsum dolor sit amet,<br />
        consectetur adipiscing elit,
      </p>

      <CustomInput
        label="Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <CustomInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      {error && <p className="error-text">{error}</p>}

      <button
        className="secondary-btn"
        onClick={handleLogin}
        disabled={!form.email || !form.password}
      >
        Login
      </button>
    </div>
  );
};

export default Login;