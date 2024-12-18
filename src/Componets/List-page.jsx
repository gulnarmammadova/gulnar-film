import { Link, useParams } from "react-router";

export default function ListPage() {
    const { id } = useParams()
    const lists = JSON.parse(localStorage.getItem('lists'))
    const list = lists.find(x => x.id == id)

    return <main>
        <div className="list-container">
            <h1>List title: {
                list.title
            }</h1>

            <div className="fav-list">
                {
                    list.movieList.map(movie => <div key={movie.imdbID} className="movie-card">
                        <img
                          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}
                          alt={movie.Title}
                        />
                        <h3>{movie.Title} ({movie.Year})</h3>

                        <Link to={`https://www.imdb.com/title`} >Go to the movie</Link>

                      </div>)
                }
            </div>
        </div>
    </main>
}