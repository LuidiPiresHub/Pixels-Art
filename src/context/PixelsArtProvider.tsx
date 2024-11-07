import { useState, useEffect, useRef, FormEvent } from 'react';
import Swal from 'sweetalert2';
import PixelsArtContext from './PixelsArtContext';
import { IGridSize } from '../interfaces/IGrid.interface';
import { ILocalStorageData } from '../interfaces/localStorageData.interface';

export default function PixelsArtProvider({ children }: { children: React.ReactNode }) {
  const [pixels, setPixels] = useState<string[]>([]);
  const [pixelColor, setPixelColor] = useState<string>('#000000');
  const [gridSize, setGridSize] = useState<IGridSize>({ x: 5, y: 5 });
  const [gridIsDisable, setGridIsDisable] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);
  const [right, setRight] = useState(-100);
  const [isActive, setIsActive] = useState(false);
  const [rotateDeg, setRotateDeg] = useState(0);

  const handleClick = () => {
    setIsActive((prevState) => !prevState);
    setRight(isActive ? -100 : 0);
  };

  const generatePixels = (): string[] => Array.from({ length: gridSize.x * gridSize.y }, () => '#ffffff');

  const setCssGridVariable = ({ x, y }: IGridSize): void => {
    if (x < y) {
      [x, y] = [y, x];
      setRotateDeg(90);
    } else {
      setRotateDeg(0);
    }
    document.documentElement.style.setProperty('--grid-size-x', String(x));
    document.documentElement.style.setProperty('--grid-size-y', String(y));
  };

  const generateGrid = (): void => {
    if (gridSize.x <= 50 || gridSize.y <= 50) {
      setCssGridVariable(gridSize);
      setPixels(generatePixels());
    }
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



  const savePixelArtOnLocalStorage = (): void => {
    localStorage.setItem('pixel-art', JSON.stringify({
      pixels,
      gridSize,
      gridIsDisable,
      pixelColor,
      isAdvancedMode
    }));
  };

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect((): void => {
    const drawData = localStorage.getItem('pixel-art');
    if (drawData) {
      const { pixels, gridSize, pixelColor, gridIsDisable, isAdvancedMode }: ILocalStorageData = JSON.parse(drawData);
      setPixels(pixels);
      setGridSize({ x: gridSize.x, y: gridSize.y });
      setPixelColor(pixelColor);
      setGridIsDisable(gridIsDisable);
      setCssGridVariable(gridSize);
      setIsAdvancedMode(isAdvancedMode);
    } else {
      generateGrid();
    }
  }, []);

  useEffect((): void => savePixelArtOnLocalStorage(), [pixels, gridIsDisable, pixelColor, isAdvancedMode]);

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
    isAdvancedMode,
    setIsAdvancedMode,
    rotateDeg,
  };

  return (
    <PixelsArtContext.Provider value={globalContent}>
      {children}
    </PixelsArtContext.Provider>
  );
}
