import { useContext } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import PixelsArtContext from '../context/PixelsArtContext';
import styles from '../styles/header.module.css';

export default function Header() {
  const {
    pixelColor,
    setPixelColor,
    setGridSize,
    handleSubmit,
    gridIsDisable,
    setGridIsDisable,
    clearGrid,
    gridRef,
  } = useContext(PixelsArtContext);

  let colorChangeTimeout: number;

  const handleColorChange = (newColor: string): void => {
    clearTimeout(colorChangeTimeout);
    colorChangeTimeout = setTimeout(() => {
      setPixelColor(newColor);
    }, 1);
  };

  return (
    <header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="color"
          className={styles.colorPallet}
          onChange={({ target: { value } }) => handleColorChange(value)}
          value={pixelColor}
        />
        <input
          type="number"
          min="5"
          max="50"
          placeholder="Tamanho"
          className={styles.inputSize}
          onChange={({ target: { value } }) => setGridSize(Number(value))}
        />
        <button type="submit" className={styles.confirmBtn}>
          Confirmar
        </button>
        <button
          type="button"
          className={styles.gridChanger}
          onClick={() => setGridIsDisable((prevState) => !prevState)}
        >
          {gridIsDisable ? 'Ativar Grade' : 'Desativar Grade'}
        </button>
        <button type="button" className={styles.clearBtn} onClick={clearGrid}>
          Apagar Tudo
        </button>
        <button
          type="button"
          className={styles.saveBtn}
          onClick={() => exportComponentAsJPEG(gridRef, { fileName: 'Minha Pixel-Art' })}
        >
          Salvar Desenho
        </button>
      </form>
    </header>
  );
}
