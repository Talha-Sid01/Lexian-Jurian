import { useCallback, useEffect, useRef } from 'react';

// Create a short, crisp click sound using Web Audio API
const createClickSound = (audioContext: AudioContext) => {
  const bufferSize = audioContext.sampleRate * 0.015; // 15ms duration
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate a sharp click with quick decay
  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    // Sharp attack, quick decay - sounds like a mechanical click
    data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 30) * 0.3;
  }
  
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  
  // Add a slight high-pass filter to make it crisper
  const filter = audioContext.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1000;
  
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.15; // Low volume
  
  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  source.start(audioContext.currentTime);
};

const ClickSparkWrapper = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playClickSound = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    createClickSound(audioContextRef.current);
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isButton = target.closest('button, a, [role="button"], .cursor-pointer');
    
    if (isButton) {
      playClickSound();
    }
  }, [playClickSound]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Spark effect commented out - only click sound active
  return null;
};

export default ClickSparkWrapper;
