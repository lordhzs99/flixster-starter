import './Modal.css'
import { useEffect, useState } from 'react'
import notFoundImg from '../assets/not_found.jpg'
import notFoundVideo from '../assets/notFoundVideo.png'

export default function Modal(props) {
    if (!props.open) return null;
    const [key, setCurrentKey] = useState(''); 


    useEffect (() =>  {
        const url = `https://api.themoviedb.org/3/movie/${props.movie.id}/videos?language=en-US`;
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
            console.log("currentTrailer", json.results);
            for (let i = 0; i < json.results.length;i++) {
                if(json.results[i].name.includes("Trailer")){
                    setCurrentKey(json.results[i].key); 
                }
            }
        })
        .catch(err => console.error(err));
    }, [props.open]);


    return (
        <div className='overlayStyle' onClick={props.close}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                <div className='upperPart'>
                    <h2 className='title'>{props.movie.title}</h2>
                    <img
                        src={
                            props.movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
                                : notFoundImg 
                        }
                        alt={props.movie.title}
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                    <div className='release'><strong>Release date: </strong>{props.movie.release_date}</div>
                    <div className='overview'><strong>Overview: </strong>{props.movie.overview}</div>
                    {props.currentMovie &&
                        <div className='genresMovie'>
                            <p className='genres'><strong>Genres: </strong></p>
                            {
                                props.currentMovie.genres.map(mv => (
                                    <p key={mv.id}>{mv.name}, </p>
                                ))
                            }
                        </div>
                    }
                    {props.currentMovie && <div><strong>Runtime: </strong>{props.currentMovie.runtime} minutes</div>}  
                                    
                    <iframe width="420" height="345" 
                        src={
                            key
                                ? `https://www.youtube.com/embed/${key}`
                                : notFoundVideo
                        }>
                    </iframe>
                </div>
                <div>
                    <button onClick={props.close}>Close</button>
                </div>
            </div>
        </div>
    )
}
