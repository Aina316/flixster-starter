import { useState, useEffect } from "react";
import MovieList from "./MovieList";
import { fetchMovies } from "./utils/App";
import { searchMovies } from "./utils/App";
import "./App.css";
import { fetchGenre } from "./utils/App";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const genre = fetchGenre();
  console.log("1988388", genre);

  const loadMovies = async (isNewSearch = false) => {
    setLoading(true);
    try {
      const data = query
        ? await searchMovies(query, isNewSearch ? 1 : page)
        : await fetchMovies(isNewSearch ? 1 : page);
      const filteredData = data.results.filter(
        (movie) => movie.poster_path !== null
      );
      console.log("1234", filteredData);
      setMovies((prevMovies) =>
        isNewSearch ? filteredData : [...prevMovies, ...filteredData]
      );
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadMovies(true);
  }, [query]);

  useEffect(() => {
    if (page > 1) loadMovies(false);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const clearSearch = () => {
    setQuery("");
  };
  return (
    <div className="App">
      <header className="app-header">
        <h1>Flixster 🎬🍿</h1>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
        />
        <button id="search-btn" onClick={searchMovies}>
          Seacrh
        </button>
        <button id="clear-btn" onClick={clearSearch}>
          Clear
        </button>
      </header>

      <main id="main-movie-cards">
        <h2>{query ? `Results for "${query}"` : "Now Playing"}</h2>
        <MovieList movies={movies} />

        {loading && <p>Loading...</p>}

        {!loading && page < totalPages && (
          <div className="load-more-movies">
            <button onClick={handleLoadMore}>More Movies 🎬</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
