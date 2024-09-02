import React, { useState } from "react";
import useBoardStore from "../../store";

export const BoardMetadata = () => {
  const setIsInputActive = useBoardStore((state) => state.setIsInputActive);
  const [boardName, setBoardName] = useState(`New Board ${Date.now()}`);
  return (
    <form className="flex flex-col gap-3 my-3 py-3 border-dashed">
      <input
        type="text"
        className="border-b-2 border-pink-300 focus:outline-none focus:border-red-500 uppercase"
        placeholder="Note"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        required
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
      />
      <input
        type="submit"
        value="Save Board"
        onClick={(e) => e.preventDefault()}
        className="block bg-red-200 w-full p-4 font-mono text-lg cursor-pointer hover:bg-red-300 rounded"
      />
    </form>
  );
};
