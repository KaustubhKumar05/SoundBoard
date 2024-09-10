import React from "react";
import useAppStore from "../../store/app";
import useBoardStore from "../../store/board";
import { useSaveBoard } from "../../hooks/useSaveBoard";
import { useFetchBoardList } from "../../hooks/useFetchBoardList";
import { Save } from "lucide-react";

export const BoardMetadata = () => {
  const setIsInputActive = useAppStore((store) => store.setIsInputActive);
  const hasUnsavedChanges = useAppStore((store) => store.hasUnsavedChanges);
  const inProgress = useAppStore((store) => store.inProgress);

  const [boardName, setBoardName] = useBoardStore((store) => [
    store.boardName,
    store.setBoardName,
  ]);

  const { saveBoard } = useSaveBoard();
  const { updateBoardList } = useFetchBoardList();

  return (
    <form className="flex gap-3">
      <input
        type="text"
        className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500 w-full"
        placeholder="Board name"
        value={boardName}
        disabled={inProgress}
        onChange={(e) => setBoardName(e.target.value)}
        required
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
      />
      <button
        title="Save board"
        disabled={inProgress || !hasUnsavedChanges}
        onClick={async () => {
          await saveBoard();
          await updateBoardList();
        }}
        className={`bg-red-200 p-4 w-max ${
          inProgress || !hasUnsavedChanges
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-red-300 "
        } rounded`}
      >
        <Save />
      </button>
    </form>
  );
};
