import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import axios from "axios";
import {useState} from "react";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = '5ee071d4';
const Container = styled.div`
  display:flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction:row;
  background-color:black;
  color:white;
  padding: 6px;
  fontsize: 25px;
  font-weight:bold;
  box-shadow: 0 3px 9px 0 #555;
  justify-content: space-between;
  align-items:center;
`;
const Appname = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
`;
const MovieIcon = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction:row;
  padding: 0.625rem;
  background-color: white;
  border-radius:6px;
  width: 50%;
  margin-left: (0.625*2)rem;
  align-items:center;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size:16px;
  font-weight:bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  padding:30px;
  gap:24px;
  justify-content: space-evenly;
`;
const PlaceHolder = styled.img`
  width:150px;
  height:150px;
  margin: 150px;
  opacity: 0.5;
`;
function App() {
  const [search, updateSearch] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async(searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    console.log(response);
    updateMovieList(response.data.Search);
  }

  const onTextChange = (event) =>{
    clearTimeout(timeoutId);
    updateSearch(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value),500);
    updateTimeoutId(timeout);
  };
  return (
    <div className="App">
      <Container>
        <Header>
          <Appname>
            <MovieIcon src="/movieicon.png"/>
            Movie Search App
          </Appname>
          <SearchBox>
            <SearchIcon src="/search-icon.svg"/>
            <SearchInput placeholder="Search Movie" value={search} onChange={onTextChange}/>
          </SearchBox>
        </Header>
        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
        <MovieListContainer>
          
          {movieList?.length
            ? movieList.map((movie, index)=> (
              <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>
            )):<PlaceHolder src="/film-reel.png"/>}
        </MovieListContainer>
        
      </Container> 
    </div>
  );
}

export default App;
