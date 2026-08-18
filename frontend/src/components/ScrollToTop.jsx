import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      let attempts = 0;
      
      const tryScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          // Wait a tiny bit more for layout to settle, then scroll
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else if (attempts < 25) { // Retry for 2.5 seconds (25 * 100ms)
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };

      tryScroll();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
