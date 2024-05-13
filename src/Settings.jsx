export const Settings = ({
  showNotes,
  setShowKeyBindings,
  setShowNotes,
  showKeyBindings,
}) => {
  return (
    <div>
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
