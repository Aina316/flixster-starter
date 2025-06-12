import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegular } from "@fortawesome/free-regular-svg-icons";
import { faEye as solidEye } from "@fortawesome/free-solid-svg-icons";
import { faEye as regularEye } from "@fortawesome/free-regular-svg-icons";
library.add(faSolid, faRegular);

import "../style/MovieCard.css";
import "../style/FontAwesome.css";

const MovieCard = ({ movie, onClick }) => {
  const [fav, setFav] = useState(false);
  const [watched, setWatched] = useState(false);

  const makeFavorite = (e) => {
    e.stopPropagation();
    setFav((prev) => !prev);
  };

  const makeWatched = (e) => {
    e.stopPropagation();
    setWatched((prev) => !prev);
  };

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
        <div className="icons">
          <div className="heart" onClick={makeFavorite}>
            <FontAwesomeIcon
              className={fav ? "isFavorite" : "notFavorite"}
              icon={fav ? faSolid : faRegular}
            />
          </div>
          <div className="eye" onClick={makeWatched}>
            <FontAwesomeIcon
              className={watched ? "isWatched" : "notWatched"}
              icon={watched ? solidEye : regularEye}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
