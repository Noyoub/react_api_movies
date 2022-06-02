import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Header from './Header';
import logo from './cinema.png';


const SingleTv = () => {
  const params = useParams();
  const tvId = params.tvId;
  const [tv, setTv] = useState({});
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchPopular();
    fetchCredits();
    fetchVideos();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`);
    const tv_resp = await data.json();
    console.log(tv_resp)
    setTv(tv_resp);
  }

  const fetchCredits = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`);
    const tv_resp = await data.json();
    setCredits(tv_resp.cast.slice(0, 5));
  }


  const fetchVideos = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=d5c35e51c81488b19da7c1f572507a3d&language=fr-FR&page=1`);
    const tv_resp = await data.json();
    setVideos(tv_resp.results.slice(0, 1));
  }

  let date = new Date(tv.first_air_date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let date_serie = date.toLocaleDateString('fr', options);

  const img = "https://image.tmdb.org/t/p/original" + tv.backdrop_path;
  const genres = tv.genres;

  return (
    <div className="singleMovieContainer">
      <Header />
      <div className="singleMovie" style={{background: `linear-gradient(to bottom, #0002, #000), center/cover url(${img})`, height:"100%", minHeight: "100vh"}}> 
        <img className="single-picture" src={"https://image.tmdb.org/t/p/original" + tv.poster_path} alt=""/>
        <div className="movie_content">
          <h1 className="single_title">{tv.original_name}</h1>
          <p>{tv.number_of_seasons} saisons</p>
          <div className="genres">
            {genres && genres.map(genre => {
              return <div className="genre" key={genre.id}>{genre.name}</div>
            })}
          </div> 
          <p className="rate">Noté {tv.vote_average}/10</p>
          <p className="date">Date de sortie : {date_serie}</p>
          <h3 className="cast-title">Synopsis</h3>
          <p>{tv.overview}</p>
          <h3 className="cast-title">Acteurs et actrices</h3>
          <div className="casts">
            {credits.map((item, i) => (
                <div key={i} className="casts__item">
                  {item.profile_path ? <div className="casts__item__img" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.profile_path})`}}></div>  : <div className="casts__item__img" style={{backgroundImage: `url(${logo})`}}></div>}
                  <p className="casts__item__name">{item.name}</p>
                </div>
            ))}
          </div>
          {/* {movie.production_companies && movie.production_companies[0].logo_path && <img className="single-picture-companie" src={"https://image.tmdb.org/t/p/original" + movie.production_companies[0].logo_path} alt=""/>} */}
        </div> 
      </div>
      <div className="video_section">
        {
          videos.map((item, i) => (
              <Video key={i} item={item}/>
          ))
        }    
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

export default SingleTv;