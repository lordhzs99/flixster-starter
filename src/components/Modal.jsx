import './Modal.css'
import { useEffect, useState } from 'react'
import notFoundImg from '../assets/not_found.jpg'


export default function Modal(props) {
    if (!props.open) return null;

    return (
        <div className='overlayStyle' onClick={props.close}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                <div className='upperPart'>
                    <h2>{props.movie.title}</h2>
                    <img
                        src={
                            props.movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
                                : notFoundImg 
                        }
                        alt={props.movie.title}
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                    <div><strong>Release date: </strong>{props.movie.release_date}</div>
                    <div><strong>Overview: </strong>{props.movie.overview}</div>
                    {props.currentMovie &&
                        <div className='genresMovie'>
                            <p><strong>Genres: </strong></p>
                            {
                                props.currentMovie.genres.map(mv => (
                                    <p key={mv.id}>{mv.name}, </p>
                                ))
                            }
                        </div>
                    }
                    {props.currentMovie && <div><strong>Runtime: </strong>{props.currentMovie.runtime} minutes</div>}
                </div>
                <div>
                    <button onClick={props.close}>Close</button>
                </div>
            </div>
        </div>
    )
}
