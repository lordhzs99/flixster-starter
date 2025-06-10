import { useEffect, useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import data from './data/data.js'
const apiKey = import.meta.env.VITE_API_KEY;

const App = () => {
  const[movieList, setMovieList] = useState([]); // this state is gonna be retrieving the data from every page of the api
  const[pageNumber, setPageNumber] = useState(1); // this state is gonna be traveling among the pages value of the api 
  const[searchQuery, setSearchQuery] = useState(""); // 
  const [searchResults, setSearchResults] = useState([]);


  const handleOnSearchResults = (event) => {
    setSearchQuery(event.target.value); 
  }

  function handleOnClickLoadMore() {
    setPageNumber(pageNumber => pageNumber + 1); 
  }

  function handleOnClickSearch(e) {
    e.preventDefault()
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
        const jsonData = json.results;
        setSearchResults(jsonData); 
        console.log("jsonData", jsonData);
      })
      .catch(err => console.error(err));
  }
  // correct
  useEffect(() => { 
    // handleOnClickSearch(/* query */)
  }, [searchQuery])

  useEffect(() => { // Fetching
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
        // console.log("movieList", movieList);
      })
      .catch(err => console.error(err));
  }, [pageNumber]);


  return (
    <div className="App">
      <header className='appHeader'>
          <h1>Flixter | Watch anywhere, everywhere, anytime you want
          </h1>
          <div className='varHeader'>
            <form onSubmit={(e) => handleOnClickSearch(e)}>
              <input className="searchVar" type="text" value={searchQuery} onChange={handleOnSearchResults} placeholder='Search for movies' style={{ width: '300px' }}/>
              <button type="submit" value="Search" />
            </form>
            <select id="country" name="Sort by">
              <option value="popularitySort">Popularity</option>
              <option value="releaseSort">Release</option>
              <option value="ratingSort">Rating</option>
            </select>
          </div>
      </header>
      <main className='appMain'> {/* this works only if there is data in movieList */}
        {
          movieList.length > 0 && 
          <MovieList movieList={movieList}/>
        }
        <button className='loadMoreButton' onClick={handleOnClickLoadMore}>Load More</button>
      </main>
      <footer className='appFooter'>
        <p>© 2025 Flixter</p>
      </footer>
    </div>
  )
}

export default App;
