import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios-config';

function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = form;

    // Allowed email domains
    const allowedDomains = [
      'gmail.com', 'yahoo.co.in', 'outlook.com', 'hotmail.com',
      'protonmail.com', 'icloud.com', 'yahoo.com', 'aol.com'
    ];

    // Validation
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    const emailParts = email.split('@');
    if (
      emailParts.length !== 2 ||
      !allowedDomains.includes(emailParts[1].toLowerCase())
    ) {
      alert(`Email must end with one of: ${allowedDomains.join(', ')}`);
      return;
    }

    try {
      await api.post('/api/register', form);
      alert('User registered!');
      navigate('/tasks'); // or navigate('/login') if preferred
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        alert('This email is already registered.');
      } else {
        alert('Something went wrong!');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="form-control mb-2"
        />
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="form-control mb-2"
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="form-control mb-2"
        />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default SignUp;
