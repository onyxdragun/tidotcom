import React, { useState, useEffect } from "react";

import MasonryGallery from "./MasonryGallery";

const Gallery = ({category:{name = '', category = ''}}) => {
  const [images, setImages] = useState([]);
  let url = 'https://192.168.1.20:8080/images';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (category) {
          url += `?category=${category}`; 
        }
        const response = await fetch(url);
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