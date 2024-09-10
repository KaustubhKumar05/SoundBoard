import React from "react";
import { FileMusic, KeyboardMusic } from "lucide-react";
import useAppStore from "../../store/app";
import { MODE } from "../../constants";

export const ToggleMode = ({ grow = false }) => {
  const [currentMode, setCurrentMode] = useAppStore((store) => [
    store.currentMode,
    store.setCurrentMode,
  ]);
  const recorderMode = currentMode === MODE.RECORDER;

  return (
    <button
      title={recorderMode ? "Configure board" : "Record tracks"}
      className={`bg-red-200 p-4 my-3 ${
        grow ? "w-full" : "w-max"
      } cursor-pointer hover:bg-red-300 rounded flex justify-center h-max`}
      onClick={() => setCurrentMode(recorderMode ? MODE.BOARD : MODE.RECORDER)}
    >
      {recorderMode ? <KeyboardMusic /> : <FileMusic />}
    </button>
  );
};
