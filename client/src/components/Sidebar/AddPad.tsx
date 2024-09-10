import React, { useState } from "react";
import useBoardStore from "../../store/index";
import { SquarePlus } from "lucide-react";

export const AddPad = () => {
  const [loops, setLoops] = useBoardStore((store) => [
    store.loops,
    store.setLoops,
  ]);

  const [buttons, setButtons] = useBoardStore((store) => [
    store.buttons,
    store.setButtons,
  ]);

  const setHasUnsavedChanges = useBoardStore(
    (store) => store.setHasUnsavedChanges
  );

  const setIsInputActive = useBoardStore((store) => store.setIsInputActive);
  const inProgress = useBoardStore((store) => store.inProgress);

  const [newNote, setNewNote] = useState("");
  const [newKeyBinding, setNewKeyBinding] = useState("");
  const [newInterval, setNewInterval] = useState<number | undefined>(undefined);

  return (
    <form className="flex flex-col gap-3">
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
        placeholder="Interval in seconds (optional)"
        value={newInterval}
        onChange={(e) => setNewInterval(parseInt(e.target.value))}
        required
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
      />
      <button
      title="Add note"
        disabled={inProgress}
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
          setHasUnsavedChanges(true);
        }}
        className={`flex justify-center bg-red-200 w-full p-4 font-mono text-lg ${
          inProgress ? "cursor-not-allowed" : "cursor-pointer hover:bg-red-300 "
        } rounded`}
      >
        <SquarePlus />
      </button>
    </form>
  );
};
