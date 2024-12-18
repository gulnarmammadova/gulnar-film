
import React, { useState, useEffect } from 'react';
import './App.css';
import Favorites from './Componets/Favorites';

const API_KEY = '9fc66b86';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(
    localStorage.getItem('currentList') ? JSON.parse(localStorage.getItem('currentList')).movieList : []
  );




  const [loading, setLoading] = useState(false);


  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        alert('No movies found!');
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=batman&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error('Error fetching default movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, []);


  const addToFavorites = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
    }
  };


  const removeFromFavorites = (imdbID) => {
    const newFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(newFavorites);
  };

  return (
    <div className="container">

      <div>

        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button onClick={searchMovies}>Search</button>
        </div>

        <div className='fav-mobile' >
          <Favorites
            favorites={favorites}
            setFavorites={setFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        </div>

        {!loading && <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}
                  alt={movie.Title}
                />
                <h3>{movie.Title} ({movie.Year})</h3>
                <button
                  onClick={() => addToFavorites(movie)}
                  disabled={favorites.find((fav) => fav.imdbID === movie.imdbID)}
                >
                  {favorites.find((fav) => fav.imdbID === movie.imdbID)
                    ? 'Added to Favorites'
                    : 'Add to Favorites'}
                </button>
              </div>
            ))
          ) : (
            <p>No movies to display</p>
          )}
        </div>}
      </div>

      <div className='fav-show' >
      <Favorites
        favorites={favorites}
        setFavorites={setFavorites}
        removeFromFavorites={removeFromFavorites}
      />
      </div>
    </div>
  );
};

export default App;
