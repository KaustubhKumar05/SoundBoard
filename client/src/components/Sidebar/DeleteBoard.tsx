import React from "react";
import useBoardStore from "../../store";
import { useDeleteBoard } from "../../hooks/useDeleteBoard";
import { useFetchBoard } from "../../hooks/useFetchBoard";
import { useFetchBoardList } from "../../hooks/useFetchBoardList";

export const DeleteBoard = () => {
  const boardName = useBoardStore((store) => store.boardName);
  const boardList = useBoardStore((store) => store.boardList);

  const inProgress = useBoardStore((store) => store.inProgress);
  const setSelectedPad = useBoardStore((store) => store.setSelectedPad);
  const setHasUnsavedChanges = useBoardStore(
    (store) => store.setHasUnsavedChanges
  );

  const { updateBoardList } = useFetchBoardList();
  const { deleteBoard } = useDeleteBoard();
  const { fetchBoard } = useFetchBoard();

  return (
    <button
      onClick={async () => {
        await deleteBoard();
        fetchBoard(boardList[0] === boardName ? boardList[1] : boardList[0]);
        updateBoardList();
        setSelectedPad(null);
        setHasUnsavedChanges(false);
      }}
      title={boardList.length < 2 ? "At least one board must be present" : ""}
      disabled={inProgress || boardList.length < 2}
      className="block bg-red-500 w-full p-4 font-mono text-lg cursor-pointer hover:bg-red-400 rounded"
    >
      Delete Board
    </button>
  );
};
