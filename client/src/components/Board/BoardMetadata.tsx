import React from "react";
import useBoardStore from "../../store/index";
import { useSaveBoard } from "../../hooks/useSaveBoard";
import { useFetchBoardList } from "../../hooks/useFetchBoardList";

export const BoardMetadata = () => {
  const setIsInputActive = useBoardStore((state) => state.setIsInputActive);
  const [boardName, setBoardName] = useBoardStore((state) => [
    state.boardName,
    state.setBoardName,
  ]);
  const inProgress = useBoardStore((state) => state.inProgress);
  const { saveBoard } = useSaveBoard();
  const { updateBoardList } = useFetchBoardList();

  return (
    <form className="flex flex-col gap-3 py-3 border-dashed">
      <input
        type="text"
        className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500"
        placeholder="Note"
        value={boardName}
        disabled={inProgress}
        onChange={(e) => setBoardName(e.target.value)}
        required
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
      />
      <input
        type="submit"
        disabled={inProgress}
        value="Save Board"
        onClick={(e) => {
          e.preventDefault();
          saveBoard();
          updateBoardList();
        }}
        className={`block bg-red-200 w-full p-4 font-mono text-lg ${
          inProgress ? "cursor-not-allowed" : "cursor-pointer hover:bg-red-300 "
        } rounded`}
      />
    </form>
  );
};
