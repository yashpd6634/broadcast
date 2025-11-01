"use client";

import { useState, useEffect, useRef } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const animationRef = useRef<number | undefined>(undefined);
  const duration = 10000;

  const update = () => {
    animationRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current + pausedTimeRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        setIsRunning(false);
      }
    }, 10);
  };

  const start = () => {
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
    update();
  };

  const pause = () => {
    setIsPaused(true);
    pausedTimeRef.current += Date.now() - startTimeRef.current;
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = undefined;
    }
  };

  const resume = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now();
    update();
  };

  const reset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = undefined;
    }
  };

  useEffect(() => {
    return () => clearInterval(animationRef.current);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Progress Bar</h2>

      <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={start}
          disabled={isRunning && !isPaused}
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={pause}
          disabled={!isRunning || isPaused}
          className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Pause
        </button>
        <button
          onClick={resume}
          disabled={!isPaused}
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Resume
        </button>
        <button
          onClick={reset}
          disabled={progress === 0}
          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
