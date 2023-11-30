import { useContext, useState } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import PixelsArtContext from '../context/PixelsArtContext';
import styles from '../styles/header.module.css';

export default function Header() {
  const [isTranparent, setIsTranparent] = useState(false);
  const {
    pixelColor,
    setPixelColor,
    setGridSize,
    handleSubmit,
    gridIsDisable,
    setGridIsDisable,
    clearGrid,
    gridRef,
    right,
    isActive,
    handleClick,
  } = useContext(PixelsArtContext);

  let colorChangeTimeout: number;

  const handleColorChange = (newColor: string): void => {
    clearTimeout(colorChangeTimeout);
    colorChangeTimeout = setTimeout(() => {
      setPixelColor(newColor);
    }, 10);
  };

  window.onscroll = () => window.scrollY > 0 ? setIsTranparent(false) : setIsTranparent(true);

  return (
    <header
      className={`${styles.header} ${!isTranparent ? styles.headerBackground : ''}`.trim()}
    >
      <button type='button' className={styles.mobileNavibar} onClick={handleClick}>
        <span className={`${styles.bar} ${isActive ? styles.barActive : ''}`.trim()}></span>
        <span className={`${styles.bar} ${isActive ? styles.barActive : ''}`.trim()}></span>
        <span className={`${styles.bar} ${isActive ? styles.barActive : ''}`.trim()}></span>

      </button>
      <form
        className={styles.form}
        style={{ right: `${right}vw` }}
        onSubmit={handleSubmit}
      >
        <input
          type="color"
          className={`${styles.colorPallet} ${styles.button}`}
          onChange={({ target: { value } }) => handleColorChange(value)}
          value={pixelColor}
        />
        <input
          type="number"
          min="5"
          max="50"
          placeholder="Tamanho"
          className={`${styles.inputSize} ${styles.button}`}
          onChange={({ target: { value } }) => setGridSize(Number(value))}
        />
        <button type="submit" className={`${styles.confirmBtn} ${styles.button}`}>
          Confirmar
        </button>
        <button
          type="button"
          className={`${styles.gridChanger} ${styles.button}`}
          onClick={() => setGridIsDisable((prevState) => !prevState)}
        >
          {gridIsDisable ? 'Ativar Grade' : 'Desativar Grade'}
        </button>
        <button type="button" className={`${styles.clearBtn} ${styles.button}`} onClick={clearGrid}>
          Apagar Tudo
        </button>
        <button
          type="button"
          className={`${styles.saveBtn} ${styles.button}`}
          onClick={() => exportComponentAsJPEG(gridRef, { fileName: 'Minha Pixel-Art' })}
        >
          Salvar Desenho
        </button>
      </form>
    </header>
  );
}
