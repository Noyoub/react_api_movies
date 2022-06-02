import React, { useEffect } from 'react';

const FilterTv = ({setActiveGenre, activeGenre, setFiltered, popular}) => {

  useEffect(() => {
    if(activeGenre === 0){
      setFiltered(popular);
      return;
    }
    const filtered = popular.filter((movie) => movie.genre_ids.includes(activeGenre));
    setFiltered(filtered);
  }, [activeGenre])

  return (
    <div className="filter-container">
      <button className={activeGenre === 0 ? "active" : ""} onClick={() => setActiveGenre(0)}>Tous</button>
      <button className={activeGenre === 10759 ? "active" : ""} onClick={() => setActiveGenre(10759)}>Action & Adventure</button>
      <button className={activeGenre === 16 ? "active" : ""} onClick={() => setActiveGenre(16)}>Animation</button>
      <button className={activeGenre === 35 ? "active" : ""} onClick={() => setActiveGenre(35)}>Comedie</button>
      <button className={activeGenre === 80 ? "active" : ""} onClick={() => setActiveGenre(80)}>Horreur</button>
    </div>
  );
};

export default FilterTv;