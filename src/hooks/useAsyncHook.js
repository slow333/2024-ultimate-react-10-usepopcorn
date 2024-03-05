import {useEffect, useState} from "react";
import {URL} from "../components/config";

function useAsyncHook(query) {
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState("false");

   useEffect(() => {
      async function getData() {
         if (!query) return;
         try {
            setLoading(true)
            // if (query.length < 4) return;
            const res =
                 await fetch(`${URL}&s=${query}`);
            if (!res.ok) throw new Error(`찾는 영화가 없어요 : ${res.status}`);
            const data = await res.json();
            if (data.Response === 'False') throw new Error(`찾는 영화가 없어요 : ${res.status}`);
            setMovies(data.Search)
            setLoading(false)
         } catch (err) {
            console.log(err);
         }
      }

      if (query !== '') {
         getData();
      }
   }, [query]);

   return [movies, loading];
}

export default useAsyncHook;