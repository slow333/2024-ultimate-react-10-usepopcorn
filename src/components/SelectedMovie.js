
function SelectedMovie({detail, isWatched, addWatched,onBack, children}) {
  return (
    <div className='details'>
      <button className='btn-back' onClick={onBack}>&lt;</button>
      <header>
        <img src={detail?.poster}
             onError={({currentTarget}) => {
               currentTarget.onerror = null; // prevents looping
               currentTarget.src = '/img/26.jpg';
             }}
             alt={detail.title}/>
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
          {isWatched ? '' : <button className='btn-add'
                   onClick={() => addWatched(detail)}>Add Watched
          </button>}
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

export default SelectedMovie;