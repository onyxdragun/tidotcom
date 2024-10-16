import React, {useState, useEffect} from "react";
import Navigation from "./Navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className="header">
      <a className="header__content" href="/">
        <h1 className={`header__title${isScrolled ? '--small' : ''}`}>
          Tyler Ingram Photography</h1>
        <h2 className={`header__subtitle${isScrolled ? '--hidden' : ''}`}>
          Vancouver Island Photographer
        </h2>
      </a>
      <Navigation />
    </header>
  );
}

export default Header;