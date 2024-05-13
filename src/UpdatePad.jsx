import { useEffect, useState } from "react";

export const UpdatePad = ({
  selectedPad,
  setIsInputActive,
  setSelectedPad,
  setBoardConfig,
}) => {
  const [updatedNote, setUpdatedNote] = useState("");
  const [updatedKeyBinding, setUpdatedKeyBinding] = useState("");
  const [updatedInterval, setUpdatedInterval] = useState("");

  useEffect(() => {
    if (selectedPad) {
      setUpdatedNote(selectedPad.note);
      setUpdatedKeyBinding(selectedPad.keyBinding);
      setUpdatedInterval(selectedPad.interval || "");
    }
  }, [selectedPad]);

  return (
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
            ].findIndex((button) => button.id === selectedPad.id);
            if (updateIndex > -1) {
              if (updatedInterval) {
                currentConfigCopy.loops[updateIndex].note = updatedNote;
                currentConfigCopy.loops[updateIndex].keyBinding =
                  updatedKeyBinding;
                currentConfigCopy.loops[updateIndex].interval = updatedInterval;
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
  );
};
