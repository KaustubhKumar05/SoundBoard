import React, { useEffect, useState } from "react";
import useBoardStore from "../store";

export const UpdatePad = () => {
  const selectedPad = useBoardStore((state) => state.selectedPad);
  const setSelectedPad = useBoardStore((state) => state.setSelectedPad);
  const setIsInputActive = useBoardStore((state) => state.setIsInputActive);
  const buttons = useBoardStore((state) => state.buttons);
  const setButtons = useBoardStore((state) => state.setButtons);
  const loops = useBoardStore((state) => state.loops);
  const setLoops = useBoardStore((state) => state.setLoops);

  const [updatedNote, setUpdatedNote] = useState("");
  const [updatedKeyBinding, setUpdatedKeyBinding] = useState("");
  const [updatedInterval, setUpdatedInterval] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (selectedPad) {
      setUpdatedNote(selectedPad.note);
      setUpdatedKeyBinding(selectedPad.keyBinding);
      setUpdatedInterval(selectedPad.interval || 0);
    }
  }, [selectedPad]);

  if (!selectedPad) {
    return (
      <h2 className="font-mono text-lg border-t border-pink-200 my-3 py-3 border-dashed">
        Right click on a button to update
      </h2>
    );
  }

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
        onChange={(e) => setUpdatedInterval(parseInt(e.target.value))}
      />
      <div className="flex gap-3">
        <input
          type="submit"
          value="Update"
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
          }}
          className="block bg-red-200 w-full p-4 font-mono text-lg cursor-pointer hover:bg-red-300 rounded"
        />
        <input
          type="submit"
          value="Delete"
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
          }}
          className="block bg-red-200 w-full p-4 font-mono text-lg cursor-pointer hover:bg-red-300 rounded"
        />
      </div>
    </form>
  );
};
