import './MovieCard.css';
import Modal from './Modal.jsx';
import { useEffect, useState } from 'react';
import notFoundImg from '../assets/notFoundVideo.png'; 
import { BsHeart } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import getRanLikeCount from '../utils/helpers.js'
import { BsFillHeartFill } from "react-icons/bs";
const apiKey = import.meta.env.VITE_API_KEY;


export default function MovieCard(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [likeCount, setLikeCount] = useState(getRanLikeCount());
    const [hasBeenLiked, setHasBeenLiked] = useState(false);
    const [hasBeenSeen, setHasBeenSeen] = useState(false); 
    // FETCH FOR GENRES AND RUNTIME
    useEffect(() => { 
        const url = `https://api.themoviedb.org/3/movie/${props.movie.id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setCurrentMovie(json);
                // console.log("jsonData:", json);
            })
            .catch(err => console.error(err));
    }, [props.movie.id]);

    const toggleHasBeenLiked = (e) => {
        e.stopPropagation(); 
        // console.log("E: ", e); 
        if(hasBeenLiked) {
            setLikeCount(likeCount => likeCount - 1)
        } else {
            setLikeCount(likeCount => likeCount + 1)
        }
        setHasBeenLiked(!hasBeenLiked);
        props.movie.isLiked = !props.movie.isLiked; 
    }

    const toggleHasBeenSeen = (e) => {
        e.stopPropagation(); 
        setHasBeenSeen(!hasBeenSeen); 
        props.movie.isSeen = !props.movie.isSeen;
    }

   return (
    <div className="movieCard" onClick={() => setIsOpen(true)}>
        <div className='moviePoster'>
            <img
                src={
                    props.movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
                        : `https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png`
                }
                alt={props.movie.title}
            />
        </div>
        <div className='bellowText'>
            <div className='leftBellowText'>
                <div className='movieTitle'>
                    <p className="movieTitle"><strong>{props.movie.title}</strong></p>
                </div>
                <div className='moveVote'>
                    <span className="moveVote">Rating: {props.movie.vote_average}</span>
                </div>
            </div>
            <div className='rightBellowText'>
                <div className='likeComponent'>
                   <div>
                        <p>{likeCount}</p>
                    </div>
                    <div className="heartIcon" onClick={(e) => toggleHasBeenLiked(e)}>
                        {hasBeenLiked ? <BsFillHeartFill /> : <BsHeart />}
                    </div>
                </div>
                <div className="eye" onClick={(e) => toggleHasBeenSeen(e)}>
                    {hasBeenSeen ? <BsEye /> : <BsEyeSlash />}
                </div>
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
