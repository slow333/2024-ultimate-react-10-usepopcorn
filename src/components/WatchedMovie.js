import {UserBtn} from "../App";

function WatchedMovie({movie, onDelete}) {
  return (
       <li>
         <img src={movie.poster} alt={`${movie.title} poster`}/>
         <h3>{movie.title}</h3>
         <div>
           <p><span>⭐️</span> <span>{movie.imdbRating}</span></p>
           <p><span>🌟</span> <span>{movie.userRating}</span></p>
           <p><span>⏳</span> <span>{movie.runtime.split(' ')[0]} min</span></p>
           <UserBtn
             onclick={() => onDelete(movie.imdbID)}
             classname='btn-delete'
           >X</UserBtn>
         </div>
       </li>
  );
}

export default WatchedMovie;