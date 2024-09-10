import useAppStore from "../store/app";
import useBoardStore from "../store/board";

export const useSaveBoard = () => {
  const setInProgress = useAppStore((store) => store.setInProgress);
  const setHasUnsavedChanges = useAppStore(
    (store) => store.setHasUnsavedChanges
  );
  
  const boardName = useBoardStore((store) => store.boardName);
  const [loops, buttons] = useBoardStore((store) => [
    store.loops,
    store.buttons,
  ]);

  const saveBoard = async () => {
    setInProgress(true);

    const resp = await fetch(
      `${import.meta.env.VITE_SERVER_ENDPOINT}/api/boards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          key: boardName,
          config: { buttons, loops },
        }),
      }
    );

    const jsonResp = await resp.json();
    if (jsonResp.message === "Config saved successfully") {
      setHasUnsavedChanges(false);
      alert("Board saved successfully");
    } else {
      alert("Could not save the board");
    }

    setInProgress(false);
  };
  return { saveBoard };
};
