import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './cinema.png';

const Header = ({handleSubmit, handleChange, searchTerm, header}) => {
  const navLinkStyle = ({isActive}) => {
    return{
      fontWeight: isActive ? 'bold' : 'normal'
    }
  }
  return (
    <nav className="header">
      <div>
        <img className="logo-site" src={logo} alt="logo" width="25px"/>
        <NavLink style={navLinkStyle} to="/">Films</NavLink>
        <NavLink style={navLinkStyle} to="/tv">Séries</NavLink>
      </div>
      {header &&       
      <form onSubmit={handleSubmit}>
          <input type="search" className="search" placeholder="Recherche..." value={searchTerm} onChange={handleChange}/>
      </form>
      }


    </nav>
  );
};

export default Header;