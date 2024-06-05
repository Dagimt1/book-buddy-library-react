import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../api';

function Home({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser({ email: username, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/books');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const data = await registerUser({ email, password, firstName, lastName });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/books');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>

        Welcome to the Library App
      </h1>
      <p>Please log in or register to check out and return books.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLogin ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <label>
            Email:
            <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Login</button>
          <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Register</span></p>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Register</button>
          <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
        </form>
      )}
    </div>
  );
}

export default Home;
