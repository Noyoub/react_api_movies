import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


const Movie = ({movie}) => {
  const img = "https://image.tmdb.org/t/p/original" + movie.backdrop_path;

  return (
    <Link className="link_movies" to={`movie/${movie.id}`}>
      <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
        <div className="movie_titles">
          <h2>{movie.title}</h2>
        </div>
        <img className="img_movies" src={img} alt="" />
      </motion.div>
    </Link>
  );
};

export default Movie;