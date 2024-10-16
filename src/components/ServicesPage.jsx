import React from "react";
import { NavLink } from "react-router-dom";

import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import ServiceDetails from "./ServiceDetails.jsx";

const servicesOffered = [
  {
    title: 'Family Lifestyle Photoshoot',
    description: `
    Capture your family's most authentic moments with a candid, "paparazzi-style" 
    photoshoot that lets the real you shine through. Whether you're playing together 
    outdoors or enjoying time at home, I'll be there to capture those spontaneous, 
    heartfelt interactions—often without you even realizing it! My approach 
    focuses on documenting fun and connection in a natural, relaxed way. Perfect 
    for families who value genuine, unscripted memories, my lifestyle photoshoots 
    leave you with timeless images that reflect the joy of everyday life.
    `,
    duration: '1-hour',
    cost: '$200',
    deliverables: [
      "15-20 full-resolution images digitally delivered to you",
      "A mix of candid and lightly guided family images",
    ],
    bgimage: '/images/20231008-9789.jpg',
    callToAction: (
      <NavLink to="/contact">
        <button className="servicedetails__contact-btn">Book Now!</button>
      </NavLink>
    )
  },
  {
    title: 'Product Photography',
    description: `
    I offer customized product photography that brings your brand's vision to life. 
    Whether you need stunning imagery for social media, website showcases, or print 
    materials, I work closely with you to ensure the style and tone align with your 
    goals. From clean, minimal shots to creative and dynamic compositions, I capture 
    the essence of your products in a way that engages your audience and enhances your 
    brand's visual presence.
    `,
    duration: 'Variable',
    cost: (
      <NavLink to="/contact">
        <button className="servicedetails__contact-btn">Contact Me</button>
      </NavLink>
    ),
    deliverables: [
      "Full resolution images in both Vertical and Horizontal orientation (if applicable)",
      "Images that can be used in 9:16 ratio for mobile social media platforms (great for Reels/Stories)",
    ],
    bgimage: '/images/20240412-3190.jpg',
    callToAction: ''
  },
];

const ServicesPage = () => {
  useDocumentTitle('Services');

  return (
    <div className="container">
      <div className="servicespage__container">
        {servicesOffered.map((service, index) => (
          <ServiceDetails key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;