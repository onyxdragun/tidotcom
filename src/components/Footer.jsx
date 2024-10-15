import React from "react";

import Socials from "./Socials";

const Footer = () => {
  const year = new Date().getFullYear();
  return (

      <footer className="footer">
        <div className="footer__content">
          <p>&copy; {year} Tyler Ingram. All rights reserved.</p>
          <Socials />
        </div>
    </footer>
  );
};

export default Footer;