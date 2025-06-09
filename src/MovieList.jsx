import React from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { parseMovieData } from "./utils/utils";
function MovieList(props) {
  const preparedData = parseMovieData(props.data);
  return (
    <section id="movielist-component" className="movie-grid">
      {preparedData.map((obj) => {
        return (
          <MovieCard
            key={obj.id}
            cover={obj.image}
            title={obj.title}
            rating={obj.rating}
          />
        );
      })}
    </section>
  );
}

export default MovieList;
