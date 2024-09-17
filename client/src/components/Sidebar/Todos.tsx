import React from "react";

export const Todos = () => (
  <div>
    <h2 className="font-mono text-lg">Todos</h2>
    <ul className="px-4">

      General improvements:
      <li className="list-disc">Space to reset all buttons playing - checkbox option to hide</li>
      <li className="list-disc">Welcome toasts - click to update keys, drag and drop</li>
      <li className="list-disc">Better toasts, common error message file</li>
      <li className="list-disc">Handle misclicks - sticky keys</li>
      <li className="list-disc">Clear loops on mode change - spacebar can handle this</li>
      <li className="list-disc">Routes, loading screen</li>

      Phase 2: Sept
      <li className="list-disc">
        Recording UI - rolling window, buttons: mode | start pause | stop
      </li>
      <li className="list-disc">Tracks CRUD - 1m duration</li>
      <li className="list-disc">Overlap tracks</li>

      Phase 3: Oct
      <li className="list-disc">All tracks button in sidepane loads player UI</li>
      <li className="list-disc">Player mode - spinning record</li>
      <li className="list-disc">Convert yt track to a board</li>
      <li className="list-disc">Customisable UI</li>

      Final touches: Oct
      <li className="list-disc">Google sign in - not needed to listen, test out a board</li>
      <li className="list-disc">Redis setex</li>
      <li className="list-disc">Redirect mobile users to player UI with top tracks</li>
      <li className="list-disc">Limits</li>
      <li className="list-disc">Umami analytics</li>
      <li className="list-disc">Star boards, tracks</li>
      <li className="list-disc">Schedule MongoDB dumps for backup</li>
      <li className="list-disc">Readme, feature on website</li>
      <li className="list-disc">Search for boards, tracks</li>
    </ul>
  </div>
);
