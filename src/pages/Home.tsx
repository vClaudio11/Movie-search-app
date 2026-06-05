import { useEffect, useState } from "react"
import type { Movie } from "../types"
import MovieCard from "../components/MovieCard"


export default function Home() {
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        if (!query) return
        
        const getData = async () => {
        setError("")
        setLoading(true)

        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                }
            })
            if (!response.ok) {
                setError("Failed to fetch movies")
                return
            }

            // If validation passes, load the results into movies
            const data = await response.json()
            setMovies(data.results)
        } finally {
            setLoading(false)
        }
    }

        getData()
    }, [query])

    return (
        <div>
            <div>
                <span>{`query: ${query}`}</span>
                <span>{`loading: ${loading}`}</span>
                <span>{`movies: ${movies.length}`}</span>
            </div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
            />
            {!query && <p>No movie searched</p>}
            {error && <p>{error}</p>}
            <div>
                {movies.slice(0,20).map((movie) =>
                    <MovieCard key={movie.id} movie={movie} />
                )}
            </div>
        </div>
    )
}