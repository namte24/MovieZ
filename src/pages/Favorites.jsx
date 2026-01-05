import "../css/Favorites.css"
import { useMovieContext } from "../context/MovieContext"
import MovieCard from "../Components/MovieCard"
import { FaHeartBroken } from "react-icons/fa"
import { Link } from "react-router-dom"

const Favorites = () => {
    const { favorites } = useMovieContext();
    
    if (favorites && favorites.length > 0) {
        return (
            <div className="favorites-container">
                <div className="favorites-header">
                    <h1>Your Favorite Movies</h1>
                    <p>Your personally curated collection of amazing films</p>
                </div>
                
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="favorites-empty">
            <FaHeartBroken className="empty-icon" />
            <h2>No Favorites Yet</h2>
            <p>Movies you love will appear here for easy access</p>
            <Link to="/" className="browse-button">
                Browse Movies
            </Link>
        </div>
    )
}

export default Favorites