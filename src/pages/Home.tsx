import { useEffect, useState } from "react"
import type { Movie } from "../types"


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
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
            />
        </div>
    )
}