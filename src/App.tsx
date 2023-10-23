import Grid from './components/Grid';
import Header from './components/Header';
import PixelsArtProvider from './context/PixelsArtProvider';

export default function App() {
  return (
    <PixelsArtProvider>
      <Header />
      <Grid />
    </PixelsArtProvider>
  );
}
