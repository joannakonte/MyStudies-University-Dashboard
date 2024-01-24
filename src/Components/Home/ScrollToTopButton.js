import React, { useState, useEffect } from 'react';
import styles from './ScrollToTopButton.module.css';
import { FaArrowUp } from 'react-icons/fa'; 

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  const handleScroll = () => {
    const yOffset = window.scrollY;
    if (yOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Attach and remove the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`} onClick={scrollToTop}>
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTopButton;
