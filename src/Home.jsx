import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Movie from './Movie';
import Filter from './Filter';
import { AnimatePresence, motion } from "framer-motion";
import Header from './Header';

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [numPage, setNumPage] = useState(1)
  const [inSearch, setInSearch] = useState(false)

  useEffect(() => {
    fetchPopular();
  }, [numPage]);

  const fetchPopular = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=" + numPage);
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results); 
  };


  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchTerm.length > 0){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=d5c35e51c81488b19da7c1f572507a3d&query=${searchTerm}&language=fr-FR`).then((res) => res.json()).then((data) => {
        setFiltered(data.results);
        setPopular(data.results);
        setInSearch(true);
      });
    }else{
      fetchPopular();
      setInSearch(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDecrement = (e) => {
    if(numPage !== 1)
      setNumPage(numPage - 1);
  }

  const handleIncrement = (e) => {
    setNumPage(numPage + 1);
  }

  return (
    <div>
        <Header handleSubmit={handleSubmit} handleChange={handleChange} searchTerm={searchTerm}header={true}/>

        <div className="home">
          <h1 className="main-title">Les plus populaires</h1>
          <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
          <motion.div layout className="popular">
            <AnimatePresence>
              {filtered.length > 0 ? filtered.map(movie => {
                return  movie.backdrop_path && <Movie key={movie.id} movie={movie}></Movie>;
              }) : <h3>Aucun résultat.</h3>}
            </AnimatePresence>
          </motion.div>
        </div>
        {!inSearch &&
          <div className="pagination">
            <button onClick={handleDecrement} className="btn-pagination">précédent</button>
            <button onClick={handleIncrement} className="btn-pagination">suivant</button>
          </div>
        }
    </div>
  );
}

export default Home;