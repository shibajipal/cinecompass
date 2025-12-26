import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Search from '../components/Search.jsx'
import MovieCard from '../components/MovieCard.jsx'

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = ({
  searchTerm,
  setSearchTerm,
  debouncedSearchTerm,
  page: initialPage
}) => {
  const { page: pageParam } = useParams();
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const currentPage = pageParam ? parseInt(pageParam) : (initialPage || 1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const endpoint = debouncedSearchTerm
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(debouncedSearchTerm)}&page=${currentPage}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${currentPage}`;

        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) throw new Error("Couldn't fetch movies");

        const data = await response.json();
        setMovieList(data.results || []);
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to fetch movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearchTerm, currentPage]);

  const goToPage = (pageNum) => {
    if (pageNum === 1) {
      navigate('/');
    } else {
      navigate(`/page/${pageNum}`);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      
     
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #100000 40%, #0d1a36 100%)",
        }}
      />

 
      <div className="relative z-10 wrapper">
        <header>
          <h1>
            Find{' '}
            <span
  className="
    text-6xl font-extrabold inline-block
    text-transparent bg-clip-text
    bg-gradient-to-r from-primary via-secondary to-accent
   
  "
>
  Movies
</span>{' '}
            that suit your taste!
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </header>

        <section className="all-movies">
          <h2 className="py-15 ml-130 text-3xl">All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading Movies...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              <ul>
                {movieList.map(movie => (
                  <Link key={movie.id} to={`/movie/${movie.id}`} className="no-underline">
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </ul>

              <div className="flex justify-center items-center gap-2 mt-8 mb-8 flex-wrap">
                <button 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-text rounded-lg font-semibold transition-colors"
                >
                  ← Previous
                </button>

                
                {currentPage > 3 && (
                  <>
                    <button 
                      onClick={() => goToPage(1)}
                      className="px-3 py-2 bg-background hover:bg-primary/80 text-text rounded-lg font-semibold transition-colors"
                    >
                      1
                    </button>
                    {currentPage > 4 && <span className="text-text">...</span>}
                  </>
                )}

                {Array.from({ length: 5 }, (_, i) => {
                  const pageNum = currentPage - 2 + i;
                  return pageNum > 0 ? pageNum : null;
                }).filter(Boolean).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                      pageNum === currentPage
                        ? 'bg-primary text-text'
                        : 'bg-background hover:bg-primary/80 text-text'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {movieList.length === 20 && (
                  <>
                    {currentPage < 98 && <span className="text-text">...</span>}
                    <button 
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={movieList.length < 20}
                      className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-text rounded-lg font-semibold transition-colors"
                    >
                      Next →
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default Home
