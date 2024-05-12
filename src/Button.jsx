import { useEffect, useRef } from "react";

export const Button = ({
  note,
  playNote,
  keyBinding,
  id,
  showNotes,
  showKeyBindings,
  setSelectedPad,
  interval,
}) => {
  const intervalRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleLooping = (e) => {
      if (e.key === keyBinding && interval) {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            const classesToToggle = [
              "bg-purple-200",
              "bg-purple-100",
              "scale-105",
            ];
            classesToToggle.forEach((className) =>
              buttonRef.current.classList.toggle(className)
            );

            buttonRef.current.click();

            setTimeout(() => {
              classesToToggle.forEach((className) =>
                buttonRef.current.classList.toggle(className)
              );
              buttonRef.current.blur();
            }, 200);
          }, interval * 1000);
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };
    window.addEventListener("keypress", handleLooping);
    return () => {
      window.removeEventListener("keypress", handleLooping);
    };
  }, [interval, keyBinding]);

  return (
    <button
      ref={buttonRef}
      id={id}
      onClick={playNote}
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedPad({ note, keyBinding, interval });
      }}
      className={`py-2 h-24 w-24 rounded ${
        interval
          ? "bg-purple-100 hover:bg-purple-300 focus:bg-purple-200 border-purple-300"
          : "bg-red-100 hover:bg-red-300 focus:bg-red-200 border-pink-300"
      } focus:outline-none border flex flex-col gap-2 items-center justify-center`}
    >
      {showNotes && <p className="font-mono font-semibold text-xl">{note}</p>}
      {showKeyBindings && (
        <div className="flex gap-3">
          <p className="font-thin uppercase">{keyBinding}</p>
          {interval && <p className="font-thin uppercase">{interval}</p>}
        </div>
      )}
    </button>
  );
};
