import './MovieCard.css';
import Modal from './Modal.jsx';
import { useEffect, useState } from 'react';
import notFoundImg from '../assets/not_found.jpg'; // ✅ Correct import

export default function MovieCard(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${props.movie.id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWJmNjJiZTIwMzQ4MWVmODUzNGFkODdiOGM3NjcxMyIsIm5iZiI6MTc0OTUxMTI2NC45MjIsInN1YiI6IjY4NDc2YzYwMmU5ZmRhNWQyNTIwNjZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.op9N2XnkjGr8ByMVgdtBoY594JeEz-XLpj5PDKD9IrY'
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setCurrentMovie(json);
                console.log("jsonData:", json);
            })
            .catch(err => console.error(err));
    }, [props.movie.id]);

    return (
        <div className="movieCard" onClick={() => setIsOpen(true)}>
            <div className='moviePoster'>
                <img
                    src={
                        props.movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
                            : notFoundImg // ✅ Use local fallback image
                    }
                    alt={props.movie.title}
                    style={{ width: '100%' }}
                />
            </div>
            <div className='bellowText'>
                <div className='movieTitle'>
                    <h2 className="movieTitle">{props.movie.title}</h2>
                </div>
                <div className='moveVote'>
                    <span className="moveVote">Rating: {props.movie.vote_average}</span>
                </div>
            </div>
            <Modal
                open={isOpen}
                close={() => setIsOpen(false)}
                movie={props.movie}
                currentMovie={currentMovie}
            />
        </div>
    );
}
