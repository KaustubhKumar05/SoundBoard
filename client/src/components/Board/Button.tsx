import React from "react";
import useBoardStore from "../../store/index";
import { useButton } from "../../hooks/useButton";
import { ButtonConfig } from "../../types";

export const Button = ({
  config,
  id,
}: {
  config: ButtonConfig;
  id: string;
}) => {
  const showNotes = useBoardStore((state) => state.showNotes);
  const showKeyBindings = useBoardStore((state) => state.showKeyBindings);
  const setSelectedPad = useBoardStore((state) => state.setSelectedPad);
  useButton(config);

  return (
    <button
      id={id}
      onClick={() => setSelectedPad({ ...config, id, duration: "8n" })}
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
