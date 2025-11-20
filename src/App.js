import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="library-container">
      <h2>My Book Library</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={callApi}>Reload</button>
      </div>

      {loading ? (
        <div className="loader">Loading books...</div>
      ) : (
        <ul className="book-list">
          {filteredBooks.map((book) => (
            <li key={book.id} className="book-card">
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
