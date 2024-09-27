import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "../components/Header.jsx";
import HomePage from "../components/HomePage.jsx";
import AboutPage from "../components/AboutPage.jsx";
import GalleryPage from "../components/GalleryPage.jsx"
import PricingPage from "../components/PricingPage.jsx";
import NotFoundPage from "../components/NotFoundPage.jsx";

const AppRouter = () => (
  <Router>
    <Header />
    <Routes>
      <Route
        path='/'
        element={<HomePage />}
      />
      <Route
        path="/gallery"
        element={<GalleryPage />}
      />
      <Route
        path="/pricing"
        element={<PricingPage />}
      />
      <Route
        path="/about"
        element={<AboutPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </Router>
);

export default AppRouter;
