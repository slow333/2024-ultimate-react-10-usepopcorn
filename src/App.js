import {useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import SearchResult from "./components/SearchResult";
import SelectedMovie from "./components/SelectedMovie";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovie from "./components/WatchedMovie";
import useAsyncHook from "./hooks/useAsyncHook";
import useAsyncDetail from "./hooks/useAsyncDetail";
import StarRating from "./components/StarRating";

export default function App() {

  const [query, setQuery] = useState("");
  const [movies, movieLoading, mvError]
    = useAsyncHook(query);
  const [watched, setWatched] = useState([]);

  const [id, setId] = useState("")
  const [userRating, setUserRating] = useState('');
  const [detail, detailLoading, dtError]
    = useAsyncDetail(id, userRating);

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

  const isWatched = watched.length > 0 &&
    watched.find(w => w.imdbID === id);

  function addWatched(detail) {
    if (userRating < 1) alert('user rating is required !! 😂')
    else {
      setWatched(watched => [...watched, {...detail, userRating: userRating}]);
      setUserRating(0);
      setId('');
    }
  }

  function handleDeleteWatched(id) {
    setWatched(watched =>
      watched.filter(movie => movie.imdbID !== id));
    localStorage.setItem('watched', JSON.stringify(watched));
  }

  function handleDetail(id) {
    setId(selectedId => selectedId === id ? null : id);
    setUserRating(rating => 0);
  }
  function handleSelectWatched(id, rating){
    setUserRating(rating);
    setId(id);
  }

  return (
    <>
      <NavBar setQuery={setQuery} movies={movies}/>

      <Main>
        <Box onToggle={() => null}>
          {mvError && <Error>{mvError}</Error>}
          {movieLoading
            ? <Loading>Movie list is loading <br/>😂😂😂</Loading>
            : <SearchResult movies={movies} sendID={handleDetail}/>
          }
        </Box>
        <Box>
          {id && detailLoading &&
            <div style={{height: '100%'}}>
              <Loading> Movie detail is loading <br/>😂😂😂</Loading>
            </div>
          }
          {id && dtError && <Error>{dtError}</Error>}
          {id && detail &&
            <SelectedMovie detail={detail} isWatched={isWatched}
                           addWatched={addWatched} onBack={() => setId('')}>
              {isWatched
                ? '이미 본거에요'
                : <StarRating userRating={userRating}
                              setUserRating={setUserRating} maxRating={10}/>}

            </SelectedMovie>}
          {!id &&
            <>
              <WatchedSummary watched={watched}/>
              <WatchedMovie movies={watched}
                            onDelete={handleDeleteWatched}
                            onSelect={handleSelectWatched}
              />
            </>}
        </Box>
      </Main>
    </>
  );
}

function Main({children}) {
  return <main className="main">{children}</main>
}

function Box({children}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <UserBtn onclick={() => { setIsOpen(!isOpen) }}>
        {isOpen ? "–" : "+"}
      </UserBtn>
      {isOpen && children}
    </div>
  )
}

function Error({children}) {
  return (
    <div className='error'> {children} </div>
  )
}

function Loading({children}) {
  const style = {fontSize: '2rem', textAlign: 'center'}
  return (
    <div style={style} className='loader'>
      {children}
    </div>
  )
}

export function UserBtn({onclick, children, classname = "btn-toggle"}) {
  return (
    <button className={classname} onClick={onclick} >
      {children}
    </button>)
}