import React, { useState } from "react";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Gallery from "./Gallery";

const GalleryPage = () => {
  useDocumentTitle("Gallery");

  const navItems = [
    {
      name: 'All',
      category: '',
    },
    {
      name: 'Wildlife',
      category: 'wildlife',
    },
    {
      name: 'People',
      category: 'people',
    },
    {
      name: 'Landscapes',
      category: 'landscape'
    },    
  ];

  const [category, setCategory] = useState({name: '', category:''});

  return (
    <>
      <nav className="gallery__nav">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={()=> setCategory(item)}
            className={`gallery__nav__button ${category.category === item.category ? 'gallery__nav__button--active' : ''}`}
          >
            {item.name}
          </button>
        ))}
      </nav>
      <Gallery category={category} />
    </>
  );
};

export default GalleryPage;