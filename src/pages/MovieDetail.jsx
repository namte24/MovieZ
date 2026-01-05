import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaStar, FaCalendarAlt } from "react-icons/fa";
import "../css/MovieDetail.css";
import { useMovieContext } from "../context/MovieContext";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFavorites } = useMovieContext();
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const apiKey = "2dca580c2a14b55200e784d157207b4d";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        
        if (!response.ok) {
          throw new Error("Movie details not found");
        }
        
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="error-container">
        <h2>Movie Not Found</h2>
        <p>Sorry, we couldn&apos;t find the movie you&apos;re looking for.</p>
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }
  
  const favorite = isFavorite(movie.id);
  
  return (
    <div className="movie-detail-container">
      <div className="movie-detail-header">
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Home
        </Link>
        <button 
          className={`favorite-button ${favorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
        >
          <FaHeart /> {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
      
      <div className="movie-detail-content">
        <div className="movie-poster">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
        </div>
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          
          <div className="movie-meta">
            <span className="movie-rating">
              <FaStar /> {movie.vote_average.toFixed(1)}
            </span>
            <span className="movie-year">
              <FaCalendarAlt /> {movie.release_date?.split("-")[0]}
            </span>
            <span className="movie-runtime">
              {movie.runtime} min
            </span>
          </div>
          
          <div className="movie-genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          
          <div className="movie-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          
          {movie.tagline && (
            <div className="movie-tagline">
              <em>&quot;{movie.tagline}&quot;</em>
            </div>
          )}
          
          <div className="movie-details">
            <div className="detail-item">
              <span className="detail-label">Release Date:</span>
              <span className="detail-value">{movie.release_date}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Original Language:</span>
              <span className="detail-value">{movie.original_language?.toUpperCase()}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Budget:</span>
              <span className="detail-value">
                ${movie.budget?.toLocaleString() || "N/A"}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Revenue:</span>
              <span className="detail-value">
                ${movie.revenue?.toLocaleString() || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 