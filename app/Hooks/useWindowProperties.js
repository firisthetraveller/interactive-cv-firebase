import { useState, useEffect } from 'react';

function getWindowProperties() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowProperties() {
  const [windowProperties, setWindowProperties] = useState(getWindowProperties());

  useEffect(() => {
    function handleResize() {
      setWindowProperties(p => ({ ...p, ...getWindowProperties() }));

      // Back to top
      if (window.innerWidth >= 1280) {
        window.scrollTo(0, 0);
      }
    }

    function handleScroll() {
      setWindowProperties(p => ({ ...p, scrollY: window.scrollY }));
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const isMobile = () => {
    return windowProperties.width < 1280;
  }

  return { ...windowProperties, isMobile };
}