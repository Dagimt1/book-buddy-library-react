import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import bookLogo from './assets/books.png';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        <h1>
          <img id="logo-image" src={bookLogo} alt="BookBuddy logo" />
          Library App
        </h1>
        <nav>
          {token ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <a href="/account">Account</a>
            </>
          ) : (
            <>
              <a href="/">Home</a>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home setToken={setToken} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<SingleBook token={token} />} />
          <Route
            path="/account"
            element={token ? <Account token={token} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
