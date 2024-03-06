function SearchResult({movies, sendID}) {
  return (
       <ul className="list">
         {movies?.map((movie) =>
              <li key={movie.imdbID}>
                <img src={movie.poster}
                     onError={({currentTarget}) => {
                       currentTarget.onerror = null; // prevents looping
                       currentTarget.src = '/img/26.jpg';
                     }}
                     alt={`${movie.title} poster`}
                     onClick={() => sendID(movie.imdbID)}
                />
                <h3>{movie.title}</h3>
                <div><span>{movie.year}</span></div>
              </li>)}
       </ul>
  );
}

export default SearchResult;