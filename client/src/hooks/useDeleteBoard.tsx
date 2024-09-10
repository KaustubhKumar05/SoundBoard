import useBoardStore from "../store";

export const useDeleteBoard = () => {
  const setInProgress = useBoardStore((store) => store.setInProgress);
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
    if (jsonResp.message === "Config deleted successfully") {
      alert("Board deleted successfully");
    } else {
      alert(jsonResp.error);
    }
    setInProgress(false);
  };

  return { deleteBoard };
};
