import React from "react";
import useBoardStore from "../../store";
import { useDeleteBoard } from "../../hooks/useDeleteBoard";
import { useFetchBoard } from "../../hooks/useFetchBoard";
import { useFetchBoardList } from "../../hooks/useFetchBoardList";
import { Trash2 } from "lucide-react";

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

  const disabled = inProgress || boardList.length < 2;

  return (
    <button
      onClick={async () => {
        await deleteBoard();
        await fetchBoard(boardList[0] === boardName ? boardList[1] : boardList[0]);
        await updateBoardList();
        setSelectedPad(null);
        setHasUnsavedChanges(false);
      }}
      title={boardList.length < 2 ? "At least one board must be present" : "Delete this board"}
      disabled={disabled}
      className={`bg-red-500 p-4 my-3 w-full flex justify-center ${
        disabled ? "cursor-not-allowed bg-red-400" : "cursor-pointer"
      } hover:bg-red-400 rounded`}
    >
      <Trash2 />
    </button>
  );
};
