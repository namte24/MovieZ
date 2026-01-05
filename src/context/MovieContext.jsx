import { createContext, useState, useEffect, useContext } from "react";

const MoviesContext = createContext()

export const useMovieContext = () => useContext(MoviesContext)

export const MovieProvider = ({children}) => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites')

        if(storedFavorites) setFavorites(JSON.parse(storedFavorites))
    }, [])

    useEffect(() =>{
        localStorage.setItem('favorites', JSON.stringify(favorites)) 
    }, [favorites])

    const addToFavorites = (movie) =>{
        setFavorites(prev => [...prev, movie])
    }

    const removeFavorites = (movieId) =>{
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) =>{
        return favorites.some(movie => movie.id == movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFavorites,
        isFavorite
    }

    return <MoviesContext.Provider value={value}>
        {children}
    </MoviesContext.Provider>
}