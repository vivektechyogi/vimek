
'use client';

import { useEffect, useRef } from 'react';

export function AudioPlayer() {
  // The YouTube video ID from the provided link: https://www.youtube.com/watch?v=G0HxCWBAdFg
  const videoId = 'G0HxCWBAdFg';

  // Construct the YouTube embed URL with autoplay, loop, and controls hidden.
  // Mute is often required for autoplay to work in modern browsers.
  // `playlist` parameter is required for `loop` to work.
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&mute=0&enablejsapi=1`;
  // Note: mute=0 might be blocked by browser autoplay policies. If audio doesn't play, try mute=1.

  return (
    <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
      <iframe
        width="1" // Minimal size
        height="1" // Minimal size
        src={embedUrl}
        title="YouTube video player for background music"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        data-ai-hint="background music player"
      ></iframe>
    </div>
  );
}

