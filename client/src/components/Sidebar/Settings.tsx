import React from "react";
import useAppStore from "../../store/app";

export const Settings = () => {
  const showKeyBindings = useAppStore((state) => state.showKeyBindings);
  const setShowKeyBindings = useAppStore((state) => state.setShowKeyBindings);
  const showNotes = useAppStore((state) => state.showNotes);
  const setShowNotes = useAppStore((state) => state.setShowNotes);

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
