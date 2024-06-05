import { useEffect, useState } from 'react';

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.books) {
          setBooks(data.books);
        } else {
          throw new Error('Error fetching books');
        }
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setError(error.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Library Books</h2>
      {books.length > 0 ? (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <a href={`/books/${book.id}`}>{book.title}</a> by {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default Books;
