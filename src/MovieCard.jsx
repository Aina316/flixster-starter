import { useState, useEffect } from "react";

import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";
import "./MovieCard.css";
import Modal from "./Modal";
const MovieCard = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="moviecard-component" className="movie-card">
      <div id="movie-card-normal-component" onClick={(e) => setIsOpen(!isOpen)}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`poster of ${movie.title}`}
          className="movie-cover"
        />
        <div className="movie-content">
          <h2>{movie.title}</h2>
          <p>Rating⭐️: {movie.vote_average.toFixed(2)}</p>
        </div>
      </div>
      <div id="movie-card-modal-component">
        {isOpen && (
          <div id="modal">
            <div className="modal-content">
              <h2 className="modal-title">{movie.title}</h2>
              <img
                className="modal-image"
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt={`Backdrop of ${movie.title}`}
              />
              <h2 className="modal-release-date">
                {`Release Date: ${movie.release_date}`}
              </h2>
              <p className="modal-overview">{`Overview: ${movie.overview}`}</p>
              {/* <p className="genre"></p>
      <p className="runtime"></p> */}

              <button className="close-btn">Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieCard;
