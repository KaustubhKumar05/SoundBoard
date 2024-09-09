import useBoardStore from "../store";

export const useFetchBoardList = () => {
  const [boardList, setBoardList] = useBoardStore((store) => [
    store.boardList,
    store.setBoardList,
  ]);

  const updateBoardList = async () => {
    const resp = await fetch(
      `${import.meta.env.VITE_SERVER_ENDPOINT}/api/boards`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const newBoardList = await resp.json();
    if (newBoardList.length > 0) {
      setBoardList(newBoardList);
    }
  };

  return { boardList, updateBoardList };
};
