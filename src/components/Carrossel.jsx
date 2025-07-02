import { useState, useEffect } from 'react';

export default function Carrossel({ images }) {
const [carrosselIndex, setcarrosselIndex] = useState(0);
const [nextIndex, setNextIndex] = useState(1);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setcarrosselIndex((prev) => (prev + 1) % images.length);
        setNextIndex((prev) => (prev + 1) % images.length);
        setIsSliding(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-70 h-70 absolute left-1/2 -translate-x-1/2" style={{ top: '230px' }}>
      <img
        src={images[carrosselIndex]}
        alt="Atual"
        className={`object-contain w-full h-full absolute transition-all duration-500 ${
          isSliding ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
        key={carrosselIndex}
      />
      <img
        src={images[nextIndex]}
        alt="Próximo"
        className={`object-contain w-full h-full absolute transition-all duration-500 ${
          isSliding ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        key={nextIndex}
      />
    </div>
  );
}
