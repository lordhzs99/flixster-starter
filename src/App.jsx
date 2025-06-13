import { useEffect, useState } from 'react'
import { useRef } from 'react';
import './App.css'
import Sidebar  from './components/Sidebar.jsx';
import MovieList from './components/MovieList'
import data from './data/data.js'
import { BsFilm } from "react-icons/bs";
import LikedMovies from './components/LikedMovies.jsx';
import WatchedMovies from './components/WatchedMovies.jsx';
import { FiAlignJustify } from "react-icons/fi";
 const apiKey = import.meta.env.VITE_API_KEY;

const Pages = {
  HOME: 'home',
  FAVORITES: 'favorites',
  WATCHED:'watched'
}

const App = () => {

  const[movieList, setMovieList] = useState([]); // this state is gonna be retrieving the data from every page of the api
  const[pageNumber, setPageNumber] = useState(1); // this state is gonna be traveling among the pages value of the api 
  const[searchQuery, setSearchQuery] = useState(""); // 
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [currentPage, setCurrentPage] = useState(Pages.HOME); 
  const[value, setValue] = useState('');
  const fetchVarRef = useRef(0);


  const handleOnSearchResults = (event) => {
    setSearchQuery(event.target.value); 
  }

  function handleSelect(event) {
      event.preventDefault();
      setValue(event.target.value);
  }

  useEffect(() => {
    console.log("value: ", value);
    if (value === "byName") setMovieList([...movieList].sort(byName))
    if (value === "byRelease") setMovieList([...movieList].sort(byRelease))
    if (value === "byRating") setMovieList([...movieList].sort(byRating))

  }, [value]); 

  const byName = (a, b) => {
    let x = a.title; 
    let y = b.title; 
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0; 
  }

  const byRelease = (a, b) => {
    let x = a.release_date; 
    let y = b.release_date; 
    if (x > y) { return -1; }
    if (x < y) { return 1; }
    return 0; 
  }

  const byRating = (a, b) => {
    console.log("at")
    let x = a.vote_average; 
    let y = b.vote_average; 
    if (x > y) { return -1; }
    if (x < y) { return 1; }
    return 0; 
  }

  function handleOnClickLoadMore() {
    setPageNumber(pageNumber + 1); 
  }

  function handleOnClearButton() {
    setMovieList([]);
    setShowLoadMoreButton(true);
    setSearchQuery(''); // Clear search input
    setValue(''); // Reset sort selector to "Sort by"
    if (pageNumber !== 1) {
      setPageNumber(1);
    } else {
      // Already on page 1, so fetch manually
      const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
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
          setMovieList(json.results);
        })
        .catch(err => console.error(err));
    }
  }
    

// ------------------ SEARCH FETCH --------------------
 
  function handleOnClickSearch(e) { // search fetch
  e.preventDefault()
  console.log("e", e); 
  if(searchQuery.trim() !== '') {
  
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`; // add query
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
      setMovieList(json.results.map(movie => ({...movie, isLiked: false, isSeen: false})));
      console.log("jsonData", json.results);
    })
    .catch(err => console.error(err));
    setShowLoadMoreButton(false);
  }
}
// ------------------ END SEARCH FETCH --------------------



// ------------------ START INITIAL FETCH --------------------
  useEffect(() => {
  if (fetchVarRef.current > 0){
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=' + pageNumber;
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
        setMovieList(movieList => [...movieList, ...json.results.map(movie => ({...movie, isLiked: false, isSeen: false}))]);
      })
      .catch(err => console.error(err));
      console.log("pageNumber", pageNumber); 
    }
    fetchVarRef.current += 1;
  }, [pageNumber]);

  


// ------------------ FINAL INITIAL FETCH --------------------
  console.log("movie: ", movieList);
  const showCurrentPage = () => {
    switch (currentPage) {
      case Pages.HOME: 
        return (
          <MovieList movieList={movieList} handleOnClickLoadMore={handleOnClickLoadMore} showLoadMoreButton={showLoadMoreButton} /> 
        );
      case Pages.FAVORITES: 
        return (
          <LikedMovies movieList={movieList}/>
        );
      case Pages.WATCHED: 
        return (
          <WatchedMovies movieList={movieList}/>
        );
      default:
        return (
          <MovieList movieList={movieList} handleOnClickLoadMore={handleOnClickLoadMore} showLoadMoreButton={showLoadMoreButton} />
        );
    }
  }
  return (
    <div className="App">

      <header className='appHeader'>
          {/* <p className='logo'><BsFilm />Flixter | Watch anywhere, everywhere, anytime you want</p> */}
          <div className="logo">
            {/* <FiAlignJustify /> */}

            <FiAlignJustify className='sideBarButton' onClick={() => setSidebarOpen(true)}/>
            <Sidebar 
              sidebarOpen={sidebarOpen}
              close={() => setSidebarOpen(false)}
              setCurrentPage={(callbackItem) => setCurrentPage(callbackItem)}
            />
            <BsFilm className="logo-icon" />
            <span className="logo-text">Flixter | Watch anywhere, everywhere, anytime you want</span>
          </div>
          <div className='varHeader'>
            <form onSubmit={(e) => handleOnClickSearch(e)}>
              <input className="searchVar" type="text" value={searchQuery} onChange={handleOnSearchResults} placeholder='Search for movies' style={{ width: '135px' }}/>
              <button type="submit" value="Search">Search</button>
              {/* <button type="submit" value="Clear" onClick={handleOnClearButton}/> */}
            </form>
            <button onClick={handleOnClearButton}>Clear</button>
            {/* <select id="country" name="Sort by" onClick={() => setMovieList([...movieList].sort(byName))}> */}
            <select
              id="country"
              name="Sort by"
              value={value}
              onChange={handleSelect}
            >
              <option value="">Sort by</option>
              <option value="byName">A - Z</option>
              <option value="byRelease">Release date</option>
              <option value="byRating">Rating</option>
            </select>
          </div>
      </header>
      {/* <Sidebar className='sideBar'/> */}
      <main className='appMain'> {/* this works only if there is data in movieList */}
        {showCurrentPage()}
        {/* <button className='loadMoreButton' onClick={handleOnClickLoadMore}>Load More</button> */}

      </main>
      <footer className='appFooter'>
        <p>© 2025 Flixter</p>
      </footer>
    </div>
  )
}

export default App;