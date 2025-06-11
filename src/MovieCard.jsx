import React from "react";
import PropTypes from "prop-types";

import "./MovieCard.css";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div id="moviecard-component" onClick={() => onClick(movie.id)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-cover"
      />
      <div className="movie-content">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-rating">
          Rating⭐ {movie.vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
