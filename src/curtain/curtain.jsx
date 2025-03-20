import { useState, useEffect } from 'react';
import img1 from './persiana_animada/persiana1.png';
import img2 from './persiana_animada/persiana2.png';
import img3 from './persiana_animada/persiana3.png';
import img4 from './persiana_animada/persiana4.png';
import img5 from './persiana_animada/persiana5.png';
import img6 from './persiana_animada/persiana6.png';
import img7 from './persiana_animada/persiana7.png';
import img8 from './persiana_animada/persiana8.png';
import img9 from './persiana_animada/persiana9.png';
import img10 from './persiana_animada/persiana10.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const Curtain = ({ openWindow }) => {
  const [currentImage, setCurrentImage] = useState(img1);

  useEffect(() => {
    if (openWindow === 'initial') {
      setCurrentImage(img1);
      return;
    }

    let index = openWindow === 'abierto' ? 0 : images.length - 1;
    const step = openWindow === 'abierto' ? 1 : -1;

    const interval = setInterval(() => {
      if ((openWindow === 'abierto' && index >= images.length) || (openWindow === 'cerrado' && index < 0)) {
        clearInterval(interval);
        return;
      }
      setCurrentImage(images[index]);
      index += step;
    }, 100);

    return () => clearInterval(interval);
  }, [openWindow]);

  return <img src={currentImage} alt="persiana" />;
};

export default Curtain;