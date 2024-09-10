import React from "react";
import useBoardStore from "../../store";
import { FolderPlus } from "lucide-react";

export const AddBoard = () => {
  const setBoardName = useBoardStore((store) => store.setBoardName);
  const setHasUnsavedChanges = useBoardStore(
    (store) => store.setHasUnsavedChanges
  );
  return (
    <button
      title="Create a new board"
      className="bg-red-200 p-4 my-3 w-full cursor-pointer hover:bg-red-300 rounded border-t border-pink-300 flex justify-center"
      onClick={() => {
        setBoardName(`New Board ${Date.now()}`);
        setHasUnsavedChanges(true);
      }}
    >
      <FolderPlus />
    </button>
  );
};
