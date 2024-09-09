import React, { useEffect } from "react";
import { useFetchBoardList } from "../../hooks/useFetchBoardList";
import { useFetchBoard } from "../../hooks/useFetchBoard";
import useBoardStore from "../../store";

export const BoardList = () => {
  const boardName = useBoardStore((store) => store.boardName);
  const { boardList, updateBoardList } = useFetchBoardList();
  const { fetchBoard } = useFetchBoard();

  useEffect(() => {
    updateBoardList();
  }, []);

  return (
    <>
      <h2 className="text-2xl border-t border-pink-300 border-dashed my-3 pt-3">
        Board List
      </h2>
      <div className="">
        {boardList.map((board) => (
          <p
            className={`font-mono my-1 cursor-pointer ${
              boardName === board ? "cursor-not-allowed italic" : ""
            } `}
            key={board}
            id={board}
            onClick={async () => {
              if (board !== boardName) {
                await fetchBoard(board);
              }
            }}
          >
            {board}
          </p>
        ))}
      </div>
    </>
  );
};
