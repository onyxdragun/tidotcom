import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(imgRef.current);
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src: ''}
      alt={alt}
      className="gallery__img"
      onClick={onClick}
      style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
    />
  );
};

export default LazyImage;