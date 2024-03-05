import {useEffect, useState} from "react";
import {URL} from "../components/config";

export default function useAsyncDetail(id, setIsOpen3, setIsOpen2) {

  const [detail, setDetail] = useState(null);
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
          userRating: '0',
        }
        setDetail(data);
        setDetailLoading(false);
        setIsOpen3(true)
        setIsOpen2(false)
      } catch (err) {
        console.error(err.message)
      }
    }

    if (id !== '') {
      getData();
    }
  },[id])

  return [detail, detailLoading];
}
