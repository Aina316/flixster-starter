import React from "react";
import MovieCard from "./MovieCard";
import "../style/MovieList.css";
const MovieList = ({
  movies,
  onCardClick,
  onFavorites,
  onWatched,
  favs,
  watched,
}) => {
  if (!movies || movies.length === 0) {
    return <p>No movies available.</p>;
  }
  return (
    <div id="movielist-component">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onCardClick}
          onFavorites={onFavorites}
          onWatched={onWatched}
          favs={favs}
          watched={watched}
        />
      ))}
    </div>
  );
};

export default MovieList;
