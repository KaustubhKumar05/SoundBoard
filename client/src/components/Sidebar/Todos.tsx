import React from "react";

export const Todos = () => (
  <div className="border-t border-dashed border-pink-200 py-3">
    <h2 className="font-mono text-lg">Todos</h2>
    <ul className="px-4">
      <li className="list-disc">CRUD using Redis</li>
      <li className="list-disc">Script and save tracks</li>
      <li className="list-disc">Convert yt track to a board</li>
      <li className="list-disc">Fork tracks and boards</li>
      <li className="list-disc">Customisable UI</li>
    </ul>
  </div>
);
