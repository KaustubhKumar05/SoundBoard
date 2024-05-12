import { useEffect, useState } from "react";

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
  const [updatedNote, setUpdatedNote] = useState();
  const [updatedKeyBinding, setUpdatedKeyBinding] = useState();
  const [updatedInterval, setUpdatedInterval] = useState();
  const [newNote, setNewNote] = useState();
  const [newKeyBinding, setNewKeyBinding] = useState();
  const [newInterval, setNewInterval] = useState();

  useEffect(() => {
    if (selectedPad) {
      setUpdatedNote(selectedPad.note);
      setUpdatedKeyBinding(selectedPad.keyBinding);
      setUpdatedInterval(selectedPad.interval || null);
    }
  }, [selectedPad]);

  return (
    <section className="config h-screen w-96 bg-white fixed right-0 p-4">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={showNotes}
          onChange={() => setShowNotes((prev) => !prev)}
          className="h-4 w-4"
        />
        <p className="font-mono">Show notes</p>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={showKeyBindings}
          onChange={() => setShowKeyBindings((prev) => !prev)}
          className="h-4 w-4"
        />
        <p className="font-mono">Show key bindings</p>
      </div>
      {selectedPad ? (
        <form className="flex flex-col gap-3 border-t border-pink-200 my-3 py-3 border-dashed">
          <h2 className="font-mono text-lg">
            Update {selectedPad.interval ? "loop" : "button"}
          </h2>
          <input
            type="text"
            className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500 uppercase"
            placeholder="Note"
            value={updatedNote}
            onChange={(e) => setUpdatedNote(e.target.value)}
            required
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
          />
          <input
            type="text"
            className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500 uppercase"
            placeholder="Key"
            required
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
            value={updatedKeyBinding}
            onChange={(e) => setUpdatedKeyBinding(e.target.value)}
          />
          <input
            type="text"
            className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500 uppercase"
            placeholder="Interval (skip to create button)"
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
            value={updatedInterval}
            onChange={(e) => setUpdatedInterval(e.target.value)}
          />
          <input
            type="submit"
            value="Update"
            onClick={(e) => {
              e.preventDefault();
              setSelectedPad(null);
              setBoardConfig((currentConfig) => {
                const currentConfigCopy = { ...currentConfig };
                const updateIndex = currentConfigCopy[
                  updatedInterval ? "loops" : "buttons"
                ].findIndex((button) => button.note === selectedPad.note);
                if (updateIndex > -1) {
                  if (updatedInterval) {
                    currentConfigCopy.loops[updateIndex].note = updatedNote;
                    currentConfigCopy.loops[updateIndex].keyBinding =
                      updatedKeyBinding;
                    currentConfigCopy.loops[updateIndex].interval =
                      updatedInterval;
                  } else {
                    currentConfigCopy.buttons[updateIndex].note = updatedNote;
                    currentConfigCopy.buttons[updateIndex].keyBinding =
                      updatedKeyBinding;
                  }
                }
                return currentConfigCopy;
              });
            }}
            className="block bg-red-200 w-full p-4 font-mono text-lg cursor-pointer hover:bg-red-300 rounded"
          />
        </form>
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
                });
                return currentConfigCopy;
              });
            }
          }}
          className="block bg-red-200 w-full p-4 font-mono text-lg cursor-pointer hover:bg-red-300 rounded"
        />
      </form>
      <div className="border-t border-dashed border-pink-200 my-3 py-3">
        <h2 className="font-mono text-lg">Todos</h2>
        <ul className="px-4">
          <li className=" list-disc">Loops ⚙️ - specify note and interval</li>
          <li className=" list-disc">Customisable button UI</li>
          <li className=" list-disc">
            Validation to prevent duplicate bindings
          </li>
          <li className=" list-disc">Create and save multiple boards</li>
          <li className=" list-disc">Script and publish tracks</li>
          <li className=" list-disc">Fork tracks and boards</li>
          <li className=" list-disc">Refactor 🤞</li>
          <li className=" list-disc">
            Leaderboard for tracks and boards - views and forks
          </li>
        </ul>
      </div>
    </section>
  );
};
