import './MovieCard.css'

// <img
//         src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//         alt={movie.title}
//         style={{ width: '100%', borderRadius: '8px' }}
//       />

export default function MovieCard(props) {
    // console.log(props); 
    return (
        <div className="movieCard">
            <div className='moviePoster'>
                <img
                    src={`https://image.tmdb.org/t/p/w200${props.movie.poster_path}`}
                    alt={props.movie.title}
                    style={{ width: '100%', borderRadius: '8px' }}
                />
            </div>
            <div className='movieTitle'>
                <h4 className="movieTitle">{props.movie.title}</h4>
            </div>
            <div className='moveVote'>
                <span className="moveVote">Rating: {props.movie.vote_average}</span>
            </div>
        </div>
    )
}