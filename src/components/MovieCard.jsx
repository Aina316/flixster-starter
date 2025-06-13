import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegular } from "@fortawesome/free-regular-svg-icons";
import { faEye as solidEye } from "@fortawesome/free-solid-svg-icons";
import { faEye as regularEye } from "@fortawesome/free-regular-svg-icons";
library.add(faSolid, faRegular);

import "../style/MovieCard.css";
import "../style/FontAwesome.css";

const MovieCard = ({
  movie,
  onClick,
  onFavorites,
  onWatched,
  favs,
  watched,
}) => {
  const isFavorite = favs.some((x) => x.id === movie.id);
  const isWatched = watched.some((x) => x.id === movie.id);

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
          <FontAwesomeIcon
            className={isFavorite ? "isFavorite" : "notFavorite"}
            icon={isFavorite ? faSolid : faRegular}
            onClick={(e) => {
              e.stopPropagation();
              onFavorites(movie);
            }}
          />

          <FontAwesomeIcon
            className={isWatched ? "isWatched" : "notWatched"}
            icon={isWatched ? solidEye : regularEye}
            onClick={(e) => {
              e.stopPropagation();
              onWatched(movie);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
