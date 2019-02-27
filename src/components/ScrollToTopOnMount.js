import { useEffect, useState } from 'react';

function ScrollToTopOnMount() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      return;
    }

    window.scrollTo(0, 0);
    setMounted(true);
  });

  return null;  
}

export default ScrollToTopOnMount;
