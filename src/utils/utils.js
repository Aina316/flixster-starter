const parseMovieData = (movie) => {
  const info = [];
  const data = movie.results;
  console.log("1000", data);
  for (const x of data) {
    info.push({
      id: x.id,
      image: x.poster_path,
      title: x.title,
      rating: x.vote_average,
    });
  }
  return info;
};

export { parseMovieData };
