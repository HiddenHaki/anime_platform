import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';

// Pages
import Home from './pages/Home';
import News from './pages/News';
import Trending from './pages/Trending';
import Seasonal from './pages/Seasonal';
import Search from './pages/Search';
import AnimeDetails from './pages/AnimeDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/seasonal" element={<Seasonal />} />
          <Route path="/search" element={<Search />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
