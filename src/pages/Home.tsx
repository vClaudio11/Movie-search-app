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

        try{
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
        }  finally {
            setLoading(false)
        }

    }


        const timer = setTimeout(() => {
            getData()
        }, 500)
        
        return () => clearTimeout(timer)
    }, [query])

    return (
        <div className="p-6">
            <h1 className="flex text-4xl justify-center pb-6 ">Movie Search</h1>
            <div className="flex flex-row items-center gap-4 pb-6">
                <span className="bg-gray-700 border border-gray-500 rounded-full text-sm px-4 py-1 ">{`query: "${query}"`}</span>
                <span className="bg-gray-700 border border-gray-500 rounded-full text-sm px-4 py-1 ">{`loading: ${loading}`}</span>
                <span className="bg-gray-700 border border-gray-500 rounded-full text-sm px-4 py-1 ">{`movies: ${movies.length}`}</span>
            </div>
            <input
                className="bg-gray-700 border border-gray-500 min-w-full rounded-lg font-bold px-4 py-2 mb-6 shadow-lg shadow-gray-800"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
            />
            <p className="mb-2 text-sm px-4">Results: </p>
            {!query && <p className="px-4 text-sm">No movie searched</p>}
            {error && <p className="px-4 text-sm">{error}</p>}
            <div className="grid grid-cols-3 gap-4">
                {movies.filter((movie) => movie.poster_path).slice(0,20).map((movie) =>
                    <MovieCard key={movie.id} movie={movie} />
                )}
            </div>
        </div>
    )
}