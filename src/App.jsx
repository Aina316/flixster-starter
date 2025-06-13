import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieModal from "./components/Modal";
import SideBar from "./components/SideBar";
import { fetchMovies } from "./utils/App";
import { fetchSearchMovies } from "./utils/App";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faInstagram, faGithub, faLinkedin);

import "./style/App.css";

function App() {
  const [sortOption, setSortOption] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [pageType, setPageType] = useState("home");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("now_playing");
  const [isOpen, setIsOpen] = useState(true);

  const toggleSide = () => {
    setIsOpen((prev) => !prev);
  };

  const onFavorites = (movie) => {
    setFavoriteMovies((prev) => {
      const favoriteMovieExists = prev.find((x) => x.id === movie.id);
      return favoriteMovieExists
        ? prev.filter((x) => x.id !== movie.id)
        : [...prev, movie];
    });
  };
  const onWatched = (movie) => {
    setWatchedMovies((prev) => {
      const watchedMovieexists = prev.find((x) => x.id === movie.id);
      return watchedMovieexists
        ? prev.filter((x) => x.id !== movie.id)
        : [...prev, movie];
    });
  };

  //function to sort movies
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

  //Function to load now playing movies and searched movies
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
          <button className="sidenav-btn" onClick={toggleSide}>
            ≣
          </button>
          <div>
            <label htmlFor="sort-select">Sort by: </label>
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
        </div>
      </header>

      <main id="main-movie-cards">
        {isOpen && (
          <div>
            <SideBar
              pageType={pageType}
              setPageType={setPageType}
              toggleSide={toggleSide}
            />
          </div>
        )}
        {pageType === "home" && (
          <div>
            <h2 className="current-mode">
              {mode === "search"
                ? `Results for "${query ? query : "search"}"`
                : "Now Showing"}
            </h2>

            <MovieList
              movies={sortMovies(movies)}
              onCardClick={setSelectedMovieId}
              onFavorites={onFavorites}
              onWatched={onWatched}
              favs={favoriteMovies}
              watched={watchedMovies}
            />
          </div>
        )}
        {pageType === "favorites" && (
          <div>
            <h2>Favorites</h2>
            <MovieList
              movies={sortMovies(favoriteMovies)}
              onCardClick={setSelectedMovieId}
              onFavorites={onFavorites}
              onWatched={onWatched}
              favs={favoriteMovies}
              watched={watchedMovies}
            />
          </div>
        )}
        {pageType === "watched" && (
          <div>
            <h2>Watched Movies</h2>
            <MovieList
              movies={sortMovies(watchedMovies)}
              onCardClick={setSelectedMovieId}
              onFavorites={onFavorites}
              onWatched={onWatched}
              favs={favoriteMovies}
              watched={watchedMovies}
            />
          </div>
        )}
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
        <h4 className="footer-title">Emmanuel Aina & Co.</h4>
        <div className="socials">
          <ul className="icons">
            <li>
              <a href="https://github.com/Aina316">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/yonko_darasimi?igsh=MWN3MDR1Mm93aW1xdA==">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/emmanuelaina4/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
          <ul className="copyright">
            <li>
              <b>Copyright &copy; 2025 | All Rights Reserved</b>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
