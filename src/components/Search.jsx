import React from 'react'
import searchIcon from '../assets/search.svg';
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src={searchIcon} alt="search" 
        className="transition transform duration-300 hover:scale-110"
        />

        <input
        
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder:text-text/50"
        />
      </div>
    </div>
  )
}
export default Search