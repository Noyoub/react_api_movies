import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Header from './Header';
import logo from './cinema.png';
import { Link } from 'react-router-dom';


const SingleMovie = () => {
  const params = useParams();
  const movieId = params.movieId;
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similars, setSimilars] = useState([]);



  useEffect(() => {
    fetchPopular();
    fetchCredits();
    fetchVideos();
    fetchSimilar();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`);
    const movie_resp = await data.json();
    console.log(movie_resp.runtime);
    setMovie(movie_resp);
  }

  const fetchCredits = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`);
    const movie_resp = await data.json();
    setCredits(movie_resp.cast.slice(0, 5));
  }


  const fetchVideos = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`);
    const movie_resp = await data.json();
    setVideos(movie_resp.results.slice(0, 1));
  }

  const fetchSimilar = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`);
    const movie_resp = await data.json();
    setSimilars(movie_resp.results.slice(0, 5));
  }

  let date = new Date(movie.release_date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let date_film = date.toLocaleDateString('fr', options);

  const getMovies = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`).then((data) => data.json()).then((elem) => {
      setMovie(elem);
    });
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`).then((data) => data.json()).then((elem) => {
      setCredits(elem.cast.slice(0, 5));
    })
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`).then((data) => data.json()).then((elem) => {
      setVideos(elem.results.slice(0, 1));
    })
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`).then((data) => data.json()).then((elem) => {
      setSimilars(elem.results.slice(0, 5));
    })
  }

  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h" + rminutes + "min";
    }


  const img = "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
  const genres = movie.genres;

  return (
    <div className="singleMovieContainer">
      <Header />
      <div className="singleMovie" style={{background: `linear-gradient(to bottom, #0002, #000), center/cover url(${img})`, height:"100%", minHeight: "100vh"}}> 
        <img className="single-picture" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt=""/>
        <div className="movie_content">
          <h1 className="single_title">{movie.title}</h1>
          <p className="duree_film">{timeConvert(movie.runtime)}</p>
          <div className="genres">
            {genres && genres.map(genre => {
              return <div className="genre" key={genre.id}>{genre.name}</div>
            })}
          </div> 
          <p className="rate">Noté {movie.vote_average}/10</p>
          <p className="date">Date de sortie : {date_film}</p>
          <h3 className="cast-title">Synopsis</h3>
          <p>{movie.overview}</p>
          <h3 className="cast-title">Acteurs et actrices</h3>
          <div className="casts">
            {credits.map((item, i) => (
              <div key={i} className="casts__item">
                {item.profile_path ? <div className="casts__item__img" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.profile_path})`}}></div>  : <div className="casts__item__img" style={{backgroundImage: `url(${logo})`}}></div>}
                <p className="casts__item__name">{item.name}</p>
              </div>
            ))}
          </div>
        </div> 
      </div>
      <div className="video_section">
        {
          videos.map((item, i) => (
              <Video key={i} item={item}/>
          ))
        }    
      </div> 
      <h2 className="similar-title">Les films similaires</h2>
      <div className="similars">
            {similars.map((item, i) => (
              <Link to={`../movie/${item.id}`} key={i} className="similar" onClick={() => getMovies(item.id)}>
                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} width="100%" alt="" />
                <h3>{item.title}</h3>
              </Link>
            ))}
      </div>
    </div>

  );
};

const Video = props => {

  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
      const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
      iframeRef.current.setAttribute('height', height);
  }, []);

  return (
      <div className="video">
          <div className="video__title">
              <h2>{item.name}</h2>
          </div>
          <iframe
              src={`https://www.youtube.com/embed/${item.key}`}
              ref={iframeRef}
              width="100%"
              title="video"
          ></iframe>
      </div>
  )
}

export default SingleMovie;