import React from "react";

export const Todos = () => (
  <div>
    <h2 className="font-mono text-lg">Todos</h2>
    <ul className="px-4">
      Improve UX
      <li className="list-disc">Better toasts</li>
      <li className="list-disc">Handle misclicks - sticky keys</li>
      <li className="list-disc">Hide irrelevant options while editing buttons - update, delete, cancel</li>
      <li className="list-disc">Clear loops on mode change</li>
      Phase 2
      <li className="list-disc">
        Recording UI - rolling window, buttons: mode | start pause | stop
      </li>
      <li className="list-disc">Tracks CRUD</li>
      <li className="list-disc">Overlap tracks</li>
      Phase 3
      <li className="list-disc">All tracks button in sidepane -> Loads player UI</li>
      <li className="list-disc">Player mode</li>
      <li className="list-disc">Convert yt track to a board</li>
      <li className="list-disc">Customisable UI</li>
    </ul>
  </div>
);
