import React from "react";
import "./Modal.css";
import { fetchGenre } from "./utils/App";

const genre = await fetchGenre();
console.log("1988388", genre);
const Modal = ({ movie }) => {
  return (
    <div id="modal">
      <h2 className="modal-title">{movie.title}</h2>
      <img
        className="modal-image"
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        alt={`Backdrop of ${movie.title}`}
      />
      <h2 className="modal-release-date">{movie.release_date}</h2>
      <p className="modal-overview">{movie.overview}</p>
      {/* <p className="genre"></p>
      <p className="runtime"></p> */}

      <button className="close-btn">Close</button>
    </div>
  );
};

export default Modal;
