import React, { useState } from "react";
import useBoardStore from "./store";

export const AddPad = () => {
  const loops = useBoardStore((state) => state.loops);
  const setLoops = useBoardStore((state) => state.setLoops);
  const buttons = useBoardStore((state) => state.buttons);
  const setButtons = useBoardStore((state) => state.setButtons);
  const setIsInputActive = useBoardStore((state) => state.setIsInputActive);

  const [newNote, setNewNote] = useState("");
  const [newKeyBinding, setNewKeyBinding] = useState("");
  const [newInterval, setNewInterval] = useState<number | undefined>(undefined);

  return (
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
        onChange={(e) => setNewInterval(parseInt(e.target.value))}
        required
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
      />
      <input
        type="submit"
        value="Add"
        onClick={(e) => {
          e.preventDefault();
          if (newKeyBinding && newNote) {
            const newPad = {
              keyBinding: newKeyBinding.toLowerCase(),
              note: newNote.toUpperCase(),
              duration: "8n",
              interval: newInterval || undefined,
              id: crypto.randomUUID(),
            };
            if (newInterval) {
              setLoops([...loops, newPad]);
            } else {
              setButtons([...buttons, newPad]);
            }
          }
          setNewKeyBinding("");
          setNewNote("");
          setNewInterval(undefined);
        }}
        className="block bg-red-200 w-full p-4 font-mono text-lg cursor-pointer hover:bg-red-300 rounded"
      />
    </form>
  );
};