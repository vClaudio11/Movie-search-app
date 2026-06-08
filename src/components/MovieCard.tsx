import type { Movie } from "../types";


export interface MovieCardProps {
    movie: Movie
}

export default function MovieCard({movie}: MovieCardProps) {
    const year = new Date(movie.release_date).getFullYear()

    return (
        <div className="bg-gray-700 rounded-lg shadow-xl hover:scale-105 hover:-translate-y-1 transition-transform duration-150">
            <img
                className="rounded-t-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                />
            <div className="flex flex-col justify-end px-4 py-2">
                <div className="min-h-20">
                    <h2 className="font-bold">{movie.title}</h2>
                    <p className="text-sm text-gray-400">{year}</p>
                </div>
                {/* <p>{movie.overview}</p> */}
                <div>
                    <p className="flex justify-center rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 max-w-16 py-1">⭐ {movie.vote_average.toFixed(1)}</p>
                </div>
            </div>
        </div>

    )
}