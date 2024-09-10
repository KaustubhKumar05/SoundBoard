import React from "react";
import useAppStore from "../../store/app";
import useBoardStore from "../../store/board";
import { FolderPlus } from "lucide-react";

export const AddBoard = () => {
  const setBoardName = useBoardStore((store) => store.setBoardName);
  const setHasUnsavedChanges = useAppStore(
    (store) => store.setHasUnsavedChanges
  );
  return (
    <button
      title="Create a new board"
      className="bg-red-200 p-4 my-3 w-full cursor-pointer hover:bg-red-300 rounded flex justify-center"
      onClick={() => {
        setBoardName(`New Board ${Date.now()}`);
        setHasUnsavedChanges(true);
      }}
    >
      <FolderPlus />
    </button>
  );
};
