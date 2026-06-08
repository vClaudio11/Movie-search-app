import { useState } from "react"
import MovieCard from "../components/MovieCard"
import useMovieSearch from "../hooks/useMovieSearch"


export default function Home() {
    const [query, setQuery] = useState("")
    
    const {movies, loading, error} = useMovieSearch(query)
    

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="flex text-4xl justify-center">Movie Search</h1>
            <p className="flex text-sm text-gray-400 justify-center pb-6">using TMDB</p>
            <input
                className="bg-gray-700 border border-gray-500 min-w-full rounded-lg font-bold px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
            />
            {loading && (
            <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-400" />
            </div>
)}
            <div className="flex flex-row items-center gap-2 pb-6">
                <p className="text-sm px-4">Results: </p>
                <span className="bg-gray-700 border border-gray-500 rounded-full text-sm px-4 py-1 ">{`movies: ${movies.length}`}</span>
            </div>
            {error && <p className="px-4 text-sm">{error}</p>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.filter((movie) => movie.poster_path).slice(0,20).map((movie) =>
                    <MovieCard key={movie.id} movie={movie} />
                )}
            </div>
        </div>
    )
}