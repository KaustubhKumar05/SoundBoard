import React, { useEffect } from "react";
import * as Tone from "tone";
import { Button } from "./Button";
import { Config } from "./Config";
import "./App.css";
import useBoardStore from "./store";

const synth = new Tone.Synth().toDestination();

function App() {
  const buttons = useBoardStore((store) => store.buttons);
  const loops = useBoardStore((store) => store.loops);
  const isInputActive = useBoardStore((store) => store.isInputActive);

  useEffect(() => {
    const playNote = (elem) => {
      const classesToToggle = ["bg-red-200", "bg-red-100", "scale-105"];
      classesToToggle.forEach((className) => elem.classList.toggle(className));
      elem.click();

      setTimeout(() => {
        classesToToggle.forEach((className) =>
          elem.classList.toggle(className)
        );
        elem.blur();
      }, 200);
    };
    const keyBindingHandler = (e) => {
      const correspondingButton = buttons?.find(
        (button) => button.keyBinding === e.key
      );
      if (correspondingButton && !isInputActive) {
        const elem = document.getElementById(correspondingButton.id);
        playNote(elem);
      }
    };

    window.addEventListener("keypress", keyBindingHandler);
    return () => window.removeEventListener("keypress", keyBindingHandler);
  }, [buttons, isInputActive]);

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
          <Button
            {...button}
            key={button.id}
            id={button.id}
            playNote={() => {
              synth.triggerAttackRelease(button.note, button.duration);
            }}
          />
        ))}
      </section>
      <section
        className={`board gap-2 grid grid-rows-3 bg-white p-2 rounded-lg border border-pink-100`}
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(loops.length / 3)}, 1fr`,
        }}
      >
        {loops.map((button) => (
          <Button
            {...button}
            key={button.id}
            id={button.id}
            playNote={() => {
              synth.triggerAttackRelease(button.note, button.duration);
            }}
            interval={button.interval}
          />
        ))}
      </section>
      <Config />
    </main>
  );
}

export default App;
