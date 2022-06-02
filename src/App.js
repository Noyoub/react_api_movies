import './App.css';
import { Routes, Route } from "react-router-dom";
import SingleMovie from './SingleMovie';
import Home from './Home';
import TvPage from './TvPage';
import SingleTv from './SingleTv';


function App() {
  return (
  <Routes>
    <Route exact path="/" element={<Home />}/>
    <Route path="/tv" element={<TvPage />}/>
    <Route path="movie/:movieId" element={<SingleMovie />}/>
    <Route path="tv/:tvId" element={<SingleTv />}/>
  </Routes>
  );
}

export default App;


