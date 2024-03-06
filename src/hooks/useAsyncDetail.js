import {useEffect, useState} from "react";
import {URL} from "../components/config";

export default function useAsyncDetail(id, userRating) {

  const [detail, setDetail] = useState(null);
  const [dtError, setEtError] = useState('')
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setDetailLoading(true)
        const res = await fetch(`${URL}&i=${id}`);
        if (!res.ok) throw new Error(`찾는 영화가 없어요 : ${res.status}`);
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
          userRating: `${userRating || 0}`,
        }
        setDetail(data);
      } catch (err) {
        console.error(err.message);
        setEtError(err.message);
      } finally {
        setDetailLoading(false);
      }
    }

    if (id !== '') {
      getData();
      setEtError('');
    }
  },[id])

  return [detail, detailLoading, dtError];
}
