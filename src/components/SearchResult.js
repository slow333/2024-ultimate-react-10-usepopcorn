function SearchResult({ movie, sendId}) {
  return (
       <li key={ movie.imdbID }>
         <img src={ movie.Poster }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src='/img/26.jpg';
              }}
              alt={`${movie.Title} poster`}
              onClick={() => sendId(movie.imdbID)}
         />
         <h3>{movie.Title}</h3>
         <div><span>{movie.Year}</span></div>
       </li>
  );
}

export default SearchResult;