import React, { useEffect } from "react";
import { useFetchBoardList } from "../../hooks/useFetchBoardList";
import { useFetchBoard } from "../../hooks/useFetchBoard";
import useBoardStore from "../../store";

export const BoardList = () => {
  const boardName = useBoardStore((store) => store.boardName);
  const inProgress = useBoardStore((store) => store.inProgress);
  const { boardList, updateBoardList } = useFetchBoardList();
  const { fetchBoard } = useFetchBoard();

  useEffect(() => {
    updateBoardList();
  }, []);

  return (
    <div className="border-b border-pink-300 border-dashed flex flex-col gap-2 pb-3">
      <label htmlFor="board-select" className="text-lg font-mono">
        Board List
      </label>
      <select
        disabled={inProgress}
        value={boardName}
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
