import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkOutBook, returnBook } from '../api';

function SingleBook({ token }) {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`);
      const data = await response.json();
      setBook(data.book);
    }

    fetchBook();
  }, [bookId]);

  const handleCheckOut = async () => {
    if (!token) {
      setError('You must be logged in to check out a book.');
      return;
    }
    const data = await checkOutBook(bookId, token);
    setBook(data);
  };

  const handleReturn = async () => {
    if (!token) {
      setError('You must be logged in to return a book.');
      return;
    }
    const data = await returnBook(bookId, token);
    setBook(data);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <img src={book.coverimage} alt={book.title} />
      <p>{book.description}</p>
      <p>{book.available ? 'Available' : 'Checked out'}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {book.available ? (
        <button onClick={handleCheckOut}>Check Out</button>
      ) : (
        <button onClick={handleReturn}>Return</button>
      )}
    </div>
  );
}

export default SingleBook;
