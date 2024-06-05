import React from 'react';
import { Link } from 'react-router-dom';

function Navigations({ token, handleLogout }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Books</Link></li>
        {token ? (
          <>
            <li><button onClick={handleLogout}>Logout</button></li>
            <li><Link to="/account" className="account-link">Account</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigations;
