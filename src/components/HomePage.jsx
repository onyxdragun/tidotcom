import React from "react";

import {useDocumentTitle} from '../hooks/useDocumentTitle.js';
import BlogPosts from "./BlogPosts";
import Gallery from "./Gallery";

const HomePage = () => {
  useDocumentTitle('');
  return (
    <>
      <div className="container">
        <div className="homepage__container">
          <div className="homepage__box homepage__about">
            <h2>Comox Valley Photography</h2>
            <p>
              Hi, I'm Tyler—a photographer based out of the beautiful Comox Valley on 
              Vancouver Island, Canada. My photography journey began when I was young, 
              sparked by a love for capturing the incredible wildlife that surrounds me. 
              One of my favorite moments was being able to photograph my own children and having 
              those moments saved to look back on in years to come. This solidifed my passion for 
              family lifestyle photography.
            </p>
            <p>
              My photographic goal is to create timeless, lasting memories that resonate with 
              people. I believe that every photograph tells a story, and I'm dedicated to 
              capturing your unique moments—whether it's a family gathering, a special 
              event, or the beauty in everyday life.
            </p>
            <p>
              When I'm not behind the camera, you can find me exploring the great 
              outdoors with my family, always on the lookout for new adventures and 
              photography locations that inspire my creativity. I also dabble in web 
              development, which helps me share my work and connect with clients in 
              innovative ways.
            </p>
            <p>
              I'm excited to share my passion with you and help you capture your 
               moments. Feel free to reach out if you have any questions or would 
               like to discuss a potential project!
            </p>
          </div>
          <div className="homepage__box homepage__about">
            <img className="homepage__img" src="/images/IMG_6494.jpg" />
          </div>
        </div>
      </div>
      <div className="container">
        <Gallery category={{}}/>
      </div>
      <div className="container">
        <BlogPosts />
      </div>
    </>
  );
};

export default HomePage;