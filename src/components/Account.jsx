import React, { useEffect, useState } from 'react';
import { getUserReservations, returnBook } from '../api';

function Account({ token }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await getUserReservations(token);
        setBooks(data);
      } catch (error) {
        setError('Failed to fetch reservations.');
      }
    }

    fetchReservations();
  }, [token]);

  const handleReturn = async (bookId) => {
    try {
      await returnBook(bookId, token);
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      setError('Failed to return the book.');
    }
  };

  if (error) return <p>{error}</p>;

  if (!Array.isArray(books)) {
    return <p>Error: Invalid data format received.</p>;
  }

  return (
    <div>
      <h2>My Account</h2>
      <h3>Checked Out Books</h3>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <p>{book.title} by {book.author}</p>
            <button onClick={() => handleReturn(book.id)}>Return Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Account;
