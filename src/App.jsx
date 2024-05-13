import { useEffect, useState } from "react";
import * as Tone from "tone";
import { Button } from "./Button";
import { Config } from "./Config";
import "./App.css";

const synth = new Tone.Synth().toDestination();

function App() {
  const [showNotes, setShowNotes] = useState(true);
  const [showKeyBindings, setShowKeyBindings] = useState(true);
  const [selectedPad, setSelectedPad] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);

  const [boardConfig, setBoardConfig] = useState({
    buttons: [
      { keyBinding: "q", note: "C4", duration: "8n", id: "asdf" },
      { keyBinding: "w", note: "E4", duration: "8n", id: "qwe" },
      { keyBinding: "e", note: "G4", duration: "8n", id: "rewrwes" },
      { keyBinding: "r", note: "C5", duration: "8n", id: "rewd" },
      { keyBinding: "a", note: "D4", duration: "8n", id: "refdw" },
      { keyBinding: "s", note: "A4", duration: "8n", id: "tgfv" },
      { keyBinding: "d", note: "E5", duration: "8n", id: "yi" },
      { keyBinding: "f", note: "G5", duration: "8n", id: "iuo" },
      { keyBinding: "z", note: "D5", duration: "8n", id: "fdsgz" },
      { keyBinding: "x", note: "A5", duration: "8n", id: "lk" },
      { keyBinding: "c", note: "E6", duration: "8n", id: "ryt" },
      { keyBinding: "v", note: "C6", duration: "8n", id: "cvxb" },
    ],
    loops: [
      { keyBinding: "p", note: "C1", duration: "8n", interval: 1, id: "ihj" },
      { keyBinding: "l", note: "E2", duration: "8n", interval: 1, id: "jbhkn" },
      { keyBinding: "m", note: "C3", duration: "8n", interval: 1, id: "dsf" },
    ],
  });

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
        const elem = document.getElementById(correspondingButton.id);
        playNote(elem);
      }
    };

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
        className={
          "board gap-2 grid grid-rows-3 bg-white p-2 rounded-lg border border-pink-100"
        }
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(
            boardConfig.buttons.length / 3
          )}, 1fr)`,
        }}
      >
        {boardConfig.buttons.map((button) => (
          <Button
            {...button}
            key={button.id}
            id={button.id}
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
        className={`board gap-2 grid grid-rows-3 bg-white p-2 rounded-lg border border-pink-100`}
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(
            boardConfig.loops.length / 3
          )}, 1fr`,
        }}
      >
        {boardConfig.loops.map((button) => (
          <Button
            {...button}
            key={button.id}
            id={button.id}
            playNote={() => {
              synth.triggerAttackRelease(button.note, button.duration);
            }}
            interval={button.interval}
            showKeyBindings={showKeyBindings}
            showNotes={showNotes}
            setSelectedPad={setSelectedPad}
            isInputActive={isInputActive}
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
