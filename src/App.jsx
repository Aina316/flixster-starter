import { useState } from "react";
import MovieList from "./MovieList";
import MovieCard from "./MovieCard";
import movie from "./data/data.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="header">Flixster🎬🍿</header>
      <main>
        <MovieList data={movie} />
      </main>
    </div>
  );
};

export default App;
