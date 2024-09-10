import React from "react";
import { FileMusic } from "lucide-react";

export const RecordButton = () => {
  return (
    <button title="Record tracks" className="bg-red-200 p-4 my-3 w-full cursor-pointer hover:bg-red-300 rounded border-t border-pink-300 flex justify-center">
      <FileMusic />
    </button>
  );
};
