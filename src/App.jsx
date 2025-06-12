import { useEffect, useState } from 'react'
import { useRef } from 'react';
import './App.css'
import MovieList from './components/MovieList'
import data from './data/data.js'
// const apiKey = import.meta.env.VITE_API_KEY;

const App = () => {

  const[movieList, setMovieList] = useState([]); // this state is gonna be retrieving the data from every page of the api
  const[pageNumber, setPageNumber] = useState(1); // this state is gonna be traveling among the pages value of the api 
  const[searchQuery, setSearchQuery] = useState(""); // 
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWJmNjJiZTIwMzQ4MWVmODUzNGFkODdiOGM3NjcxMyIsIm5iZiI6MTc0OTUxMTI2NC45MjIsInN1YiI6IjY4NDc2YzYwMmU5ZmRhNWQyNTIwNjZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.op9N2XnkjGr8ByMVgdtBoY594JeEz-XLpj5PDKD9IrY'
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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWJmNjJiZTIwMzQ4MWVmODUzNGFkODdiOGM3NjcxMyIsIm5iZiI6MTc0OTUxMTI2NC45MjIsInN1YiI6IjY4NDc2YzYwMmU5ZmRhNWQyNTIwNjZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.op9N2XnkjGr8ByMVgdtBoY594JeEz-XLpj5PDKD9IrY'
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setMovieList(json.results); 
        console.log("jsonData", json.results);
      })
      .catch(err => console.error(err));
      setShowLoadMoreButton(false);
    }
  }

  // correct
  useEffect(() => { 
  }, [searchQuery]) 

  // ------------------ END SEARCH FETCH --------------------



  // ------------------ START INITIAL FETCH --------------------
  useEffect(() => { // Fetching
    if (fetchVarRef.current > 0){
      const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=' + pageNumber;
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
          setMovieList(movieList => [...movieList, ...json.results]); 
        })
        .catch(err => console.error(err));
        console.log("pageNumber", pageNumber); 
    }
    fetchVarRef.current += 1;
  }, [pageNumber]);

  // ------------------ FINAL INITIAL FETCH --------------------


  return (
    <div className="App">
      <header className='appHeader'>
          <p className='logo'>Flixter | Watch anywhere, everywhere, anytime you want
          </p>
          <div className='varHeader'>
            <form onSubmit={(e) => handleOnClickSearch(e)}>
              <input className="searchVar" type="text" value={searchQuery} onChange={handleOnSearchResults} placeholder='Search for movies' style={{ width: '300px' }}/>
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
      <main className='appMain'> {/* this works only if there is data in movieList */}
        {
          movieList && movieList.length > 0 && 
          <MovieList movieList={movieList}/>
        }
        {/* <button className='loadMoreButton' onClick={handleOnClickLoadMore}>Load More</button> */}
        {
          showLoadMoreButton && 
            <button className='loadMoreButton' onClick={handleOnClickLoadMore}>Load More</button>
          
        }
      </main>
      <footer className='appFooter'>
        <p>© 2025 Flixter</p>
      </footer>
    </div>
  )
}

export default App;
