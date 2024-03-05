import StarRating from "./StarRating";

function DetailView({detail, addWatched, children}) {
  return (
    <div className='details'>
      <header>
        <img src={detail.poster} alt={detail.title}/>
        <div>
          <h2>{detail.title}</h2>
          <p>imdb Rating : {detail.imdbRating}</p>
          <p> Actors : {detail.actors}</p>
          <p> Year : {detail.year}</p>
        </div>
      </header>
      <section>
        <div className='rating'>
          {children}
          <button className='btn-add'
                  onClick={() => addWatched(detail)}>Add Watched
          </button>
        </div>
        <div className='details-overview'>
          <h2>Plot</h2>
          <p>{detail.plot}</p>
          <p>Genre : {detail.genre}</p>
          <p>RunTime : {detail.runtime}</p>
        </div>
      </section>
    </div>
  );
}

export default DetailView;