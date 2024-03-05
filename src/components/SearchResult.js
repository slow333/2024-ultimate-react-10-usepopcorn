function SearchResult({ movie, sendId}) {
  return (
       <li key={ movie.imdbID }>
         <img src={ movie.Poster } alt={`${movie.Title} poster`}
              onClick={() => sendId(movie.imdbID)}
         />
         <h3>{movie.Title}</h3>
         <div><span>{movie.Year}</span></div>
       </li>
  );
}

export default SearchResult;