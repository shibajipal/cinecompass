import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDebounce } from 'react-use';

import Home from './pages/Home.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              debouncedSearchTerm={debouncedSearchTerm}
              page={1}
            />
          }
        />
        <Route
          path="/page/:page"
          element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              debouncedSearchTerm={debouncedSearchTerm}
            />
          }
        />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
