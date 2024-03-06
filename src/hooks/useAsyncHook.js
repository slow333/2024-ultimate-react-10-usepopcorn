import {useEffect, useState} from "react";
import {URL} from "../components/config";

function useAsyncHook(query) {
  const [movies, setMovies] = useState([]);
  const [mvError, setMvError] = useState('')
  const [movieLoading, setMovieLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      if (!query) return;
      try {
        setMovieLoading(true)
        // if (query.length < 4) return;
        const res =
             await fetch(`${URL}&s=${query}`);
        if (!res.ok) throw new Error(`찾는 영화가 없어요 : ${res.status}`);
        const data = await res.json();
        if (data.Response === 'False') throw new Error(`찾는 영화가 없어요 : ${res.status}`);
        const movieData = data.Search.map(data => {
          return {
            title: data.Title,
            year: data.Year,
            poster: data.Poster,
            imdbID: data.imdbID,
          }
        })
        setMovies(movieData)
      } catch (err) {
        console.log(err);
        setMvError(err.message);
      } finally {
        setMovieLoading(false)
      }
    }

    if (query !== '') {
      getData();
      setMvError('')
    }
  }, [query]);

  return [movies, movieLoading, mvError];
}

export default useAsyncHook;