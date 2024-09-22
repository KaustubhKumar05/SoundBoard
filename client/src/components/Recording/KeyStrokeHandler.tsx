import React, { useState, useEffect, useCallback, useRef } from "react";
import { PlayCircle, StopCircle, PauseCircle, Download } from "lucide-react";
import { ToggleMode } from "../Sidebar/ToggleMode";

interface KeyPress {
  id: string;
  key: string;
  startTime: number;
  endTime: number | null;
  lane: number;
}

const CANVAS_WIDTH = 6000;
const VISIBLE_WIDTH = 800;
const MS_PER_PIXEL = 10;
const LANE_HEIGHT = 40;
const MAX_LANES = 6;

const KEY_COLORS: { [key: string]: string } = {
  a: "#FF6B6B",
  b: "#4ECDC4",
  c: "#45B7D1",
  d: "#F7DC6F",
  e: "#E74C3C",
  f: "#3498DB",
  g: "#2ECC71",
  h: "#9B59B6",
  i: "#1ABC9C",
  j: "#F39C12",
  k: "#D35400",
  l: "#C0392B",
  m: "#8E44AD",
  n: "#16A085",
  o: "#27AE60",
  p: "#2980B9",
  q: "#E67E22",
  r: "#95A5A6",
  s: "#34495E",
  t: "#7F8C8D",
  u: "#BDC3C7",
  v: "#1F618D",
  w: "#4A235A",
  x: "#145A32",
  y: "#641E16",
  z: "#78281F",
  " ": "#5D6D7E",
  Enter: "#58D68D",
  Backspace: "#EC7063",
  Shift: "#5DADE2",
  Control: "#F5B041",
  Alt: "#45B39D",
};

export const KeyStrokeHandler = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [keyPresses, setKeyPresses] = useState<KeyPress[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [exportedData, setExportedData] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const activeKeysRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const findAvailableLane = useCallback(
    (startTime: number) => {
      const occupiedLanes = keyPresses
        .filter((kp) => kp.endTime === null || kp.endTime > startTime)
        .map((kp) => kp.lane);
      for (let i = 0; i < MAX_LANES; i++) {
        if (!occupiedLanes.includes(i)) return i;
      }
      return Math.floor(Math.random() * MAX_LANES);
    },
    [keyPresses]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isRecording && !isPaused && !activeKeysRef.current.has(event.key)) {
        activeKeysRef.current.add(event.key);
        setKeyPresses((prev) => [
          ...prev,
          {
            id: `${event.key}-${Date.now()}`,
            key: event.key,
            startTime: currentTime,
            endTime: null,
            lane: findAvailableLane(currentTime),
          },
        ]);
      }
    },
    [isRecording, isPaused, currentTime, findAvailableLane]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (isRecording && !isPaused) {
        activeKeysRef.current.delete(event.key);
        setKeyPresses((prev) =>
          prev.map((keyPress) =>
            keyPress.key === event.key && keyPress.endTime === null
              ? { ...keyPress, endTime: currentTime }
              : keyPress
          )
        );
      }
    },
    [isRecording, isPaused, currentTime]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (isRecording && !isPaused && currentTime < 60000) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => prev + 100);
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused, currentTime]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollLeft =
        currentTime / MS_PER_PIXEL - VISIBLE_WIDTH / 2;
    }
  }, [currentTime]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsPaused(false);
      activeKeysRef.current.clear();
    } else {
      setIsRecording(true);
      setIsPaused(false);
      setCurrentTime(0);
      setKeyPresses([]);
      setExportedData(null);
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const exportData = () => {
    const data = keyPresses.map(({ id, key, startTime, endTime }) => ({
      id,
      key,
      startTime,
      endTime: endTime || currentTime,
    }));
    setExportedData(JSON.stringify(data, null, 2));
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
      <div>
        <div className="flex gap-4 items-center mb-6 w-full">
          <button
            onClick={toggleRecording}
            className={`cursor-pointer hover:bg-red-300 rounded flex justify-center h-max bg-red-200 p-4 my-3 w-max`}
          >
            {isRecording ? <StopCircle /> : <PlayCircle />}
          </button>
          <button
            onClick={togglePause}
            disabled={!isRecording}
            className={`cursor-pointer hover:bg-red-300 rounded flex justify-center h-max bg-red-200 p-4 my-3 w-max ${
              !isRecording ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPaused ? <PlayCircle /> : <PauseCircle />}
          </button>
          <ToggleMode />
          <button
            onClick={exportData}
            disabled={isRecording || keyPresses.length === 0}
            className={`cursor-pointer hover:bg-red-300 rounded flex justify-center h-max bg-red-200 p-4 my-3 w-max ${
              isRecording || keyPresses.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <Download />
          </button>
          <div className="text-3xl font-mono font-bold bg-gray-100 px-4 py-2 rounded-md ml-auto">
            {(currentTime / 1000).toFixed(1)}s
          </div>
        </div>
        <div className="relative">
          <div
            ref={canvasRef}
            className="relative rounded-lg overflow-x-auto"
            style={{
              width: `${VISIBLE_WIDTH}px`,
              height: `${MAX_LANES * LANE_HEIGHT + 20}px`,
              backgroundColor: "#2C3E50",
              backgroundImage:
                "linear-gradient(rgba(52, 152, 219, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 152, 219, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <div
              className="absolute top-0 bottom-0"
              style={{ width: `${CANVAS_WIDTH}px` }}
            >
              {/* Time indicators */}
              {Array.from({ length: CANVAS_WIDTH / 100 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 flex flex-col items-center"
                >
                  <div
                    className="w-px bg-blue-300 opacity-50"
                    style={{
                      left: `${i * 100}px`,
                      height: `${MAX_LANES * LANE_HEIGHT}px`,
                    }}
                  />
                  <span
                    className="text-xs text-blue-300 mt-1"
                    style={{
                      left: `${i * 100}px`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {i}s
                  </span>
                </div>
              ))}
              {/* Key press visualizations */}
              {keyPresses.map((keyPress) => (
                <div
                  key={keyPress.id}
                  className="absolute rounded-md flex items-center justify-center shadow-lg"
                  style={{
                    left: `${keyPress.startTime / MS_PER_PIXEL}px`,
                    width: `${
                      ((keyPress.endTime || currentTime) - keyPress.startTime) /
                      MS_PER_PIXEL
                    }px`,
                    top: `${keyPress.lane * LANE_HEIGHT + 4}px`,
                    height: "32px",
                    backgroundColor:
                      KEY_COLORS[keyPress.key.toLowerCase()] || "#A9A9A9",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    transition: "width 0.1s ease-out",
                  }}
                >
                  <span className="text-white text-sm font-bold truncate px-2">
                    {keyPress.key}
                  </span>
                </div>
              ))}
              {/* Current time indicator */}
              <div
                className="absolute top-0 bottom-0 w-px bg-red-500 shadow-md z-10"
                style={{
                  left: `${currentTime / MS_PER_PIXEL}px`,
                  boxShadow: "0 0 8px rgba(255,0,0,0.5)",
                }}
              />
            </div>
          </div>
        </div>
        {exportedData && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Exported Data:</h3>
            <pre className="bg-white p-4 rounded-md overflow-auto max-h-60 text-sm">
              {exportedData}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
