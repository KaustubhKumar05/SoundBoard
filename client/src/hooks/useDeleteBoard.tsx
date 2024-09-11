import useAppStore from "../store/app";
import useBoardStore from "../store/board";

export const useDeleteBoard = () => {
  const setInProgress = useAppStore((store) => store.setInProgress);
  
  const boardName = useBoardStore((store) => store.boardName);

  const deleteBoard = async () => {
    setInProgress(true);
    const resp = await fetch(
      `${import.meta.env.VITE_SERVER_ENDPOINT}/api/boards/${encodeURI(
        boardName
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const jsonResp = await resp.json();
    if (jsonResp.message === "Board deleted successfully") {
      alert("Board deleted successfully");
    } else {
      alert(jsonResp.error);
    }
    setInProgress(false);
  };

  return { deleteBoard };
};
