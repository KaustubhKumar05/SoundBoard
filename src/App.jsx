import { useEffect, useState } from "react";
import * as Tone from "tone";
import { Button } from "./Button";
import { Config } from "./Config";
import { classnames } from "classnames";
import "./App.css";

const synth = new Tone.Synth().toDestination();

function App() {
  const [showNotes, setShowNotes] = useState(true);
  const [showKeyBindings, setShowKeyBindings] = useState(true);
  const [selectedPad, setSelectedPad] = useState(null);
  const [isInputActive, setIsInputActive] = useState(false);

  const [boardConfig, setBoardConfig] = useState({
    buttons: [
      { keyBinding: "q", note: "C4", duration: "8n" },
      { keyBinding: "w", note: "E4", duration: "8n" },
      { keyBinding: "e", note: "G4", duration: "8n" },
      { keyBinding: "a", note: "C5", duration: "8n" },
      { keyBinding: "s", note: "E5", duration: "8n" },
      { keyBinding: "d", note: "G5", duration: "8n" },
    ],
    loops: [
      { keyBinding: "o", note: "C4", duration: "8n", interval: 1 },
      { keyBinding: "p", note: "E4", duration: "8n", interval: 1 },
    ],
  });

  const [columns, setColumns] = useState(
    Math.ceil(boardConfig.buttons.length / 2)
  );

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
      const correspondingButton = boardConfig?.buttons?.find(
        (button) => button.keyBinding === e.key
      );
      if (correspondingButton && !isInputActive) {
        const elem = document.getElementById(correspondingButton.note);
        playNote(elem);
      }
    };
    setColumns(Math.ceil(boardConfig.buttons.length / 2));
    window.addEventListener("keypress", keyBindingHandler);
    return () => window.removeEventListener("keypress", keyBindingHandler);
  }, [boardConfig, isInputActive]);

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
        className={classnames(
          "board gap-2 grid grid-rows-2 bg-white p-2 rounded-lg border border-pink-100",
          `grid-cols-${columns}`
        )}
      >
        {boardConfig.buttons.map((button) => (
          <Button
            {...button}
            key={button.note}
            id={button.note}
            playNote={() => {
              synth.triggerAttackRelease(button.note, button.duration);
            }}
            showKeyBindings={showKeyBindings}
            showNotes={showNotes}
            setSelectedPad={setSelectedPad}
          />
        ))}
      </section>
      <section
        className={`board gap-2 grid grid-rows-2 grid-cols-${Math.ceil(
          boardConfig.loops.length / 2
        )} bg-white p-2 rounded-lg border border-pink-100`}
      >
        {boardConfig.loops.map((button) => (
          <Button
            {...button}
            key={button.note}
            id={button.note}
            playNote={() => {
              synth.triggerAttackRelease(button.note, button.duration);
            }}
            interval={button.interval}
            showKeyBindings={showKeyBindings}
            showNotes={showNotes}
            setSelectedPad={setSelectedPad}
          />
        ))}
      </section>
      <Config
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        setShowKeyBindings={setShowKeyBindings}
        showKeyBindings={showKeyBindings}
        boardConfig={boardConfig}
        setBoardConfig={setBoardConfig}
        selectedPad={selectedPad}
        setSelectedPad={setSelectedPad}
        setIsInputActive={setIsInputActive}
      />
    </main>
  );
}

export default App;
