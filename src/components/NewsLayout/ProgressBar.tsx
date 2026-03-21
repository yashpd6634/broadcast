"use client";

import { useState, useEffect, useRef } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const startRef = useRef(0);
  const pauseRef = useRef(0);
  const intervalRef = useRef<number | undefined>(undefined);
  const duration = 10000;

  const updateProgress = () => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        setIsRunning(false);
        clearInterval(intervalRef.current);
      }
    }, 10);
  };

  const start = () => {
    if (isRunning) return;

    setIsRunning(true);
    setIsPaused(false);
    startRef.current = Date.now();
    pauseRef.current = 0;
    updateProgress();
  };

  const pause = () => {
    if (!isRunning || isPaused) return;

    setIsPaused(true);
    pauseRef.current = Date.now();
    clearInterval(intervalRef.current);
  };

  const resume = () => {
    if (!isRunning || !isPaused) return;

    setIsPaused(false);
    startRef.current = Date.now() - (pauseRef.current - startRef.current);
    pauseRef.current = 0;
    updateProgress();
  };

  const reset = () => {
    pause();
    setIsRunning(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
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
          disabled={isRunning}
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
          disabled={!isRunning || !isPaused}
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
