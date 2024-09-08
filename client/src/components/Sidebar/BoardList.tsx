import React, { useEffect } from "react";
import useBoardStore from "../../store";

export const BoardList = () => {
  const [boardList, setBoardList] = useBoardStore((store) => [
    store.boardList,
    store.setBoardList,
  ]);
  useEffect(() => {
    const updateBoardList = async () => {
      const resp = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/boards`);
      const newBoardList = await resp.json();
      if (newBoardList.length > 0) {
        setBoardList(newBoardList);
      }
    };

    updateBoardList();
  }, []);
  return (
    <div className="border-t border-pink-300 border-dashed py-3">
      {boardList.map((boardName) => (
        <p key={boardName} id={boardName}>
          {boardName}
        </p>
      ))}
    </div>
  );
};
