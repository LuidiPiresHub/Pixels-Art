export default interface PixelsArtContextProps {
  pixelColor: string;
  setPixelColor: React.Dispatch<React.SetStateAction<string>>;
  gridIsDisable: boolean;
  setGridIsDisable: React.Dispatch<React.SetStateAction<boolean>>;
  gridSize: number;
  setGridSize: React.Dispatch<React.SetStateAction<number>>;
  pixels: string[];
  setPixels: React.Dispatch<React.SetStateAction<string[]>>;
  clearGrid: () => void;
  gridRef: React.MutableRefObject<HTMLDivElement | null>;
  handleSubmit: (event: React.FormEvent) => void;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
}
