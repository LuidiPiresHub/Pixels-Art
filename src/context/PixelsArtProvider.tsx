import { useState, useEffect, useRef, FormEvent } from 'react';
import Swal from 'sweetalert2';
import PixelsArtContext from './PixelsArtContext';

export default function PixelsArtProvider({ children }: { children: React.ReactNode }) {
  const [pixels, setPixels] = useState<string[]>([]);
  const [pixelColor, setPixelColor] = useState<string>('#000000');
  const [gridSize, setGridSize] = useState<number>(5);
  const [gridIsDisable, setGridIsDisable] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const [right, setRight] = useState(-100);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prevState) => !prevState);
    setRight(isActive ? -100 : 0);
  };

  const generatePixels = (): string[] => Array.from({ length: gridSize * gridSize }, () => '#ffffff');

  const setCssGridVariable = (gridSize: number): void => document.documentElement.style.setProperty('--grid-size', JSON.stringify(gridSize));

  const generateGrid = (): void => {
    setCssGridVariable(gridSize);
    setPixels(generatePixels());
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Alterar grade?',
      text: 'Isso irá apagar seu desenho!',
      confirmButtonText: 'Mudar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        handleClick();
        generateGrid();
      }
    });
  };

  const clearGrid = (): void => {
    Swal.fire({
      icon: 'warning',
      title: 'Limpar tudo?',
      text: 'Você irá perder todo o seu desenho caso não tenha salvo!',
      confirmButtonText: 'Apagar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        handleClick();
        setPixels(generatePixels());
      }
    });
  };

  const savePixelArtOnLocalStorage = (): void => localStorage.setItem('pixel-art', JSON.stringify({ pixels, gridSize, gridIsDisable, pixelColor }));

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect((): void => {
    const drawData = localStorage.getItem('pixel-art');
    if (drawData) {
      const { pixels, gridSize, pixelColor, gridIsDisable } = JSON.parse(drawData!);
      setPixels(pixels);
      setGridSize(gridSize);
      setPixelColor(pixelColor);
      setGridIsDisable(gridIsDisable);
      setCssGridVariable(gridSize);
    } else {
      generateGrid();
    }
  }, []);

  useEffect((): void => savePixelArtOnLocalStorage(), [pixels, gridSize, gridIsDisable, pixelColor]);

  document.addEventListener('mousedown', () => setIsMouseDown(true));
  document.addEventListener('mouseup', () => setIsMouseDown(false));

  const globalContent = {
    pixels,
    setPixels,
    pixelColor,
    setPixelColor,
    gridSize,
    setGridSize,
    handleSubmit,
    gridIsDisable,
    setGridIsDisable,
    clearGrid,
    gridRef,
    isMouseDown,
    setIsMouseDown,

    right,
    isActive,
    handleClick,
  };

  return (
    <PixelsArtContext.Provider value={globalContent}>
      {children}
    </PixelsArtContext.Provider>
  );
}
