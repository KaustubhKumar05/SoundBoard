import useBoardStore from "./store";

export const Settings = () => {
  const showKeyBindings = useBoardStore((state) => state.showKeyBindings);
  const setShowKeyBindings = useBoardStore((state) => state.setShowKeyBindings);
  const showNotes = useBoardStore((state) => state.showNotes);
  const setShowNotes = useBoardStore((state) => state.setShowNotes);

  return (
    <div className="border-t border-pink-300 border-dashed my-3 py-3">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={showNotes}
          onChange={() => setShowNotes((prev) => !prev)}
          className="h-4 w-4"
        />
        <p className="font-mono">Show notes</p>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={showKeyBindings}
          onChange={() => setShowKeyBindings((prev) => !prev)}
          className="h-4 w-4"
        />
        <p className="font-mono">Show key bindings</p>
      </div>
    </div>
  );
};
