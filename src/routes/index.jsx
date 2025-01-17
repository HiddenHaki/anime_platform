import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Page components
import Home from '../pages/Home';
import Search from '../pages/Search';
import AnimeDetails from '../pages/AnimeDetails';
import Trending from '../pages/Trending';
import Seasonal from '../pages/Seasonal';

// Layout component for page transitions
const PageTransition = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(children, {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
      })}
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/seasonal" element={<Seasonal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageTransition>
  );
};

export default AppRoutes; 