import React from "react";
import useBoardStore from "../../store/index";

export const Settings = () => {
  const showKeyBindings = useBoardStore((state) => state.showKeyBindings);
  const setShowKeyBindings = useBoardStore((state) => state.setShowKeyBindings);
  const showNotes = useBoardStore((state) => state.showNotes);
  const setShowNotes = useBoardStore((state) => state.setShowNotes);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={showNotes}
          onChange={() => setShowNotes(!showNotes)}
          className="h-4 w-4"
        />
        <p className="font-mono">Show notes</p>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={showKeyBindings}
          onChange={() => setShowKeyBindings(!showKeyBindings)}
          className="h-4 w-4"
        />
        <p className="font-mono">Show key bindings</p>
      </div>
    </div>
  );
};
