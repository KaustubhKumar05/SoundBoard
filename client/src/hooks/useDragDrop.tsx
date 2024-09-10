import useBoardStore from "../store";

export const useDragDrop = () => {
  const [buttons, setButtons] = useBoardStore((store) => [
    store.buttons,
    store.setButtons,
  ]);

  const [loops, setLoops] = useBoardStore((store) => [
    store.loops,
    store.setLoops,
  ]);

  const setHasUnsavedChanges = useBoardStore(
    (store) => store.setHasUnsavedChanges
  );

  const handleDrop = (
    e: React.DragEvent<HTMLButtonElement>,
    id: string,
    isButton: boolean
  ) => {
    e.preventDefault();
    const { id: draggedId, isButton: isDraggingButton } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (draggedId !== id && isButton === isDraggingButton) {
      // Spread to create a new reference
      const newPads = [...(isButton ? buttons : loops)];
      const draggedIndex = newPads.findIndex((pad) => pad.id === draggedId);
      const targetIndex = newPads.findIndex((pad) => pad.id === id);

      [newPads[draggedIndex], newPads[targetIndex]] = [
        newPads[targetIndex],
        newPads[draggedIndex],
      ];

      isButton ? setButtons(newPads) : setLoops(newPads);
      setHasUnsavedChanges(true);
    }
  };

  return { handleDrop };
};
