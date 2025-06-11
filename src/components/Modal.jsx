import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../utils/App";
import { fetchVideoDetails } from "../utils/App";
import "../style/Modal.css";

const Modal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        const data_video = await fetchVideoDetails(movieId);
        // const getTrailer = (data_video) => {
        //   for (const data in data_video) {
        //     if (data.name === "Official Trailer") {
        //       const result = data.key;
        //       return result;
        //     }
        //     return null;
        //   }
        // };
        setVideo(data_video);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) loadDetails();
  }, [movieId]);

  if (!movieId || loading) return null;
  const getTrailer = (video) => {
    console.log("1987", video);
    for (const data of video.results) {
      if (
        data.name === "Official Trailer" ||
        data.name === "Official US Trailer"
      ) {
        const result = data.key;
        console.log("1988", result);
        return result;
      }
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          className="modal-backdrop"
        />
        <p>
          <strong>Runtime:</strong> {movie.runtime} minutes
        </p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
        </p>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <iframe
          width="450"
          height="255"
          src={`https://www.youtube.com/embed/${getTrailer(
            video
          )}?si=VNpPSVYwaMjZiu5i`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;
