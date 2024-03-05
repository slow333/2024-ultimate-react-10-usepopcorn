import {useEffect, useRef, useState} from "react";
import NavBar from "./components/NavBar";
import SearchResult from "./components/SearchResult";
import DetailView from "./components/DetailView";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovie from "./components/WatchedMovie";
import useAsyncHook from "./hooks/useAsyncHook";
import useAsyncDetail from "./hooks/useAsyncDetail";

export default function App() {

  const [query, setQuery] = useState("");
  const [movies, loading] = useAsyncHook(query);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(true);

  const [id, setId] = useState("")
  const [detail, detailLoading] = useAsyncDetail(id, setIsOpen3, setIsOpen2);
  const [userRating, setUserRating] = useState(0);

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
  function handleDeleteWatched(id) {
    setWatched(watched =>
      watched.filter(movie => movie.imdbID !== id ));
    localStorage.setItem('watched', JSON.stringify(watched));
  }

  return (
       <>
         <NavBar setQuery={setQuery} movies={movies}/>

         <main className="main">
           <div className="box">
             <UserBtn onclick={() => setIsOpen1(open => !open)}>
               {isOpen1 ? "–" : "+"}
             </UserBtn>
             { !loading &&
               <ul className="list">
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
                    {watched.map((movie) =>
                      <WatchedMovie key={movie.id} movie={movie} onDelete={handleDeleteWatched}/>)}
                  </ul>
                </>
             )}
           </div>
         </main>
       </>
  );
}

export function UserBtn({onclick, children, classname="btn-toggle"}) {
  return <button className={classname}
                 onClick={onclick}>
    {children}
  </button>
}