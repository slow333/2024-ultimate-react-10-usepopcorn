import StarRating from "./StarRating";

function DetailView({detail, addWatched, userRating, setUserRating}) {
  return (
       <div className='details'>
         <div className='section'>
           <div className='header'>
             <h2>{detail.title}</h2>
             <img src={detail.poster} alt={detail.poster}/>
             <div className='rating'>imdb Rating : {detail.imdbRating}</div>
           </div>
           <div className='details-overview'>
             <div className='rating'>
               <StarRating userRating={userRating} setUserRating={setUserRating}/>
               <button className='btn-add'
                       onClick={() => addWatched(detail)}>Add Watched
               </button>
             </div>
             <p> Actors : {detail.actors}</p>
             <p> Year : {detail.year}</p>
             <p>{detail.plot}</p>
           </div>
         </div>
       </div>
  );
}

export default DetailView;