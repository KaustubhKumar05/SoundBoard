import React, { useEffect, useState } from "react";
import useAppStore from "../../store/app";
import useBoardStore from "../../store/board";
import { Delete, Save, SaveOff } from "lucide-react";

export const UpdatePad = () => {
  const setIsInputActive = useAppStore((store) => store.setIsInputActive);
  const setHasUnsavedChanges = useAppStore(
    (store) => store.setHasUnsavedChanges
  );

  const [selectedPad, setSelectedPad] = useBoardStore((store) => [
    store.selectedPad,
    store.setSelectedPad,
  ]);
  const [buttons, setButtons] = useBoardStore((store) => [
    store.buttons,
    store.setButtons,
  ]);
  const [loops, setLoops] = useBoardStore((store) => [
    store.loops,
    store.setLoops,
  ]);

  const [updatedNote, setUpdatedNote] = useState("");
  const [updatedKeyBinding, setUpdatedKeyBinding] = useState("");
  const [updatedInterval, setUpdatedInterval] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (selectedPad) {
      setUpdatedNote(selectedPad.note);
      setUpdatedKeyBinding(selectedPad.keyBinding);
      setUpdatedInterval(selectedPad.interval || undefined);
    }
  }, [selectedPad]);

  if (!selectedPad) {
    return <h2 className="font-mono text-lg">Click on a button to update</h2>;
  }

  return (
    <form className="flex flex-col gap-3">
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
        onChange={(e) => setUpdatedInterval(parseInt(e.target.value))}
      />
      <div className="flex gap-3">
        <button
          title="Update"
          onClick={(e) => {
            e.preventDefault();
            setSelectedPad(null);
            const updatedPad = {
              note: updatedNote,
              keyBinding: updatedKeyBinding,
              interval: updatedInterval,
            };
            if (updatedInterval) {
              const updateIndex = loops.findIndex(
                (loop) => loop.id === selectedPad.id
              );
              const updatedLoops = [...loops];
              updatedLoops[updateIndex] = {
                ...updatedLoops[updateIndex],
                ...updatedPad,
              };
              setLoops(updatedLoops);
            } else {
              const updateIndex = buttons.findIndex(
                (button) => button.id === selectedPad.id
              );
              const updatedButtons = [...buttons];
              updatedButtons[updateIndex] = {
                ...updatedButtons[updateIndex],
                ...updatedPad,
              };
              setButtons(updatedButtons);
            }
            setHasUnsavedChanges(true);
          }}
          className="flex bg-red-200 w-full p-4 cursor-pointer hover:bg-red-300 rounded justify-center"
        >
          <Save />
        </button>

        <button
          title="Cancel"
          onClick={() => {
            setHasUnsavedChanges(false);
            setSelectedPad(null);
          }}
          className="flex bg-red-200 w-full p-4 cursor-pointer hover:bg-red-300 rounded justify-center"
        >
          <SaveOff />
        </button>

        <button
          title="Delete"
          onClick={(e) => {
            e.preventDefault();
            if (selectedPad.interval) {
              const updateIndex = loops.findIndex(
                (loop) => loop.id === selectedPad.id
              );
              const updatedLoops = [...loops];
              updatedLoops.splice(updateIndex, 1);
              setLoops(updatedLoops);
            } else {
              const updateIndex = buttons.findIndex(
                (button) => button.id === selectedPad.id
              );
              const updatedButtons = [...buttons];
              updatedButtons.splice(updateIndex, 1);
              setButtons(updatedButtons);
            }
            setSelectedPad(null);
            setHasUnsavedChanges(true);
          }}
          className="flex bg-red-200 w-full p-4 cursor-pointer hover:bg-red-300 rounded justify-center"
        >
          <Delete />
        </button>
      </div>
    </form>
  );
};
