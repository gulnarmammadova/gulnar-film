
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Favorites = ({ favorites, setFavorites, removeFromFavorites }) => {
  const [listName, setListName] = useState('');
  const [saved, setSaved] = useState(false);
  const [off, setOff] = useState(false)

  const [lists, setLists] = useState(
    localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : []
  )

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists])


  useEffect(() => {
    localStorage.setItem('currentList', JSON.stringify({
      title: listName,
      movieList: favorites
    }))
  }, [favorites, listName])




  const handleSaveList = () => {
    if (listName && favorites.length > 0) {
      setLists([...lists, {
        id: lists.length + 1,
        title: listName,
        movieList: favorites
      }])

      setOff(true)


    } else {
      alert('Listname should be valid and list cannot be empty');
    }
  };


  const handleRemoveFromFavorites = (movieId) => {
    removeFromFavorites(movieId);
  };

  return (
    <div>    <div className="favorites-container">
      <h2>Favorite List</h2>
      <input
      disabled={off}
        type="text"
        placeholder="List name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <button onClick={handleSaveList} disabled={off}>
        {saved ? 'List Saved' : 'Save List'}
      </button>
      <button onClick={()=> {
              setFavorites([])
              setListName('')
              setOff(false)
      }} disabled={!off}>
        New List
      </button>

      <ul>
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <li key={movie.imdbID}>
              {movie.Title} ({movie.Year})
              <button
              disabled={off}
                onClick={() => {
                  if(off) {
                    return
                  }

                  handleRemoveFromFavorites(movie.imdbID)
                }}
                className="remove-btn"
              >
                X
              </button>
            </li>
          ))
        ) : (
          <p>No favorite movies yet!</p>
        )}
      </ul>


    </div>

      <div className="saved-lists">
        {
          lists.map((item, index) => <div key={index} >
            <Link to={`/list/${item.id}`} ><span>{item.title}</span></Link>
          </div>)
        }
      </div>
    </div>

  );
};

export default Favorites;
