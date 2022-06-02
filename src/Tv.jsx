import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Tv = ({tv}) => {
  const img = "https://image.tmdb.org/t/p/original" + tv.backdrop_path;
  return (
    <Link className="link_movies" to={`/tv/${tv.id}`}>
      <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
        <div className="movie_titles">
          <h2>{tv.name}</h2>
        </div>
        <img className="img_movies" src={img} alt="" />
      </motion.div>
    </Link>
  );
};

export default Tv;