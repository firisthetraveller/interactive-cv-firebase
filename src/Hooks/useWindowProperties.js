import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowProperties() {
  const [windowDimensions, setWindowProperties] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowProperties(p => ({ ...p, ...getWindowDimensions() }));

      // Back to top
      if (window.innerWidth >= 1280) {
        window.scrollTo(0, 0);
      }
    }

    const handleScroll = () => {
      setWindowProperties(p => ({ ...p, scrollY: window.scrollY }));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const isMobile = () => {
    return windowDimensions.width < 1280;
  }

  return { ...windowDimensions, isMobile };
}