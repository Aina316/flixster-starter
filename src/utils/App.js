const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch now playing");
  return await res.json(); // <- make sure you're returning this
};

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&include_video=false`
  );
  if (!res.ok) throw new Error("Failed to fetch search");
  console.log("22222", res);
  return await res.json(); // <- same here
};

export const fetchGenre = async () => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch now playing");
  return await res.json();
};
