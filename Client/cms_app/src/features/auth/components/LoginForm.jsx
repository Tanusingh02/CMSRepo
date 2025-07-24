import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css'// External CSS file
 
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // fallback if not coming from a protected route
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
 
      if (!response.ok) {
        throw new Error('Incorrect email or password');
      }
 
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user._id); 
      //added local storage role.
      localStorage.setItem("userRole", data.user.role);
 
      setError('');
      onLogin(data.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };
 
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>DCX CMS</h2>
 
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
       
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">Sign in</button>
      </form>
    </div>
  );
}
 
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
 
export default LoginForm;
 
