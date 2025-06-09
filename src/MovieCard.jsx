import React from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";
const MovieCard = ({ cover, title, rating }) => {
  return (
    <section id="moviecard-component" className="movie-card">
      <img src={cover} alt={`poster of ${title}`} className="movie-cover" />
      <div className="movie-content">
        <h2>{title}</h2>
        <p>Rating⭐️: {rating}</p>
      </div>
    </section>
  );
};

export default MovieCard;
