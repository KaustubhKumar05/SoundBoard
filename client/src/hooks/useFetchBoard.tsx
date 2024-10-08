import useAppStore from "../store/app";
import useBoardStore from "../store/board";

export const useFetchBoard = () => {
  const setInProgress = useAppStore((store) => store.setInProgress);

  const setBoardName = useBoardStore((store) => store.setBoardName);
  const [setButtons, setLoops] = useBoardStore((store) => [
    store.setButtons,
    store.setLoops,
  ]);

  const fetchBoard = async (boardName: string) => {
    setInProgress(true);
    const resp = await fetch(
      `${import.meta.env.VITE_SERVER_ENDPOINT}/api/boards/${encodeURI(
        boardName
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const jsonResp = await resp.json();
    if (jsonResp.buttons && jsonResp.loops) {
      setBoardName(decodeURI(boardName));
      setButtons(jsonResp.buttons);
      setLoops(jsonResp.loops);
    }
    setInProgress(false);
  };
  return { fetchBoard };
};
