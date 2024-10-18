import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import HomePage from "../components/HomePage.jsx";
import AboutPage from "../components/AboutPage.jsx";
import GalleryPage from "../components/GalleryPage.jsx"
import ServicesPage from "../components/ServicesPage.jsx";
import NotFoundPage from "../components/NotFoundPage.jsx";
import ContactPage from "../components/ContactPage.jsx";

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
        path="/services"
        element={<ServicesPage />}
      />
      <Route
        path="/about"
        element={<AboutPage />}
      />
      <Route
        path="/contact"
        element={<ContactPage />}
      />
      <Route
        path="/blog"
        element={
          () => {
            window.location.href = 'http://localhost:8000';
            return null;
          }
        }
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
    <Footer />
  </Router>
);

export default AppRouter;
