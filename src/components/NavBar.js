import {useState} from "react";

function NavBar({ setQuery, movies}) {
  const [search, setSearch] = useState("");
  const style = {
    background: "green", marginLeft: '2rem',
    padding: '1rem 2rem', borderRadius: '1.3rem',
    fontSize: '1.8rem'
  }

  return (
       <nav className="nav-bar">
         <div className="logo">
           <span role="img">🍿</span>
           <h1>usePopcorn</h1>
         </div>
         <form onSubmit={e => {
           e.preventDefault();
           setQuery(search)
         }} style={{display: 'flex'}}>
           <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
           />
           <button type='submit' className='btn-add'
                   style={style}>search</button>
         </form>
         <p className="num-results">
           Found <strong>{movies?.length}</strong> results
         </p>
       </nav>
  );
}

export default NavBar;