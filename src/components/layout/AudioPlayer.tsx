
'use client';

import { useEffect, useRef } from 'react';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Browsers often block autoplay with sound until user interaction.
  // This attempts to play, but might be silenced by the browser or require user interaction.
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          // Attempt to play. Some browsers require user interaction for unmuted autoplay.
          // If it fails, it might be because the browser blocked it.
          await audioRef.current.play();
        } catch (error) {
          console.warn("Audio autoplay was prevented. User interaction might be required to start music.", error);
          // You could implement a UI element here to allow the user to start the music manually.
        }
      }
    };
    playAudio();
  }, []);

  return (
    <audio ref={audioRef} loop autoPlay data-ai-hint="romantic instrumental music">
      {/*
        Replace this with an actual URL to your music file.
        For example: /music/wedding-theme.mp3
        Using a placeholder URL.
      */}
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
