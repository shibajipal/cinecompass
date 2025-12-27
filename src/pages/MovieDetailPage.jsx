import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../lib/api';
import starIcon from '../assets/star.svg';
const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!movie) return <p className="text-red-500">Movie not found.</p>;

  return (
    <main className="relative min-h-screen bg-background/50 overflow-hidden p-4 sm:p-10">
      <div className="flex items-center">
  <Link to="/" className="text-white text-sm sm:text-base">
    ← Back
  </Link>
</div>

      <div className="movie-detail mt-5">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold inline-block text-text ml-0 sm:ml-5">{movie.title}</h2>
        <div className = "main-group flex flex-col lg:flex-row gap-4 items-start mt-4 ml-0 sm:ml-5 ring-1 ring-text/10 p-4 sm:p-6 rounded-lg shadow-lg shadow-text/5 bg-text/5 backdrop-blur-md">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={movie.title}
          className="flex-shrink-0 w-40 h-56 sm:w-64 sm:h-96 object-cover rounded-lg mx-auto lg:mx-0"
        />
        <div className = "other-details flex flex-col gap-4 sm:gap-6 mt-0 sm:mt-45 ml-0 sm:ml-5 items-start w-full">
          <div className = "first-line flex flex-row gap-2 sm:gap-3 items-center mt-0 sm:mt-[-180px] ml-0 sm:ml-5 flex-wrap">  
          <p className = "text-white text-lg sm:text-3xl"><strong></strong> {movie.release_date || 'N/A'}</p>
<span className="text-white">•</span>
          <div className = "rating flex flex-row gap-1 sm:gap-2 items-center">
          <p className = "text-white text-lg sm:text-3xl"> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
            <img src={starIcon} alt="star icon" className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <span className="text-white">•</span>
          <p className = "text-accent text-lg sm:text-3xl"> {movie.original_language || 'N/A'}</p>
            </div>
          <p className = "text-white/80 text-sm sm:text-base lg:text-lg ml-0 sm:ml-5 text-left"> {movie.overview || 'N/A'}</p>
          <div className="ml-0 sm:ml-5 flex flex-row gap-2 sm:gap-3 flex-wrap">
            {movie.genres && movie.genres.length > 0 ? (
              movie.genres.map((genre) => (
                <span key={genre.id} className="bg-secondary/70 r text-text px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  {genre.name}
                </span>
              ))
            ) : (
              <p className="text-white text-sm">No genres available</p>
            )}
          </div>

         
          <div className="ml-0 sm:ml-5 w-full flex flex-col gap-3 sm:gap-4 mt-2">
          
            <div className="flex flex-row gap-4 sm:gap-8 flex-wrap">
              {movie.runtime && (
                <div className="flex flex-col">
                  <p className="text-accent text-xs sm:text-sm font-semibold">Runtime</p>
                  <p className="text-white text-base sm:text-lg">{movie.runtime} minutes</p>
                </div>
              )}
              {movie.status && (
                <div className="flex flex-col">
                  <p className="text-accent text-xs sm:text-sm font-semibold">Status</p>
                  <p className="text-white text-base sm:text-lg">{movie.status}</p>
                </div>
              )}
              {movie.budget > 0 && (
                <div className="flex flex-col">
                  <p className="text-accent text-xs sm:text-sm font-semibold">Budget</p>
                  <p className="text-white text-base sm:text-lg">${(movie.budget / 1000000).toFixed(1)}M</p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="flex flex-col">
                  <p className="text-accent text-xs sm:text-sm font-semibold">Revenue</p>
                  <p className="text-white text-base sm:text-lg">${(movie.revenue / 1000000).toFixed(1)}M</p>
                </div>
              )}
            </div>

           
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="flex flex-col">
                <p className="text-accent text-xs sm:text-sm font-semibold mb-2">Production Companies</p>
                <div className="flex flex-row gap-2 sm:gap-3 flex-wrap">
                  {movie.production_companies.map((company) => (
                    <a 
                      key={company.id}
                      href={`https://www.themoviedb.org/company/${company.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/60 hover:bg-primary/80 text-text px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                    >
                      {company.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

     

          </div>
                      {movie.videos && movie.videos.length > 0 && (
              <div className="flex flex-col w-full ml-[-280px] mt-6">
                <p className="text-accent text-xl font-semibold mb-3">Trailers & Videos</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                  {movie.videos.filter(video => video.type === 'Trailer' || video.type === 'Teaser').slice(0, 6).map((video) => (
                    <div key={video.id} className="flex flex-col ">
                      <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ paddingBottom: '60%' }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <p className="text-text/70 text-sm font-medium">{video.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>    
      </div>
    </main>
  );
};

export default MovieDetailPage;
