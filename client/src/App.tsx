import React from "react";
import useAppStore from "./store/app";
import useBoardStore from "./store/board";
import { Config } from "./components/Sidebar/Config";
import { Section } from "./components/Board/Section";
import "./styles/index.css";
import { ANIMATION, MODE, STANDARD_LENGTH } from "./constants";
import { Recorder } from "./components/Recording/Recorder";

function App() {
  const currentMode = useAppStore((store) => store.currentMode);
  const buttons = useBoardStore((store) => store.buttons);
  const loops = useBoardStore((store) => store.loops);

  return (
    <main
      className="relative h-screen bg-blue-50 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0,10px 10px",
      }}
    >
      <section
        className="flex justify-center items-center gap-4"
        style={{
          width:
            currentMode === MODE.BOARD
              ? `calc(100vw - ${STANDARD_LENGTH}px)`
              : "100vw",
          height:
            currentMode === MODE.BOARD
              ? "100vh"
              : `calc(100vh - ${STANDARD_LENGTH}px)`,
          transition: ANIMATION,
        }}
      >
        <Section pads={buttons} />
        <Section pads={loops} />
      </section>
      <Config />
      <Recorder />
    </main>
  );
}

export default App;
