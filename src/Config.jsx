import { useState } from "react";
import { UpdatePad } from "./UpdatePad";
import { Settings } from "./Settings";
import { Todos } from "./Todos";

export const Config = ({
  showNotes,
  setShowNotes,
  setShowKeyBindings,
  showKeyBindings,
  // To use this for validation later
  boardConfig,
  setBoardConfig,
  selectedPad,
  setSelectedPad,
  setIsInputActive,
}) => {
  const [newNote, setNewNote] = useState("");
  const [newKeyBinding, setNewKeyBinding] = useState("");
  const [newInterval, setNewInterval] = useState("");

  return (
    <section className="config h-screen w-96 bg-white fixed right-0 p-4">
      <Settings
        showKeyBindings={showKeyBindings}
        showNotes={showNotes}
        setShowKeyBindings={setShowKeyBindings}
        setShowNotes={setShowNotes}
      />
      {selectedPad ? (
        <UpdatePad
          selectedPad={selectedPad}
          setIsInputActive={setIsInputActive}
          setSelectedPad={setSelectedPad}
          setBoardConfig={setBoardConfig}
        />
      ) : (
        <h2 className="font-mono text-lg border-t border-pink-200 my-3 py-3 border-dashed">
          Right click on a button to update
        </h2>
      )}
      <form className="flex flex-col gap-3 border-t border-pink-200 my-3 py-3 border-dashed">
        <h2 className="font-mono text-lg">Add a button/loop</h2>
        <input
          type="text"
          className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500 uppercase"
          placeholder="Note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          required
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
        />
        <input
          type="text"
          className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500 uppercase"
          placeholder="Key binding"
          value={newKeyBinding}
          onChange={(e) => setNewKeyBinding(e.target.value)}
          required
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
        />
        <input
          type="number"
          className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500 uppercase"
          placeholder="Interval in seconds"
          value={newInterval}
          onChange={(e) => setNewInterval(e.target.value)}
          required
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
        />
        <input
          type="submit"
          value="Add"
          onClick={(e) => {
            e.preventDefault();
            setNewKeyBinding("");
            setNewNote("");
            setNewInterval("");
            if (newKeyBinding && newNote) {
              setBoardConfig((currentConfig) => {
                const currentConfigCopy = { ...currentConfig };
                currentConfigCopy[newInterval ? "loops" : "buttons"].push({
                  keyBinding: newKeyBinding.toLowerCase(),
                  note: newNote.toUpperCase(),
                  duration: "8n",
                  interval: newInterval,
                  id: crypto.randomUUID(),
                });
                return { ...currentConfigCopy };
              });
            }
          }}
          className="block bg-red-200 w-full p-4 font-mono text-lg cursor-pointer hover:bg-red-300 rounded"
        />
      </form>
      <div className="border-t border-dashed border-pink-200 my-3 py-3">
        <Todos />
      </div>
    </section>
  );
};
