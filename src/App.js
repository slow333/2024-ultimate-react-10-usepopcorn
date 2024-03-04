import {useEffect, useState} from "react";
import async from "async";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function App() {
  const KEY = "7c0d2be6"

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [detail, setDetail] = useState(null)

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime.split(' ')[0]));

  let url = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
  useEffect(() => {
    async function getData() {
      if (!query) return;
      try {
        setIsOpen1(false)
        if (query.length < 4) return;
        const res =
          await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        if (!res.ok) throw new Error(`찾는 영화가 없어요 : ${res.status}`);
        const data = await res.json();
        if (data.Response === 'False') throw new Error(`찾는 영화가 없어요 : ${res.status}`);
        setMovies(data.Search)
        setIsOpen1(true)
      } catch (err) {
        console.error(err)
      }
    }

    getData();
  }, [query, url]);

  useEffect(() => {
    const lcWatched = localStorage.getItem('watched');
    if (lcWatched)
      setWatched(JSON.parse(lcWatched));
    else return;
  }, []);

  useEffect(() => {
    if (watched.length === 0) return;
    else localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  async function showDetail(id) {
    console.log(id)
    try {
      const res =
        await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      if (!res.ok) return;
      let data = await res.json();
      data = {
        title: data.Title,
        year: data.Year,
        runtime: data.Runtime,
        genre: data.Genre,
        actors: data.Actors,
        plot: data.Plot,
        poster: data.Poster,
        ratings: data.Ratings,
        imdbRating: data.imdbRating,
        imdbID: data.imdbID,
        userRating: '4.4',
      }
      setDetail(data)
    } catch (err) {
      console.error(err)
    }
  }

  function addWatched(detail) {
    setWatched(watched => [...watched, detail]);
    setIsOpen2(true);
    setDetail(null)
  }

  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>

      <main className="main">
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}>
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list">
              {movies?.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`}
                       onClick={() => showDetail(movie.imdbID)}/>
                  <h3>{movie.Title}</h3>
                  <div><span>{movie.Year}</span></div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}>
            {isOpen2 ? "–" : "+"}
          </button>
          {detail && <div className='details'>
            <div className='section'>
              <div className='header'>
                <h2>{detail.title}</h2>
                <img src={detail.poster} alt={detail.poster}/>
                <div className='rating'>imdb Rating : {detail.imdbRating}</div>
              </div>
              <div className='details-overview'>
                <div className='rating'>
                  <StarRating/>
                  <button className='btn-add'
                          onClick={() => addWatched(detail)}>Add Watched
                  </button>
                </div>
                <p> Actors : {detail.actors}</p>
                <p> Year : {detail.year}</p>
                <p>{detail.plot}</p>
              </div>
            </div>
          </div>}

          {isOpen2 && (
            <>
              <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p><span>#️⃣</span> <span>{watched.length} movies</span></p>
                  <p><span>⭐️</span> <span>{avgImdbRating.toFixed(2)}</span></p>
                  <p><span>🌟</span> <span>{avgUserRating}</span></p>
                  <p><span>⏳</span> <span>{avgRuntime} min</span></p>
                </div>
              </div>

              <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.poster} alt={`${movie.title} poster`}/>
                    <h3>{movie.title}</h3>
                    <div>
                      <p><span>⭐️</span> <span>{movie.imdbRating}</span></p>
                      <p><span>🌟</span> <span>{movie.userRating}</span></p>
                      <p><span>⏳</span> <span>{movie.runtime.split(' ')[0]} min</span></p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
}

function StarRating() {

  function onClickStar(idx) {
    console.log(idx)
  }

  return <div>
    {Array.from({length: 10}, (_, idx) =>
      <Star key={idx} fillColor='orange' width='2.8rem' onclick={() => onClickStar(idx)}/>)}
  </div>
}
function Star({fillColor, stroke='none', width, onclick }) {
  return <span style={{display: 'inline-block', width: `${width}`}} onClick={onclick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={fillColor}
        stroke={stroke}
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    </span>
}