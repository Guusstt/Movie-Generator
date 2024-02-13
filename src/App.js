import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_IMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-date">release : {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = (q) => {
    console.log({ q });
    searchMovie(q).then((result) => {
      setPopularMovies(result);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Hunter</h1>
        <input
          placeholder="cari filmnya yuk..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />

        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
