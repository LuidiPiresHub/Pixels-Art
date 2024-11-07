import { useContext } from 'react';
import PixelsArtContext from '../context/PixelsArtContext';
import styles from '../styles/grid.module.css';

export default function Grid() {
  const {
    pixels,
    setPixels,
    pixelColor,
    gridIsDisable,
    gridRef,
    isMouseDown,
    rotateDeg,
  } = useContext(PixelsArtContext);

  const paintPixel = (index: number): void => {
    const newPixels = [...pixels];
    newPixels[index] = pixelColor;
    setPixels(newPixels);
  };

  const handleMouseDrag = (index: number): void => {
    if (isMouseDown) {
      const newPixels = [...pixels];
      newPixels[index] = pixelColor;
      setPixels(newPixels);
    }
  };

  return (
    <section
      ref={gridRef}
      className={`${styles.grid} ${gridIsDisable ? styles.noBorder : styles.withBorder}`}
      style={{ transform: `rotate(${rotateDeg}deg)` }}
    >
      {pixels.map((color, index) => (
        <div
          key={index}
          className={`${styles.pixel} ${gridIsDisable ? styles.noBorder : styles.withBorder}`}
          style={{ backgroundColor: color }}
          onMouseDown={() => paintPixel(index)}
          onMouseOver={() => handleMouseDrag(index)}
        />
      ))}
    </section>
  );
}
