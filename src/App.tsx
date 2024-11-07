import BackgroundMusic from './components/BackgroundMusic';
import Grid from './components/Grid';
import Header from './components/Header';
import PixelsArtProvider from './context/PixelsArtProvider';

export default function App() {
  return (
    <PixelsArtProvider>
      <BackgroundMusic />
      <Header />
      <Grid />
    </PixelsArtProvider>
  );
}
