import './Sidebar.css'
import { useEffect, useState } from 'react'
import notFoundImg from '../assets/not_found.jpg'
import notFoundVideo from '../assets/notFoundVideo.png'
import LikedMovies from './LikedMovies';

export default function Sidebar({sidebarOpen, close, setCurrentPage }) {
    if (!sidebarOpen) return null;
    console.log("HERE"); 

    return (
        <div className='overlayStyleSideBar' onClick={close}>
            <div className="modalBodySideBar" onClick={(e) => e.stopPropagation()}>
                <div className='upperPartSideBar'>
                    <button className="btn" onClick={() => setCurrentPage('home')}>Home</button>
                    <button className="btn" onClick={() => setCurrentPage('favorites')}>My favorites</button>
                    <button className="btn" onClick={() => setCurrentPage('watched')}>Seen</button>
                </div>
                <div>
                    <button onClick={close}>Close</button>
                </div>
            </div>
        </div>
    )
}
