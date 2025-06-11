import React from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies available.</p>;
  }
  console.log("222", movies);
  return (
    <div id="movielist-component">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
