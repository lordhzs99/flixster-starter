import './MovieList.css'
import MovieCard from "./MovieCard";

export default function LikedMovies(props) {
    console.log('inside watched movies')
    return (
        <div className="movieList">
          {props.movieList.map((movie, idx) => (
            movie.isSeen ? <MovieCard key={idx} movie={movie}/> : null
          ))}
        </div>
    )
}