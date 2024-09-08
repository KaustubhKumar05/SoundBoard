import React from "react";
import { Button } from "./components/Board/Button";
import { Config } from "./components/Sidebar/Config";
import useBoardStore from "./store";
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
      <section
        className={
          "board gap-2 grid grid-rows-3 bg-white p-2 rounded-lg border border-pink-100"
        }
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(buttons.length / 3)}, 1fr)`,
        }}
      >
        {buttons.map((button) => (
          <Button config={button} key={button.id} id={button.id} />
        ))}
      </section>
      <section
        className={`board gap-2 grid grid-rows-3 bg-white p-2 rounded-lg border border-pink-100`}
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(loops.length / 3)}, 1fr`,
        }}
      >
        {loops.map((button) => (
          <Button config={button} key={button.id} id={button.id} />
        ))}
      </section>
      <Config />
    </main>
  );
}

export default App;
