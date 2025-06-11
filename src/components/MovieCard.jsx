import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegular } from "@fortawesome/free-regular-svg-icons";
library.add(faSolid, faRegular);

import "../style/MovieCard.css";
import "../style/FontAwesome.css";

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
        {/* <FontAwesomeIcon icon={faSolid} /> */}
        <FontAwesomeIcon className="favorite" icon={faRegular} />
      </div>
    </div>
  );
};

export default MovieCard;
