import './MovieList.css'
import MovieCard from "./MovieCard";

export default function MovieList(props) {
    console.log('props: ', props)
    return (
        <div className="movieList">
          {props.movieList.map((movie, idx) => (
            <MovieCard key={idx} movie={movie}/>
          ))}
        </div>
    )
}