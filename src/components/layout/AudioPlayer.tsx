
'use client';

import { useEffect, useRef } from 'react';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const musicPath = "/music/wedding-theme.mp3"; // Path to your music file in the public folder

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      // Attempt to play the audio
      // Browsers may block autoplay with sound until user interaction
      audioElement.play().catch(error => {
        console.warn("Audio autoplay was prevented by the browser:", error);
        // Optionally, you could show a play button here or prompt the user
      });
    }
  }, []);

  return (
    <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
      <audio ref={audioRef} src={musicPath} loop autoPlay preload="auto" data-ai-hint="background music player">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
