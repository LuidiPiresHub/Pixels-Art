import { IGridSize } from './IGrid.interface';

export interface ILocalStorageData {
  pixels: string[];
  gridSize: IGridSize;
  gridIsDisable: boolean;
  pixelColor: string;
  isAdvancedMode: boolean
}