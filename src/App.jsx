import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieModal from "./components/Modal";
import { fetchMovies } from "./utils/App";
import { fetchSearchMovies } from "./utils/App";
import "./style/App.css";

function App() {
  const [sortOption, setSortOption] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("now_playing");

  const sortMovies = (movieList) => {
    const sorted = [...movieList];

    if (sortOption === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "release_date") {
      sorted.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (sortOption === "vote_average") {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    } else {
      return sorted;
    }
    return sorted;
  };

  const loadMovies = async (isNewSearch = false) => {
    setLoading(true);
    try {
      const data =
        mode === "search"
          ? await fetchSearchMovies(query, isNewSearch ? 1 : page)
          : await fetchMovies(isNewSearch ? 1 : page);
      const filteredData = data.results.filter(
        (movie) => movie.poster_path !== null
      );

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
  }, [mode, query]);

  useEffect(() => {
    if (page > 1) loadMovies(false);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const searchMovies = () => {
    if (searchInput.trim()) {
      setQuery(searchInput.trim());
      setMode("search");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setQuery("");
    setPage(1);
    setMode("now_playing");
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="header-title">Flixster 🎬🍿</h1>
        <div className="toggle-buttons">
          <button
            className={mode === "now_playing" ? "active" : ""}
            onClick={() => {
              setSearchInput("");
              setQuery("");
              setMode("now_playing");
            }}
          >
            Now Playing
          </button>
          <button
            className={mode === "now_playing" ? "active" : ""}
            onClick={() => {
              setMovies([]);
              setMode("search");
            }}
          >
            Search
          </button>
        </div>

        {mode === "search" && (
          <div className="box">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-bar"
            />
            <button id="search-btn" onClick={searchMovies}>
              Search
            </button>
            <button id="clear-btn" onClick={clearSearch}>
              Clear
            </button>
          </div>
        )}
        <div className="sort-box">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-dropdown"
          >
            <option value="">Default</option>
            <option value="title">Title (A–Z)</option>
            <option value="release_date">Release Date (Newest)</option>
            <option value="vote_average">Rating (Highest)</option>
          </select>
        </div>
      </header>

      <main id="main-movie-cards">
        <h2>
          {mode === "search"
            ? `Results for "${query ? query : "search"}"`
            : "Now Playing"}
        </h2>

        <MovieList
          movies={sortMovies(movies)}
          onCardClick={setSelectedMovieId}
        />

        {selectedMovieId && (
          <MovieModal
            movieId={selectedMovieId}
            onClose={() => setSelectedMovieId(null)}
          />
        )}

        {loading && <p>Loading...</p>}

        {!loading && page < totalPages && (
          <div className="load-more-movies">
            <button onClick={handleLoadMore}>More Movies 🎬</button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <h4 className="footer-title">Emmanuel Aina</h4>
        <div className="socials">
          <ul className="icons">
            <li>
              <a
                href="https://www.instagram.com/yonko_darasimi?igsh=MWN3MDR1Mm93aW1xdA=="
                className="icon brands alt fa-instagram"
              >
                <span className="label">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Aina316"
                className="icon brands alt fa-github"
              >
                <span className="label">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/emmanuelaina4/"
                className="icon brands alt fa-linkedin-in"
              >
                <span className="label">LinkedIn</span>
              </a>
            </li>
          </ul>
          <ul className="copyright">
            <li>
              <b>Copyright &copy; 2024 | All Rights Reserved</b>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
