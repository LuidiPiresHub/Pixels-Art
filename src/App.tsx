import { FormEvent, useEffect, useRef, useState } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';

export default function App() {
  const [gridSize, setGridSize] = useState<number>(5);
  const [pixels, setPixels] = useState<string[]>([]);
  const [pixelColor, setPixelColor] = useState<string>('#000000');
  const [gridIsDisable, setGridIsDisable] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const savePixelArtOnLocalStorage = (): void => localStorage.setItem('pixel-art', JSON.stringify({ pixels, gridSize, gridIsDisable, pixelColor }));

  const paintPixel = (index: number): void => {
    setPixels((prevState) => {
      const newPixels = [...prevState];
      newPixels[index] = pixelColor;
      return newPixels;
    });
  };

  const handleMouseDrag = (index: number): void => {
    if (isMouseDown) {
      setPixels((prevState) => {
        const newPixels = [...prevState];
        newPixels[index] = pixelColor;
        return newPixels;
      });
    }
  }

  let colorChangeTimeout: number;

  const handleColorChange = (newColor: string): void => {
    clearTimeout(colorChangeTimeout);
    colorChangeTimeout = setTimeout(() => {
      setPixelColor(newColor);
    }, 1);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (window.confirm("Tem certeza que deseja mudar o tamanho da grade?\nIsso irá apagar seu desenho!")) {
      generateGrid();
    }
  }

  const generatePixels = (): string[] => Array.from({ length: gridSize * gridSize }, () => '#ffffff');

  const generateGrid = (): void => {
    document.documentElement.style.setProperty('--grid-size', JSON.stringify(gridSize));
    setPixels(generatePixels());
  };

  const clearGrid = (): void => {
    const confirmClear = window.confirm("Tem certeza que deseja apagar tudo?");
    if (confirmClear) setPixels(generatePixels());
  };

  useEffect((): void => {
    const drawData = localStorage.getItem('pixel-art');
    if (drawData) {
      const { pixels, gridSize, pixelColor, gridIsDisable } = JSON.parse(drawData!);
      setPixels(pixels);
      setGridSize(gridSize);
      setPixelColor(pixelColor)
      setGridIsDisable(gridIsDisable);
      document.documentElement.style.setProperty('--grid-size', JSON.stringify(gridSize));
    } else {
      generateGrid();
    }
  }, []);

  useEffect((): void => savePixelArtOnLocalStorage(), [pixels, gridSize, gridIsDisable, pixelColor]);

  const gridRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="container"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <input
          type="color"
          className="colorPallet"
          onChange={({ target: { value } }) => handleColorChange(value)}
          value={pixelColor}
        />
        <input
          type="number"
          min="5"
          max="50"
          placeholder="Tamanho"
          className="inputSize"
          onChange={({ target: { value } }) => setGridSize(Number(value))}
        />
        <button
          type="submit"
          className="confirmBtn"
        >
          Confirmar
        </button>
        <button
          type="button"
          className="gridChanger"
          onClick={() => setGridIsDisable((prevState) => !prevState)}
        >
          {gridIsDisable ? 'Ativar Grade' : 'Desativar Grade'}
        </button>
        <button
          type='button'
          className='clearBtn'
          onClick={clearGrid}
        >
          Apagar Tudo
        </button>
        <button
          type='button'
          className='saveBtn'
          onClick={() => exportComponentAsJPEG(gridRef, { fileName: 'Minha Pixel-Art' })}
        >
          Salvar Desenho
        </button>
      </form>
      <div
        ref={gridRef}
        className="grid"
        style={{ border: gridIsDisable ? 'none' : '1px solid black' }}
      >
        {pixels.map((color, index) => (
          <div
            key={index}
            className="pixel"
            style={{
              backgroundColor: color,
              border: gridIsDisable ? 'none' : '1px solid black',
            }}
            onMouseDown={() => paintPixel(index)}
            onMouseOver={() => handleMouseDrag(index)}
            onTouchMove={() => paintPixel(index)}
          />
        ))}
      </div>
    </div>
  );
}
