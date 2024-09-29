import React, { useState, useEffect } from "react";

import MasonryGallery from "./MasonryGallery";

const Gallery = ({category:{name = '', category = ''}}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      let url = '/api/images';
      try {
        if (category) {
          url += `?category=${category}`; 
        }
        console.log(url);
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    }
    fetchImages();
  }, [category]);

  return (
    <>
      <h2>Gallery{category.length === 0 ? '' : `: ${name}`}</h2>
      <MasonryGallery images={images} />
    </>
  );
};

export default Gallery;