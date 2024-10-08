import React from "react";
import useAppStore from "../../store/app";
import useBoardStore from "../../store/board";
import { useButton } from "../../hooks/useButton";
import { ButtonConfig } from "../../types";
import { useDragDrop } from "../../hooks/useDragDrop";
import { DURATION } from "../../constants";

export const Button = ({
  config,
  id,
}: {
  config: ButtonConfig;
  id: string;
}) => {
  const showNotes = useAppStore((state) => state.showNotes);
  const showKeyBindings = useAppStore((state) => state.showKeyBindings);

  const setSelectedPad = useBoardStore((state) => state.setSelectedPad);

  const { handleDrop } = useDragDrop();

  useButton(config);

  return (
    <button
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            id,
            isButton: !config.interval,
          })
        )
      }
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, id, !config.interval)}
      id={id}
      onClick={() => setSelectedPad({ ...config, id, duration: DURATION })}
      className={`py-2 h-24 w-24 rounded ${
        config.interval
          ? "bg-purple-100 hover:bg-purple-300 focus:bg-purple-200 border-purple-300"
          : "bg-red-100 hover:bg-red-300 focus:bg-red-200 border-pink-300"
      } focus:outline-none border flex flex-col gap-2 items-center justify-center`}
    >
      {showNotes && (
        <p className="font-mono font-semibold text-xl uppercase">
          {config.note}
        </p>
      )}
      {showKeyBindings && (
        <div className="flex gap-3">
          <p className="font-thin uppercase">{config.keyBinding}</p>
          {config.interval && (
            <p className="font-thin uppercase">{config.interval}</p>
          )}
        </div>
      )}
    </button>
  );
};
