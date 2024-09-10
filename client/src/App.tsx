import React from "react";
import useBoardStore from "./store";
import { Config } from "./components/Sidebar/Config";
import { Section } from "./components/Board/Section";
import "./styles/index.css";

function App() {
  const buttons = useBoardStore((store) => store.buttons);
  const loops = useBoardStore((store) => store.loops);

  return (
    <main
      className=" bg-blue-50 h-screen flex justify-center items-center gap-4"
      style={{
        backgroundImage:
          "radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0,10px 10px",
        width: "calc(100vw - 384px)",
      }}
    >
      <Section pads={buttons} />
      <Section pads={loops} />
      <Config />
    </main>
  );
}

export default App;
