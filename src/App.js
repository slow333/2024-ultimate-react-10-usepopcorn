import {useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import SearchResult from "./components/SearchResult";
import DetailView from "./components/DetailView";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovie from "./components/WatchedMovie";
import useAsyncHook from "./hooks/useAsyncHook";
import useAsyncDetail from "./hooks/useAsyncDetail";
import StarRating from "./components/StarRating";
import watchedMovie from "./components/WatchedMovie";

export default function App() {

  const [query, setQuery] = useState("");
  const [movies, movieLoading] = useAsyncHook(query);
  const [watched, setWatched] = useState([]);
  const [toggleShow, setToggleShow] = useState(false)

  const [id, setId] = useState("")
  const [detail, detailLoading] = useAsyncDetail(id, setToggleShow);
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
      if (watched.length > 0 && watched.find(w => w.imdbID === detail.imdbID)) alert('이미 리스트에 있어요.');
      else {
        setWatched(watched => [...watched, {...detail, userRating: userRating}]);
        setUserRating(0);
        setToggleShow(show => !show);
      }
    }
  }

  function handleDeleteWatched(id) {
    setWatched(watched =>
         watched.filter(movie => movie.imdbID !== id));
    localStorage.setItem('watched', JSON.stringify(watched));
  }

  function handleToggle() {
    if (detail) {
      setToggleShow(show => !show);
    } else return;
  }

  function handleDetail(id) {
    setId(id);
    handleToggle();
  }

  return (
       <>
         <NavBar setQuery={setQuery} movies={movies}/>

         <Main>
           <Box onToggle={() => null}>
             { movieLoading
                  ? <Loading>Movie list is loading <br/>😂😂😂</Loading>
                  : <SearchResult movies={movies} sendID={handleDetail}/>
             }
           </Box>
           { !toggleShow &&
              <Box onToggle={handleToggle}>
                <WatchedSummary watched={watched}/>
                <WatchedMovie movies={watched} onDelete={handleDeleteWatched}/>
              </Box>
           }
           { toggleShow &&
              (detailLoading
                 ? <Loading>Movie detail is loading <br/>😂😂😂</Loading>
                 : <Box onToggle={handleToggle}>
                   <DetailView detail={detail} addWatched={addWatched}>
                     <StarRating userRating={userRating} setUserRating={setUserRating}/>
                   </DetailView>
                 </Box>)
           }
         </Main>
       </>
  );
}

function Main({children}) {
  return <main className="main">{children}</main>
}

function Box({children, onToggle}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
       <div className='box'>
         <UserBtn onclick={() => {
           setIsOpen(!isOpen);
           onToggle();
         }}>
           {isOpen ? "–" : "+"}
         </UserBtn>
         {isOpen && children}
       </div>
  )
}

function Loading({children}) {
  const style = {fontSize: '2rem', textAlign: 'center'}
  return (
       <div style={style} className='list'>
         {children}
       </div>
  )
}

export function UserBtn({onclick, children, classname = "btn-toggle"}) {
  return (
     <button
          className={classname}
          onClick={onclick}
     >
       {children}
     </button>)
}