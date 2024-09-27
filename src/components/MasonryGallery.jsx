import React, { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import LazyImage from './LazyImage.jsx';

const MasonryGallery = ({ images }) => {
  const galleryRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleOpenLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedImageIndex(null);
    }, 500);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => {
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    });
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => {
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  }

  const handleTouchEnd = () => {
    const touchThreshold = 50;
    if (touchStartX - touchEndX > touchThreshold) {
      // Swipe left
      nextImage();
    } else if (touchEndX - touchStartX > touchThreshold) {
      // Swipe right
      prevImage();
    }
  };

  return (
    <div ref={galleryRef}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry
          gutter=".5rem"
        >
          {images.map((image, index) => (
            <LazyImage
              key={index}
              src={`uploads/${image.filename}`}
              alt={image.title}
              onClick={() => handleOpenLightbox(index)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Lightbox */}
      {isOpen && selectedImageIndex !== null && (
        <div
          className={`gallery__lightbox ${isOpen ? 'gallery__lightbox--open' : ''}`}
          onClick={handleCloseLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="gallery__lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="gallery__lightbox__img"
              src={`/uploads/${images[selectedImageIndex].filename}`}
            />
            <button
              className="gallery__lightbox__nav gallery__lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              &lt;
            </button>
            <button
              className="gallery__lightbox__nav gallery__lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              &gt;
            </button>
            <button
              className="gallery__lightbox--close"
              onClick={handleCloseLightbox}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
};

export default MasonryGallery;