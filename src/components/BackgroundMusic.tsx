import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import Lofi from '../assets/Lofi.mp3';
import styles from '../styles/backgroundMusic.module.css';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgress = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (audioRef.current.duration * parseInt(e.target.value)) / 100;
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={Lofi}
        loop
        onTimeUpdate={handleProgress}
      />
      <section className={styles.musicContainer}>
        <span className={styles.songTitle}>Lofi Geek - Dreams</span>
        <section className={styles.seekBarWrapper}>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className={styles.seekBar}
          />
          <div
            className={styles.seekBarProgress}
            style={{ width: `${progress}%` }}
          />
        </section>
        <section className={styles.btnWrapper}>
          <button
            onClick={togglePlayPause}
            className={styles.playPauseButton}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={toggleMute}
            className={styles.muteButton}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </section>

      </section>
    </>
  );
}
