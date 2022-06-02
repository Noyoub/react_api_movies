import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import Header from './Header';
import Tv from './Tv';
import FilterTv from './FilterTv';

const TvPage = () => {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [numPage, setNumPage] = useState(1)
  const [inSearch, setInSearch] = useState(false)


  useEffect(() => {
    fetchPopular();
  }, [numPage]);

  const fetchPopular = async () => {
    const data = await fetch("https://api.themoviedb.org/3/tv/popular?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=" + numPage);
    const tvs = await data.json();
    setPopular(tvs.results);
    setFiltered(tvs.results); 
    console.log(tvs)
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchTerm.length > 0){
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=d5c35e51c81488b19da7c1f572507a3d&query=${searchTerm}&language=fr-FR`).then((res) => res.json()).then((data) => {
        setPopular(data.results);
        setFiltered(data.results);
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
    if(numPage !== 1){
      setNumPage(numPage - 1);
    }
  }

  const handleIncrement = (e) => {
    setNumPage(numPage + 1);
  }
  return (
    <div>
        <Header handleChange={handleChange} handleSubmit={handleSubmit} searchTerm={searchTerm}header={true}/>
        <div className="home">
          <h1 className="main-title">Les plus populaires</h1>
          <FilterTv popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
          <motion.div layout className="popular">
            <AnimatePresence>
              {filtered.length > 0 ? filtered.map(tv => {
                return tv.backdrop_path && <Tv key={tv.id} tv={tv}></Tv>;
              }): <h3>Aucun résultat.</h3>}
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
};

export default TvPage;