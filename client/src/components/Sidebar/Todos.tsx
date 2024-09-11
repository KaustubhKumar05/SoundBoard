import React from "react";

export const Todos = () => (
  <div>
    <h2 className="font-mono text-lg">Todos</h2>
    <ul className="px-4">

      General improvements: Sept
      <li className="list-disc">Dependabot alerts</li>
      <li className="list-disc">Welcome toasts - click to update keys, drag and drop</li>
      <li className="list-disc">Better toasts, common error message file</li>
      <li className="list-disc">Routes, loading screen</li>
      <li className="list-disc">Handle misclicks - sticky keys</li>
      <li className="list-disc">Clear loops on mode change</li>
      <li className="list-disc">Hide irrelevant options while editing buttons - update, delete, cancel</li>

      Phase 2: Sept
      <li className="list-disc">
        Recording UI - rolling window, buttons: mode | start pause | stop
      </li>
      <li className="list-disc">Tracks CRUD</li>
      <li className="list-disc">Overlap tracks</li>

      Phase 3: Oct
      <li className="list-disc">All tracks button in sidepane loads player UI</li>
      <li className="list-disc">Player mode</li>
      <li className="list-disc">Convert yt track to a board</li>
      <li className="list-disc">Customisable UI</li>

      Final touches: Oct
      <li className="list-disc">Google sign in - not needed to listen, test out a board</li>
      <li className="list-disc">Redis setex</li>
      <li className="list-disc">Limits</li>
      <li className="list-disc">Search for boards, tracks</li>
    </ul>
  </div>
);
