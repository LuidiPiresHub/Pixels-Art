import { IGridSize } from './IGrid.interface';

export default interface PixelsArtContextProps {
  pixelColor: string;
  setPixelColor: React.Dispatch<React.SetStateAction<string>>;
  gridIsDisable: boolean;
  setGridIsDisable: React.Dispatch<React.SetStateAction<boolean>>;
  gridSize: IGridSize;
  setGridSize: React.Dispatch<React.SetStateAction<IGridSize>>;
  pixels: string[];
  setPixels: React.Dispatch<React.SetStateAction<string[]>>;
  clearGrid: () => void;
  gridRef: React.MutableRefObject<HTMLDivElement | null>;
  handleSubmit: (event: React.FormEvent) => void;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  right: number;
  isActive: boolean;
  handleClick: () => void;
  isAdvancedMode: boolean;
  setIsAdvancedMode: React.Dispatch<React.SetStateAction<boolean>>;
  rotateDeg: number;
}
