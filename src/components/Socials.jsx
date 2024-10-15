import React from 'react';
import { IconContext } from "react-icons";
import { FaInstagram, FaFacebookF, FaThreads, FaRegEnvelope, FaXTwitter } from 'react-icons/fa6';

const Socials = () => {
  return (
    <div className="socials">
      <IconContext.Provider
        value={{
          size: '2rem',
        }}
      >
        <a className="socials__icon" href="https://instagram.com/tyleringramphoto"><FaInstagram className="fa__icon" /></a>
        <a className="socials__icon" href="https://facebook.com/tyleringramphotography"><FaFacebookF className="fa__icon"/></a>
        <a className="socials__icon" href="https://threads.net/tyleringramphoto"><FaThreads className="fa__icon"/></a>
        <a className="socials__icon" href="https://twitter.com/tyleringram.com"><FaXTwitter className="fa__icon" /></a>
        <a className="socials__icon" href="mailto:tyler@dynamicshark.com"><FaRegEnvelope className="fa__icon"/></a>
      </IconContext.Provider>
    </div>
  );
};

export default Socials;