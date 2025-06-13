import './MovieList.css'
import MovieCard from "./MovieCard";

export default function LikedMovies(props) {
    console.log('inside liked movies')
    return (
        <div className="movieList">
          {props.movieList.map((movie, idx) => (
            movie.isLiked ? <MovieCard key={idx} movie={movie}/> : null
          ))}
        </div>
    )
}