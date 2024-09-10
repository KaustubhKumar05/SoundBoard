import React from "react";
import useAppStore from "../../store/app";
import { STANDARD_LENGTH } from "../../constants";
import { ToggleMode } from "../Sidebar/ToggleMode";

export const Recorder = () => {
  const [currentMode, setCurrentMode] = useAppStore((store) => [
    store.currentMode,
    store.setCurrentMode,
  ]);

  return (
    <section
      className="w-full bg-red-50 flex justify-center"
      style={{
        height: STANDARD_LENGTH + "px",
        // backgroundColor: "#e5e5f7",
        // opacity: 0.8,
        // backgroundSize: "20px 20px",
        // backgroundImage:
        //   "repeating-linear-gradient(0deg, #444cf7, #444cf7 1px, #e5e5f7 1px, #e5e5f7)",
      }}
    >
      <ToggleMode />
    </section>
  );
};
