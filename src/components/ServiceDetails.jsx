import React from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa6";

const ServiceDetails = ({ service, index }) => {
  const { title, description, duration, cost, deliverables, bgimage, callToAction } = service;

  return (
    <div
      className="servicedetails__container"
      style={{ backgroundImage: `url(${bgimage})`}}
    >
      <div className="servicedetails__overlay"></div>
      <div className="servicedetails__content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="servicedetails__info">
          <ul className="servicedetails__items">
            <li className="servicedetails__item">
              <strong>Duration:</strong> {duration}
            </li>
            <li className="servicedetails__item">
              <strong>Investment:</strong> {cost}
            </li>
            <li className="servicedetails__item">
              <strong>What you receive:</strong>
            </li>
            <ul className="servicedetails__deliverables">
              {deliverables.map((item, index) => (
                <li
                  key={index}
                  className="servicedetails__deliverables__item"
                >
                  <FaCanadianMapleLeaf className="servicedetails__icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {callToAction && (
              <div className="servicedetails__calltoaction">
                {callToAction}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;