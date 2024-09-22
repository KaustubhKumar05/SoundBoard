import React from "react";
import { STANDARD_LENGTH } from "../../constants";
import { KeyStrokeHandler } from "./KeyStrokeHandler";

export const Recorder = () => {
  return (
    <section
      className="w-full bg-red-50 flex justify-center"
      style={{
        height: STANDARD_LENGTH + "px",
      }}
    >
      <KeyStrokeHandler />
    </section>
  );
};
