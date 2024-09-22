import React, { useEffect } from "react";
import useAppStore from "../../store/app";
import useBoardStore from "../../store/board";
import { useFetchBoard } from "../../hooks/useFetchBoard";
import { useFetchBoardList } from "../../hooks/useFetchBoardList";

export const BoardList = () => {
  const inProgress = useAppStore((store) => store.inProgress);

  const boardName = useBoardStore((store) => store.boardName);

  const { boardList, updateBoardList } = useFetchBoardList();
  const { fetchBoard } = useFetchBoard();

  useEffect(() => {
    updateBoardList();
  }, []);

  return (
    <div className="flex flex-col gap-2 pb-3">
      <label htmlFor="board-select" className="text-lg font-mono">
        Boards
      </label>
      <select
        disabled={inProgress}
        value={boardName || "Default"}
        id="board-select"
        className="border border-pink-300 p-3 pr-0"
        onChange={async (e) => await fetchBoard(e.target.value)}
      >
        {boardList.map((board) => (
          <option key={board} id={board}>
            <p
              className={`font-mono cursor-pointer ${
                boardName === board ? "cursor-not-allowed italic" : ""
              } `}
            >
              {board}
            </p>
          </option>
        ))}
      </select>
    </div>
  );
};
