import type { Movie } from "../types";


export interface MovieCardProps {
    movie: Movie
}

export default function MovieCard({movie}: MovieCardProps) {

    return (
        <div>
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <p>{movie.release_date}</p>
            <p>{movie.overview}</p>
            <p>{movie.vote_average}</p>
        </div>

    )
}