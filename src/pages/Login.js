import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './All.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5050/api/login', form);

      // ✅ Save userId to localStorage for future API calls
      const userId = res.data.user._id;
      localStorage.setItem('userId', userId);

      alert("Login successful");
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-2"
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="form-control mb-2"
        />
        <button className="btn btn-success">Login</button>
        <h4>
          <span className="Loginscreen_gray"> New here? </span>
          <span
            className="Signupscreen_link"
            onClick={() => navigate("/Signup")}
          >
            Sign up now
          </span>
        </h4>
      </form>
    </div>
  );
}

export default Login;
