import {useEffect, useRef, useState} from "react";
import NavBar from "./components/NavBar";
import SearchResult from "./components/SearchResult";
import DetailView from "./components/DetailView";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovie from "./components/WatchedMovie";
import useAsyncHook from "./components/useAsyncHook";
import useAsyncDetail from "./components/useAsyncDetail";
import {logDOM} from "@testing-library/react";

export default function App() {

  const [query, setQuery] = useState("star");
  const [movies, loading] = useAsyncHook(query);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(true);

  const [id, setId] = useState("")
  const [detail, detailLoading] = useAsyncDetail(id, setIsOpen3, setIsOpen2);
  const [userRating, setUserRating] = useState(0);

  console.log('user rating', userRating)
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

  function addWatched(detail) {
    if (userRating < 1) {
      alert('user rating is required !! 😂')
    } else {
      setWatched(watched => [...watched, {...detail, userRating: userRating}]);
      setIsOpen2(true);
      setIsOpen3(false);
      setUserRating(0);
    }
  }

  return (
       <>
         <NavBar setQuery={setQuery} movies={movies}/>

         <main className="main">
           <div className="box">
             <UserBtn onclick={() => setIsOpen1(open => !open)}>
               {isOpen1 ? "–" : "+"}
             </UserBtn>
             {loading
                  ? "loading"
                  : <ul className="list">
                    {movies?.map((movie) =>
                         <SearchResult key={movie.id} movie={movie} sendId={setId}/>
                    )}
                  </ul>
             }
           </div>

           <div className="box">
             <UserBtn onclick={() => setIsOpen2(!isOpen2)}>
               {isOpen2 ? "–" : "+"}
             </UserBtn>

             {isOpen3 && detail && !detailLoading &&
                  <DetailView
                       detail={detail} addWatched={addWatched}
                       userRating={userRating} setUserRating={setUserRating}/>}

             {isOpen2 && (
                  <>
                    <WatchedSummary watched={watched}/>
                    <ul className="list">
                      {watched.map((movie) => <WatchedMovie key={movie.id} movie={movie}/>)}
                    </ul>
                  </>
             )}
           </div>
         </main>
       </>
  );
}

function UserBtn({onclick, children}) {
  return <button className="btn-toggle"
                 onClick={onclick}>
    {children}
  </button>
}