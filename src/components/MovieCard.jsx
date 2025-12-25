import starIcon from "../assets/star.svg";

const MovieCard = ({ movie }) => {
  const {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  } = movie;

  return (
    <div className="
  bg-text/5
  backdrop-blur-md
  rounded-lg
  p-3
  flex flex-col
  ring-1 ring-text/10
  shadow-lg shadow-text/5
  
">

      
    
      <div className="w-full aspect-[2/3] rounded-md overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

     
      <h3 className="mt-2 text-text text-m font-semibold line-clamp-2">
        {title}
      </h3>

   
      <div className="mt-1 flex items-center gap-2 text-xs">
        <img src={starIcon} className="w-3 h-3" />

        <span className="text-text/70 font-medium">
          {vote_average?.toFixed(1)}
        </span>

        <span className="text-accent">
          {original_language}</span>  <span className="text-text/70">•</span>   <span className="text-text/70">{release_date?.slice(0, 4)}</span>
        
      </div>
    </div>
  );
};

export default MovieCard;
