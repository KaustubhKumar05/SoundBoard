import React from "react";
import useBoardStore from "../../store";

export const AddBoard = () => {
  const setBoardName = useBoardStore((store) => store.setBoardName);
  const setHasUnsavedChanges = useBoardStore(
    (store) => store.setHasUnsavedChanges
  );
  return (
    <button
      className="block bg-red-200 w-full p-4 my-3 font-mono text-lg cursor-pointer hover:bg-red-300 rounded border-t border-pink-300"
      onClick={() => {
        setBoardName(`New Board ${Date.now()}`);
        setHasUnsavedChanges(true);
      }}
    >
      New Board
    </button>
  );
};
