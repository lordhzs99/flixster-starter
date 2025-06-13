import './MovieList.css'
import MovieCard from "./MovieCard";

export default function MovieList({ movieList, handleOnClickLoadMore, showLoadMoreButton }) {
    console.log('inside home movies')
    return (
      <>
        {
          movieList && movieList.length > 0 && 
          <div className="movieList">
            {movieList.map((movie, idx) => (
              <MovieCard key={idx} movie={movie}/>
            ))}
          </div>
        }
        {
          showLoadMoreButton && 
            <button className='loadMoreButton' onClick={handleOnClickLoadMore}>Load More</button>
        }
      </>
    )
}